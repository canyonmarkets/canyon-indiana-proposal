'use client';

import { motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';
import { CONTACT, PROPOSAL } from '@/app/lib/site';

export default function EngageScene() {
  return (
    <div className="scene">
      <div className="scene-inner text-center">
        <motion.p variants={item} className="eyebrow text-ember-500">
          Engage
        </motion.p>
        <motion.h2 variants={item} className="display mt-4 text-6xl font-bold text-steel-50 sm:text-8xl">
          Ready to <span className="text-ember-500">talk?</span>
        </motion.h2>
        <motion.p variants={item} className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-steel-300">
          Tell us your crew size, the construction phase, and the zones you want covered. We&apos;ll come back with a
          tailored site layout — at no cost.
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${CONTACT.email}?subject=Microsoft%20EKI%20Site%20Layout`}
            className="btn-ember rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-wide"
          >
            Request a site layout
          </a>
          <a href={`tel:${CONTACT.phoneHref}`} className="btn-ghost rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-wide">
            {CONTACT.phone}
          </a>
        </motion.div>

        <motion.p variants={item} className="kicker mt-12 text-steel-600">
          {PROPOSAL.company} · {PROPOSAL.lockup} · Built in-house on Canyon&apos;s own stack
        </motion.p>
      </div>
    </div>
  );
}
