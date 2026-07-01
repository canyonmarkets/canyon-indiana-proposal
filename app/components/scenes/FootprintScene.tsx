'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';
import { useDeck } from '@/app/components/deck/Deck';
import { Tag } from '@/app/components/ui';
import { ZONES } from '@/app/data/proposal';

export default function FootprintScene() {
  const [active, setActive] = useState(ZONES[0].id);
  const [open, setOpen] = useState<number | null>(null);
  const { pause } = useDeck();
  const zone = ZONES.find((z) => z.id === active) ?? ZONES[0];

  useEffect(() => setOpen(null), [active]);

  const selectZone = (id: string) => {
    setActive(id);
    pause();
  };

  const dot = open !== null ? zone.dots[open] : null;

  return (
    <div className="scene">
      <div className="scene-inner max-w-6xl">
        <motion.div variants={item} className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-ember-500">Interactive Site Footprint</p>
            <h2 className="display mt-1.5 text-2xl font-bold leading-tight text-steel-50 sm:text-3xl">
              Your blueprint. <span className="text-ember-500">Our markets.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-steel-300">
            These placements follow your current site plan — and nothing&apos;s locked. We&apos;ll sit down with your design team
            in planning to put every market exactly where the foot traffic wants it.{' '}
            <span className="font-semibold text-ember-300">Pick a location and hover a pin</span> to preview.
          </p>
        </motion.div>

        {/* Zone tabs */}
        <motion.div variants={item} className="mt-4 flex flex-wrap gap-2">
          {ZONES.map((z) => {
            const on = z.id === active;
            return (
              <button
                key={z.id}
                onClick={() => selectZone(z.id)}
                className={`rounded-lg border px-3.5 py-2 transition-all ${
                  on ? 'border-ember-500/60 bg-charcoal-800' : 'border-charcoal-600/25 bg-charcoal-900/40 hover:border-charcoal-500/50'
                }`}
              >
                <span className={`display text-sm font-bold ${on ? 'text-ember-400' : 'text-steel-100'}`}>{z.name}</span>
                <span className="kicker ml-2 text-steel-500">{z.sheet}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Floor-plan stage */}
        <motion.div variants={item} className="panel mt-4 overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between border-b border-charcoal-600/30 px-5 py-2.5">
            <span className="eyebrow text-ember-300">{zone.deployment}</span>
            <Tag tag={zone.tag} />
          </div>
          <div className="relative flex justify-center bg-white">
            <div className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img key={zone.id} src={zone.layout} alt={`${zone.name} floor plan`} className="block h-[50vh] w-auto max-w-full" />
              {zone.dots.map((d, i) => (
                <div
                  key={i}
                  className="hotspot"
                  style={{ left: d.x, top: d.y }}
                  onMouseEnter={() => setOpen(i)}
                  onMouseLeave={() => setOpen(null)}
                  onClick={() => setOpen(open === i ? null : i)}
                  role="button"
                  aria-label={d.label}
                >
                  <span className="pin" />
                  <span className="pointer-events-none absolute left-1/2 top-[calc(100%+8px)] -translate-x-1/2 whitespace-nowrap rounded-full border border-ember-500/50 bg-charcoal-950/92 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ember-300 shadow-lg">
                    {d.short}
                  </span>
                </div>
              ))}
            </div>

            <AnimatePresence>
              {dot && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-charcoal-950/80 p-4"
                >
                  <motion.div
                    initial={{ scale: 0.94, y: 12 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="panel reticle relative w-full max-w-md overflow-hidden rounded-xl"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={dot.popup} alt={dot.label} className="block aspect-[3/2] w-full object-cover" />
                    <div className="p-4">
                      <p className="eyebrow text-ember-400">{dot.label}</p>
                      <p className="mt-1 text-sm text-steel-300">{dot.sub}</p>
                      <p className="kicker mt-2 text-steel-500">Sample preview — final render coming</p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
