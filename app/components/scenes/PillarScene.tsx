'use client';

import { motion } from 'framer-motion';
import { Calendar, Megaphone } from 'lucide-react';
import { item } from '@/app/components/deck/anim';
import { Tag } from '@/app/components/ui';
import type { PillarSpec } from '@/app/data/pillars';

const ROADMAP_ICONS = { calendar: Calendar, promo: Megaphone } as const;

/** Renders the headline with an optional substring highlighted in ember. */
function HeadlineText({ text, emphasis }: { text: string; emphasis?: string }) {
  if (emphasis && text.includes(emphasis)) {
    const [before, after] = text.split(emphasis);
    return (
      <>
        {before}
        <span className="text-ember-500">{emphasis}</span>
        {after}
      </>
    );
  }
  return <>{text}</>;
}

export default function PillarScene({ spec }: { spec: PillarSpec }) {
  return (
    <div className="scene">
      <div className="scene-inner">
        <motion.div variants={item} className="flex items-center justify-between gap-4">
          <p className="eyebrow text-ember-500">{spec.eyebrow}</p>
          <Tag tag={spec.tag} />
        </motion.div>

        <div className="mt-4 flex items-start gap-5">
          <motion.span variants={item} className="display hidden text-7xl font-bold leading-none text-charcoal-600 sm:block">
            {spec.num}
          </motion.span>
          <div>
            <motion.h2 variants={item} className="display text-4xl font-bold leading-[1.02] text-steel-50 sm:text-5xl">
              <HeadlineText text={spec.headline} emphasis={spec.emphasis} />
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-2xl text-lg leading-relaxed text-steel-300">
              {spec.subhead}
            </motion.p>
          </div>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-3">
          {spec.points.map((pt) => (
            <motion.div key={pt.title} variants={item}>
              <div className="h-px w-8 bg-ember-500" />
              <h3 className="display mt-3 text-base font-bold leading-tight text-steel-50">{pt.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-steel-300">{pt.body}</p>
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className={`${spec.roadmap ? 'mt-7' : 'mt-9'} rounded-xl border-l-2 border-ember-500 bg-charcoal-800/60 p-5`}>
          <p className="eyebrow text-ember-400">What this lifts off your plate</p>
          <p className="mt-2 leading-relaxed text-steel-200">{spec.burden_removed}</p>
        </motion.div>

        {spec.roadmap && (
          <motion.div variants={item} className="mt-6">
            <p className="kicker text-ember-300">On the roadmap · two companion apps</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {spec.roadmap.cards.map((c) => {
                const Icon = ROADMAP_ICONS[c.icon];
                return (
                  <div key={c.name} className="flex items-start gap-3 rounded-xl border border-dashed border-charcoal-500/50 bg-charcoal-800/30 p-4">
                    <Icon size={20} className="mt-0.5 flex-none text-ember-400" />
                    <div>
                      <h4 className="display text-sm font-bold leading-tight text-steel-50">{c.name}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-steel-300">{c.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
