'use client';

import { motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';
import { useCountUp } from '@/app/components/deck/useCountUp';

function CountStat({ to, suffix = '', label }: { to: number; suffix?: string; label: string }) {
  const v = useCountUp(to);
  return (
    <motion.div variants={item} className="panel reticle rounded-2xl p-5 sm:p-6">
      <div className="display text-4xl font-bold text-ember-500 sm:text-5xl">
        {Math.round(v).toLocaleString()}
        {suffix}
      </div>
      <div className="mt-3 text-sm leading-snug text-steel-300">{label}</div>
    </motion.div>
  );
}

export default function StakesScene() {
  return (
    <div className="scene">
      <div className="scene-inner">
        <motion.p variants={item} className="eyebrow text-ember-500">
          The Situation
        </motion.p>
        <motion.h2 variants={item} className="display mt-4 max-w-3xl text-4xl font-bold leading-tight text-steel-50 sm:text-5xl">
          A campus with no <span className="text-ember-500">food infrastructure.</span>
        </motion.h2>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          <CountStat to={2000} suffix="+" label="Contract workers on site, peak" />
          <CountStat to={200} suffix="+" label="Microsoft + Clayco admin staff" />
          <motion.div variants={item} className="panel reticle rounded-2xl p-5 sm:p-6">
            <div className="display text-4xl font-bold text-ember-500 sm:text-5xl">4–5</div>
            <div className="mt-3 text-sm leading-snug text-steel-300">Year build, around the clock</div>
          </motion.div>
          <motion.div variants={item} className="panel reticle rounded-2xl p-5 sm:p-6">
            <div className="display text-4xl font-bold text-ember-500 sm:text-5xl">30</div>
            <div className="mt-3 text-sm leading-snug text-steel-300">Minute breaks — no time to leave site</div>
          </motion.div>
        </div>

        <motion.p variants={item} className="mt-10 max-w-2xl text-lg leading-relaxed text-steel-400">
          Rotating shifts. Acres of footprint. Hungry crews on a clock. Standard vending was never built for this.{' '}
          <span className="text-steel-100">Canyon is</span> — end to end, at zero cost to you.
        </motion.p>
      </div>
    </div>
  );
}
