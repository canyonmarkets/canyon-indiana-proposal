'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useDeck } from '@/app/components/deck/Deck';
import { item } from '@/app/components/deck/anim';
import { PROPOSAL } from '@/app/lib/site';

const LINES = [
  ['initializing mission control', '████'],
  ['kiosk nodes', 'active'],
  ['stripe terminal', 'active'],
  ['inventory sync', 'ok'],
  ['proposal package', 'loaded'],
];

export default function BootScene() {
  const { next } = useDeck();

  return (
    <div className="scene">
      <div className="scene-inner max-w-3xl">
        <motion.p variants={item} className="font-mono text-sm font-bold uppercase tracking-[0.15em] text-ember-300">
          Canyon // Site Operations Console
        </motion.p>

        <motion.div variants={item} className="panel mt-6 rounded-xl p-6 font-mono text-sm sm:p-8">
          {LINES.map((l, i) => (
            <motion.div
              key={l[0]}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.42, duration: 0.35 }}
              className="flex items-center justify-between gap-4 py-1.5 text-steel-300"
            >
              <span className="text-steel-400">&gt; {l[0]}</span>
              <span className="flex-1 select-none overflow-hidden text-charcoal-500">
                {'·'.repeat(60)}
              </span>
              <span className="text-live-500">{l[1]}</span>
            </motion.div>
          ))}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.6, duration: 2.4, ease: 'easeInOut' }}
            className="mt-5 h-1 origin-left rounded-full bg-ember-500"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.0, duration: 0.6 }}
          className="mt-8"
        >
          <p className="font-mono text-xs font-bold uppercase tracking-[0.15em] text-steel-200">{PROPOSAL.project}</p>
          <h1 className="display caret mt-2 text-3xl font-bold text-steel-50 sm:text-4xl">Briefing ready</h1>
          <button
            onClick={next}
            className="btn-ember mt-7 inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-semibold uppercase tracking-wide"
          >
            Begin briefing <ChevronRight size={16} />
          </button>
          <span className="kicker ml-4 text-steel-600">or press → / scroll</span>
        </motion.div>
      </div>
    </div>
  );
}
