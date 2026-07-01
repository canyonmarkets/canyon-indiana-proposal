'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';

// Relative index only (no dollar figures). The two corner stores are the chains
// actually around the Indiana site; Canyon holds steady, on par / below them.
type Bar =
  | { name: string; us: true; base: number }
  | { name: string; us: false; base: number; band: number; period: number };

const BARS: Bar[] = [
  { name: '7-Eleven', us: false, base: 96, band: 3, period: 1900 },
  { name: "Casey's", us: false, base: 90, band: 3, period: 2300 },
  { name: 'Canyon Markets', us: true, base: 82 },
];

/** A competitor "price index" that drifts gently within a band — reads as a live feed. */
function useLiveWidth(base: number, band: number, period: number) {
  const [w, setW] = useState(base);
  useEffect(() => {
    const iv = setInterval(() => {
      const target = base + (Math.random() * 2 - 1) * band;
      setW(Math.round(target * 10) / 10);
    }, period);
    return () => clearInterval(iv);
  }, [base, band, period]);
  return w;
}

function CompetitorBar({ name, base, band, period }: { name: string; base: number; band: number; period: number }) {
  const w = useLiveWidth(base, band, period);
  return (
    <div className="flex items-center gap-4">
      <span className="w-28 flex-none text-sm text-steel-300 sm:w-36">{name}</span>
      <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-charcoal-900">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${w}%` }}
          transition={{ duration: 1.3, ease: 'easeInOut' }}
          className="livebar h-full rounded-md bg-charcoal-500"
        />
      </div>
      <span className="flex w-24 flex-none items-center justify-end gap-1.5">
        <span className="pricedot" />
        <span className="kicker text-warn-500">Live</span>
      </span>
    </div>
  );
}

function UsBar({ name, base }: { name: string; base: number }) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-28 flex-none text-sm font-bold text-steel-50 sm:w-36">{name}</span>
      <div className="relative h-6 flex-1 overflow-hidden rounded-md bg-charcoal-900">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${base}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          className="h-full rounded-md bg-ember-500"
        />
      </div>
      <span className="flex w-24 flex-none items-center justify-end">
        <span className="kicker text-ember-300">Often below</span>
      </span>
    </div>
  );
}

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
            {BARS.map((b) =>
              b.us ? (
                <UsBar key={b.name} name={b.name} base={b.base} />
              ) : (
                <CompetitorBar key={b.name} name={b.name} base={b.base} band={b.band} period={b.period} />
              ),
            )}
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
