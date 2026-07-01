'use client';

import { motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';
import { useDeck } from '@/app/components/deck/Deck';
import { Tag } from '@/app/components/ui';
import { ArrowRight, MousePointerClick } from 'lucide-react';
import PantryReplica from '@/app/components/pantry/PantryReplica';
import { PILLAR_SPECS } from '@/app/data/pillars';

const spec = PILLAR_SPECS[0];

export default function PantryScene() {
  const { pause } = useDeck();

  return (
    <div className="scene">
      <div className="scene-inner">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <motion.div variants={item} className="flex items-center justify-between gap-4">
              <p className="eyebrow text-ember-500">{spec.eyebrow}</p>
              <Tag tag={spec.tag} />
            </motion.div>
            <motion.h2 variants={item} className="display mt-3 text-3xl font-bold leading-[1.05] text-steel-50 sm:text-4xl">
              {spec.headline}
            </motion.h2>
            <motion.p variants={item} className="mt-4 max-w-xl text-base leading-relaxed text-steel-300">
              {spec.subhead}
            </motion.p>

            <motion.div variants={item} className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              {spec.points.map((p) => (
                <div key={p.title}>
                  <div className="h-px w-7 bg-ember-500" />
                  <h3 className="display mt-2 text-sm font-bold leading-tight text-steel-50">{p.title}</h3>
                </div>
              ))}
            </motion.div>

            <motion.div variants={item} className="mt-6 flex items-center gap-3 rounded-lg border border-ember-500/50 bg-ember-500/10 px-4 py-3.5">
              <span className="livedot pulse flex-none" />
              <p className="text-sm leading-relaxed text-steel-100">
                <span className="font-bold text-ember-300">This is the real app</span>, running at a Clayco site today —{' '}
                <span className="font-bold text-steel-50">tap the screen and walk through it yourself.</span>
              </p>
              <motion.span
                aria-hidden
                className="hidden flex-none text-ember-400 lg:block"
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowRight size={26} />
              </motion.span>
            </motion.div>
          </div>

          <motion.div variants={item} className="relative">
            <motion.div
              aria-hidden
              className="pointer-events-none absolute -top-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-ember-500 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-[0_8px_24px_-6px_rgba(201,75,12,0.85)]"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <MousePointerClick size={15} /> Tap to try — it&apos;s live
            </motion.div>
            <PantryReplica onInteract={pause} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
