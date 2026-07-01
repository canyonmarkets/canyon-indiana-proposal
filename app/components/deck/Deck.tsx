'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { sceneVariants } from '@/app/components/deck/anim';
import { PROPOSAL, TELEMETRY } from '@/app/lib/site';

export type SceneDef = {
  id: string;
  label: string;
  element: React.ReactNode;
  dwell?: number; // ms the self-driving deck rests on this scene
  hold?: boolean; // never auto-advance (interactive scenes)
};

const DEFAULT_DWELL = 7000;

type DeckCtx = {
  index: number;
  count: number;
  next: () => void;
  prev: () => void;
  goto: (i: number) => void;
  playing: boolean;
  pause: () => void;
};

const Ctx = createContext<DeckCtx | null>(null);
export const useDeck = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error('useDeck must be used inside Deck');
  return c;
};

export default function Deck({ scenes }: { scenes: SceneDef[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [playing, setPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const wheelTs = useRef(0);
  const last = scenes.length - 1;

  // Below the lg breakpoint we drop the fixed card-deck for a scrollable page.
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const advance = useCallback((d: number) => {
    setIndex((i) => {
      const n = Math.min(last, Math.max(0, i + d));
      if (n !== i) setDir(d);
      return n;
    });
  }, [last]);

  const autoNext = useCallback(() => advance(1), [advance]);
  const pause = useCallback(() => setPlaying(false), []);
  const next = useCallback(() => { setPlaying(false); advance(1); }, [advance]);
  const prev = useCallback(() => { setPlaying(false); advance(-1); }, [advance]);
  const goto = useCallback((i: number) => {
    setPlaying(false);
    setIndex((cur) => {
      if (i !== cur) setDir(i > cur ? 1 : -1);
      return Math.min(last, Math.max(0, i));
    });
  }, [last]);

  // Self-driving timer (desktop deck only)
  useEffect(() => {
    if (isMobile || !playing) return;
    const scene = scenes[index];
    if (scene.hold || index >= last) {
      if (index >= last) setPlaying(false);
      return;
    }
    const t = window.setTimeout(autoNext, scene.dwell ?? DEFAULT_DWELL);
    return () => clearTimeout(t);
  }, [playing, index, scenes, last, autoNext, isMobile]);

  // Keyboard (desktop deck only)
  useEffect(() => {
    if (isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      if (['ArrowRight', 'ArrowDown', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); next(); }
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(e.key)) { e.preventDefault(); prev(); }
      else if (e.key === 'Home') goto(0);
      else if (e.key === 'End') goto(last);
      else if (e.key.toLowerCase() === 'p') setPlaying((p) => !p);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, goto, last, isMobile]);

  // Wheel (desktop deck only)
  useEffect(() => {
    if (isMobile) return;
    const onWheel = (e: WheelEvent) => {
      const now = e.timeStamp;
      if (now - wheelTs.current < 700) return;
      if (Math.abs(e.deltaY) < 24) return;
      wheelTs.current = now;
      if (e.deltaY > 0) next();
      else prev();
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    return () => window.removeEventListener('wheel', onWheel);
  }, [next, prev, isMobile]);

  const ctx = useMemo<DeckCtx>(
    () => ({ index, count: scenes.length, next, prev, goto, playing, pause }),
    [index, scenes.length, next, prev, goto, playing, pause],
  );

  // On the scrollable mobile layout, "next" nudges the page down a screen.
  const mobileCtx = useMemo<DeckCtx>(
    () => ({
      index: 0,
      count: scenes.length,
      next: () => window.scrollBy({ top: Math.round(window.innerHeight * 0.92), behavior: 'smooth' }),
      prev: () => window.scrollBy({ top: -Math.round(window.innerHeight * 0.92), behavior: 'smooth' }),
      goto: () => {},
      playing: false,
      pause: () => {},
    }),
    [scenes.length],
  );

  const ambient = (
    <div className="deck-ambient" aria-hidden>
      <div className="gridlines absolute inset-0 opacity-30" />
      <div className="blob glow-soft -left-32 top-12 h-[26rem] w-[26rem] bg-ember-700/70" />
    </div>
  );

  const topBar = (
    <div className="fixed inset-x-0 top-0 z-40">
      <div className="telemetry-bar">
        <div className="mx-auto flex h-9 max-w-[100rem] items-center justify-between px-5">
          <div className="flex items-center gap-2.5">
            <Image src="/img/canyon-logo.png" alt="Canyon Markets" width={30} height={24} className="h-[22px] w-auto" priority />
            <span className="display text-base font-bold text-steel-100">{PROPOSAL.wordmark}</span>
            <span className="kicker hidden text-steel-500 sm:inline">// {PROPOSAL.lockup}</span>
          </div>
          <div className="hidden items-center gap-5 md:flex">
            {TELEMETRY.map((t) => (
              <span key={t.label} className="flex items-center gap-2">
                <span className="livedot" />
                <span className="kicker text-steel-400">{t.label}</span>
              </span>
            ))}
          </div>
          <span className="kicker text-live-500 md:hidden">SYSTEMS LIVE</span>
        </div>
      </div>
    </div>
  );

  // ---- Mobile / tablet: scrollable stacked page ----
  if (isMobile) {
    return (
      <Ctx.Provider value={mobileCtx}>
        {ambient}
        {topBar}
        <div className="relative z-10">
          {scenes.map((s) => (
            <motion.div key={s.id} className="deck-section" variants={sceneVariants} initial="center" animate="center">
              {s.element}
            </motion.div>
          ))}
        </div>
      </Ctx.Provider>
    );
  }

  const autoRunning = playing && index < last && !scenes[index].hold;

  // ---- Desktop: cinematic self-driving deck ----
  return (
    <Ctx.Provider value={ctx}>
      {autoRunning && (
        <motion.div
          key={index}
          className="fixed left-0 top-0 z-50 h-[2px] bg-ember-500"
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: (scenes[index].dwell ?? DEFAULT_DWELL) / 1000, ease: 'linear' }}
        />
      )}

      {ambient}
      {topBar}

      {/* Stage */}
      <div className="relative z-10 h-screen w-screen overflow-hidden">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            {scenes[index].element}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress rail */}
      <div className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 lg:flex">
        {scenes.map((s, i) => (
          <button key={s.id} onClick={() => goto(i)} className="group flex items-center gap-3" aria-label={s.label}>
            <span className={`kicker whitespace-nowrap text-[0.6rem] transition-all ${i === index ? 'text-ember-300 opacity-100' : 'text-steel-500 opacity-0 group-hover:opacity-100'}`}>
              {s.label}
            </span>
            <span className={`rail-dot ${i === index ? 'on' : i < index ? 'done' : ''}`} />
          </button>
        ))}
      </div>

      {/* Bottom chrome */}
      <div className="fixed inset-x-0 bottom-0 z-40">
        <div className="mx-auto flex max-w-[100rem] items-center justify-between px-5 py-4">
          <div className="flex items-baseline gap-2">
            <span className="display text-xl font-bold text-ember-500">{String(index + 1).padStart(2, '0')}</span>
            <span className="kicker text-steel-500">/ {String(scenes.length).padStart(2, '0')}</span>
            <span className="kicker ml-3 hidden text-steel-600 sm:inline">{scenes[index].label}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPlaying((p) => !p)}
              className="btn-ghost mr-1 flex h-10 items-center gap-2 rounded-full px-4"
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? <Pause size={15} /> : <Play size={15} />}
              <span className="kicker text-[0.6rem]">{playing ? 'Auto' : 'Play'}</span>
            </button>
            <button onClick={prev} disabled={index === 0} className="btn-ghost flex h-10 w-10 items-center justify-center rounded-full disabled:opacity-30" aria-label="Previous">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} disabled={index === last} className="btn-ember flex h-10 w-10 items-center justify-center rounded-full disabled:opacity-30" aria-label="Next">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </Ctx.Provider>
  );
}
