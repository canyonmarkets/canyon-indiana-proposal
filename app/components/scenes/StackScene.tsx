'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';
import { useDeck } from '@/app/components/deck/Deck';
import { MODULES } from '@/app/components/stack/modules';

export default function StackScene() {
  const { pause } = useDeck();
  const [active, setActive] = useState(0);
  const select = (i: number) => {
    setActive(i);
    pause();
  };
  const M = MODULES[active];
  const Mod = M.Module;

  return (
    <div className="scene">
      <div className="scene-inner max-w-6xl">
        <motion.div variants={item} className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-ember-500">Proprietary Tech — The Live Stack</p>
            <h2 className="display mt-1.5 text-2xl font-bold leading-tight text-steel-50 sm:text-3xl">
              We don&apos;t promise systems. <span className="text-ember-500">We run them.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-steel-300">
            Tap any system to watch it <span className="font-semibold text-ember-300">run live</span>. These are pieces of our
            own stack — and if your site needs a tool that doesn&apos;t exist yet, we build it in-house, hand-in-hand with{' '}
            <span className="font-semibold text-ember-300">Claude Code</span>. Fitting, for an AI data center.
          </p>
        </motion.div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.55fr)]">
          {/* selector */}
          <motion.div variants={item} className="space-y-1.5">
            {MODULES.map((m, i) => {
              const on = i === active;
              const Icon = m.icon;
              return (
                <button
                  key={m.id}
                  onClick={() => select(i)}
                  className={`flex w-full items-center gap-3 rounded-xl border px-3.5 py-2.5 text-left transition-all ${
                    on ? 'border-ember-500/60 bg-charcoal-800' : 'border-charcoal-600/25 bg-charcoal-900/40 hover:border-charcoal-500/50'
                  }`}
                >
                  <Icon size={18} className={on ? 'text-ember-400' : 'text-steel-400'} />
                  <span className="min-w-0 flex-1">
                    <span className={`display block text-sm font-bold ${on ? 'text-steel-50' : 'text-steel-200'}`}>{m.title}</span>
                    <span className="mt-0.5 block text-[12.5px] font-medium leading-snug text-steel-300">{m.desc}</span>
                  </span>
                  <span className="h-1.5 w-1.5 flex-none animate-pulse rounded-full bg-live-500" />
                </button>
              );
            })}
          </motion.div>

          {/* live viewport */}
          <motion.div variants={item} className="panel reticle relative h-[56vh] overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={M.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <Mod />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
