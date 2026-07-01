'use client';

import { motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';

export default function BootsScene() {
  return (
    <div className="scene">
      <div className="scene-inner">
        <motion.p variants={item} className="eyebrow text-ember-500">
          Embedded Leadership
        </motion.p>
        <motion.h2 variants={item} className="display mt-4 text-5xl font-bold leading-[0.95] text-steel-50 sm:text-6xl">
          Boots on the ground.<br />
          <span className="text-ember-500">Every day.</span>
        </motion.h2>
        <motion.p variants={item} className="mt-6 max-w-2xl text-lg leading-relaxed text-steel-300">
          Remote operators run their business through a dashboard. We run ours in person — which is exactly what flawless
          uptime on a multi-year build requires. An equity owner is on site, every day, for the duration.
        </motion.p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-charcoal-600/30 sm:grid-cols-2">
          <motion.div variants={item} className="bg-charcoal-900 p-8">
            <p className="display text-xl font-bold uppercase tracking-wide text-steel-300 sm:text-2xl">Remote dashboard operator</p>
            <ul className="mt-5 space-y-3 text-steel-400">
              <li>Sees a number change; dispatches a truck eventually</li>
              <li>Empty shelves discovered after the fact</li>
              <li>Your team becomes the escalation path</li>
            </ul>
          </motion.div>
          <motion.div variants={item} className="reticle bg-charcoal-800 p-8">
            <p className="display text-xl font-bold uppercase tracking-wide text-ember-400 sm:text-2xl">On-site owner-operator</p>
            <ul className="mt-5 space-y-3 text-steel-200">
              <li>Walks the floor; fixes it before anyone notices</li>
              <li>Restocked ahead of the shift, not after the complaint</li>
              <li>The owner is the escalation path</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
