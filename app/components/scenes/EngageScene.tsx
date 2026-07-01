'use client';

import { motion } from 'framer-motion';
import { Map, Video, Zap } from 'lucide-react';
import { item } from '@/app/components/deck/anim';
import { CONTACT, PROPOSAL } from '@/app/lib/site';

const STEPS = [
  { icon: Zap, t: "It's all live today", d: 'Everything in this proposal runs on our own stack right now — none of it is a concept.' },
  { icon: Video, t: 'Give us 30 minutes', d: 'A quick Zoom or Teams walk-through with your team, whenever it fits your schedule.' },
  { icon: Map, t: 'We map EKI for you', d: 'A tailored site layout for the Elkhart campus — at no cost to the build.' },
];

export default function EngageScene() {
  return (
    <div className="scene">
      <div className="scene-inner max-w-5xl text-center">
        <motion.p variants={item} className="eyebrow text-ember-500">
          The Easy Part
        </motion.p>
        <motion.h2 variants={item} className="display mt-3 text-3xl font-bold leading-[0.98] text-steel-50 sm:text-5xl">
          One system you <span className="text-ember-500">don&apos;t have to build.</span>
        </motion.h2>
        <motion.p variants={item} className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-steel-300">
          You have a hyperscale campus to deliver on a clock. Feeding the thousands of people who build it shouldn&apos;t
          be one more thing you design, staff, or chase. That&apos;s the one thing Canyon does — the pantries, the markets,
          the gym cooler, and the food-truck lane — end to end, on-site, on our own technology, at no cost to the build.
        </motion.p>

        <motion.div variants={item} className="mx-auto mt-7 grid max-w-4xl gap-3 sm:grid-cols-3">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.t} className="panel rounded-2xl p-4 text-left">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-ember-500/40 bg-ember-500/15">
                  <Icon size={20} className="text-ember-400" />
                </div>
                <p className="display mt-3 text-base font-bold text-steel-50">{s.t}</p>
                <p className="mt-1.5 text-[13px] leading-snug text-steel-300">{s.d}</p>
              </div>
            );
          })}
        </motion.div>

        <motion.div variants={item} className="mt-7 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${CONTACT.email}?subject=Microsoft%20EKI%20Intro%20Call`}
            className="btn-ember rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-wide"
          >
            Set up a 30-minute call
          </a>
          <a href={`tel:${CONTACT.phoneHref}`} className="btn-ghost rounded-md px-7 py-3.5 text-sm font-semibold uppercase tracking-wide">
            {CONTACT.phone}
          </a>
        </motion.div>

        <motion.p variants={item} className="mt-5 text-sm text-steel-400">
          Thanks for looking this over — we&apos;d genuinely love to walk you through it.
        </motion.p>

        <motion.p variants={item} className="kicker mt-6 text-steel-600">
          <a
            href="https://missioncriticalvending.com"
            target="_blank"
            rel="noopener noreferrer"
            className="ulink transition-colors hover:text-ember-300"
          >
            missioncriticalvending.com
          </a>
          {'  ·  '}
          {PROPOSAL.company} · {PROPOSAL.lockup}
        </motion.p>
      </div>
    </div>
  );
}
