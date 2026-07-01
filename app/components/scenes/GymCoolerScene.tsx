'use client';

import { motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';
import { Tag } from '@/app/components/ui';

const CATS = [
  { label: 'Recovery energy', items: 'C4 · Ghost · Celsius · Bang' },
  { label: 'Protein shakes', items: 'Muscle Milk · Core Power · Premier' },
  { label: 'Protein bars', items: "Quest · ONE · CLIF · Builder's" },
  { label: 'Supplements', items: 'Creatine · electrolytes · recovery gels' },
];

const STEPS = [
  { n: '1', t: 'Tap to unlock', d: 'Badge or phone' },
  { n: '2', t: 'Grab what you want', d: 'No scanning' },
  { n: '3', t: 'Auto-charged', d: 'It sees what you took' },
];

export default function GymCoolerScene() {
  return (
    <div className="scene">
      <div className="scene-inner max-w-6xl">
        <motion.div variants={item} className="flex items-center justify-between gap-4">
          <p className="eyebrow text-ember-500">Amenity Pavilion · The Gym</p>
          <Tag tag="proposed" />
        </motion.div>
        <motion.h2 variants={item} className="display mt-3 text-3xl font-bold leading-tight text-steel-50 sm:text-4xl">
          The gym gets its own <span className="text-ember-500">AI cooler.</span>
        </motion.h2>
        <motion.p variants={item} className="mt-3 max-w-2xl text-base leading-relaxed text-steel-300">
          One AI-managed smart cooler in the fitness center, stocked only with performance and recovery fuel — the
          high-value line, protected and always full.
        </motion.p>

        <div className="mt-6 grid items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* left — what's inside + how it works */}
          <div>
            <motion.div variants={item} className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {CATS.map((c) => (
                <div key={c.label} className="rounded-xl border border-charcoal-700/70 bg-charcoal-800/50 p-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 flex-none rounded-full bg-ember-500" />
                    <p className="display text-sm font-bold text-steel-50">{c.label}</p>
                  </div>
                  <p className="mt-1.5 text-[13px] leading-snug text-steel-300">{c.items}</p>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-5">
              <p className="kicker text-ember-300">Grab &amp; go — no lines, no cashier</p>
              <div className="mt-2.5 grid grid-cols-3 gap-2">
                {STEPS.map((s) => (
                  <div key={s.n} className="rounded-lg border border-charcoal-700/60 bg-charcoal-900/40 p-3">
                    <span className="display text-lg font-bold text-ember-400">{s.n}</span>
                    <p className="mt-1 text-[13px] font-semibold leading-tight text-steel-100">{s.t}</p>
                    <p className="mt-0.5 text-[11px] leading-tight text-steel-400">{s.d}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-steel-400">
                Shrink-protected on the items most likely to walk, and par-tracked so it never runs dry.
              </p>
            </motion.div>
          </div>

          {/* right — gym photo with the real unit inset */}
          <motion.div variants={item} className="panel reticle relative overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/gym-cooler.jpg" alt="AI smart cooler in the gym" className="block h-[46vh] w-full object-cover" />
            <div className="absolute bottom-3 left-3 w-24 overflow-hidden rounded-lg border border-charcoal-600 bg-charcoal-900 shadow-xl sm:w-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/gym-cooler-unit.jpg" alt="The AI smart cooler unit" className="block w-full" />
              <p className="bg-charcoal-950/90 px-2 py-1 text-center text-[9px] uppercase tracking-wider text-steel-300">The unit</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
