'use client';

import { motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';

const ITEMS = ['Pantry Service', 'Amenities Markets + Gym', 'Field Break-Tent Markets', 'Food Truck Management'];

function CheckRow({ label, i }: { label: string; i: number }) {
  const d = 0.5 + i * 0.8;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: d, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center justify-between gap-6 border-b border-charcoal-600/25 py-3.5"
    >
      <span className="display text-4xl font-bold leading-none text-steel-50 sm:text-5xl">{label}</span>
      <motion.svg viewBox="0 0 52 52" className="h-12 w-12 flex-none sm:h-14 sm:w-14" aria-hidden>
        <motion.circle
          cx="26"
          cy="26"
          fill="#C94B0C"
          initial={{ r: 0 }}
          animate={{ r: 24 }}
          transition={{ type: 'spring', stiffness: 220, damping: 15, delay: d + 0.25 }}
        />
        <motion.path
          d="M15.5 26.5 l7 7 l14.5 -15.5"
          fill="none"
          stroke="#fff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, delay: d + 0.45 }}
        />
      </motion.svg>
    </motion.div>
  );
}

export default function SummaryScene() {
  return (
    <div className="scene">
      <div className="scene-inner">
        <motion.p variants={item} className="eyebrow text-ember-500">
          The Turnkey Promise
        </motion.p>

        <div className="mt-6">
          {ITEMS.map((label, i) => (
            <CheckRow key={label} label={label} i={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 + ITEMS.length * 0.8 + 0.2 }}
          className="mt-9"
        >
          <p className="display text-2xl font-bold leading-tight text-steel-50 sm:text-3xl">
            One operator. One button. <span className="text-ember-500">Everything handled.</span>
          </p>
          <p className="mt-3 max-w-2xl leading-relaxed text-steel-300">
            All four programs run on Canyon&apos;s own proprietary technology — custom self-checkout kiosks, par-level
            inventory, live AI insights, and real-time telemetry we built and operate in-house. You make one call; we run
            the rest.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
