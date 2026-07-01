'use client';

import { motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';

// Relative bar lengths only (representative, indexed to local retail) — no
// dollar figures claimed. Canyon sits on par / slightly below the corner stores.
// Casey's + 7-Eleven are the two chains actually present around the Indiana site.
const BARS = [
  { name: '7-Eleven', pct: 100, us: false },
  { name: "Casey's", pct: 97, us: false },
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
          benchmarked to the convenience stores your crews would otherwise drive to — Casey&apos;s, 7-Eleven — and set
          on par with, often below.
        </motion.p>

        <motion.div variants={item} className="panel mt-7 rounded-2xl p-6">
          <div className="flex items-center justify-between gap-3">
            <p className="kicker text-steel-400">Representative basket · benchmarked to nearby retail</p>
            <span className="flex flex-none items-center gap-1.5">
              <span className="pricedot" />
              <span className="kicker text-warn-500">Prices tracked live</span>
            </span>
          </div>

          <div className="mt-5 space-y-3.5">
            {BARS.map((b) => (
              <div key={b.name} className="flex items-center gap-4">
                <span className={`w-28 flex-none text-sm sm:w-36 ${b.us ? 'font-bold text-steel-50' : 'text-steel-300'}`}>
                  {b.name}
                </span>
                <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-charcoal-900">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${b.pct}%` }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
                    className={`h-full rounded-md ${b.us ? 'bg-ember-500' : 'livebar bg-charcoal-500'}`}
                  />
                </div>
                <span className="flex w-24 flex-none items-center justify-end gap-1.5">
                  {b.us ? (
                    <span className="kicker text-ember-300">Often below</span>
                  ) : (
                    <>
                      <span className="pricedot" />
                      <span className="kicker text-warn-500">Live</span>
                    </>
                  )}
                </span>
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
