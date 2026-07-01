'use client';

import { motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';

// Relative bar lengths only (representative, indexed to local retail) — no
// dollar figures claimed. Canyon sits on par / slightly below the corner stores.
const BARS = [
  { name: '7-Eleven', pct: 100, us: false },
  { name: 'Circle K', pct: 98, us: false },
  { name: 'Canyon Markets', pct: 92, us: true },
];

export default function FairPriceScene() {
  return (
    <div className="scene">
      <div className="scene-inner max-w-5xl">
        <motion.p variants={item} className="eyebrow text-ember-500">
          The Fair-Price Promise
        </motion.p>
        <motion.h2 variants={item} className="display mt-3 text-3xl font-bold leading-tight text-steel-50 sm:text-4xl">
          Priced for the crew, <span className="text-ember-500">not the captive audience.</span>
        </motion.h2>
        <motion.p variants={item} className="mt-3 max-w-2xl text-base leading-relaxed text-steel-300">
          On a locked-down site, your people can&apos;t run to the store — so we price like they could. Every item is
          benchmarked to nearby convenience stores and set on par with, often below, Circle K and 7-Eleven.
        </motion.p>

        <motion.div variants={item} className="panel mt-7 rounded-2xl p-6">
          <p className="kicker text-steel-400">Representative basket · indexed to nearby retail</p>
          <div className="mt-4 space-y-3.5">
            {BARS.map((b) => (
              <div key={b.name} className="flex items-center gap-4">
                <span className={`w-36 flex-none text-sm ${b.us ? 'font-bold text-steel-50' : 'text-steel-300'}`}>{b.name}</span>
                <div className="h-6 flex-1 overflow-hidden rounded-md bg-charcoal-900">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${b.pct}%` }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                    className={`h-full rounded-md ${b.us ? 'bg-ember-500' : 'bg-charcoal-500'}`}
                  />
                </div>
                {b.us && <span className="kicker flex-none text-ember-300">On par — often less</span>}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.p variants={item} className="mt-5 max-w-3xl text-sm leading-relaxed text-steel-400">
          Your crews are a captive audience — and we treat that as a responsibility, not leverage. Canyon is
          owner-operated and on-site; their trust is worth far more to us than a few cents of margin.
        </motion.p>
      </div>
    </div>
  );
}
