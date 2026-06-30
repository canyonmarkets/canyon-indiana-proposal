'use client';

import { motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';
import { useDeck } from '@/app/components/deck/Deck';
import { Tag } from '@/app/components/ui';
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

            <motion.p variants={item} className="mt-6 rounded-lg border-l-2 border-ember-500 bg-charcoal-800/60 px-4 py-3 text-sm leading-relaxed text-steel-200">
              <span className="font-semibold text-ember-300">This is the real app —</span> running at a Clayco site today. Tap the
              screen and walk through it yourself.
            </motion.p>
          </div>

          <motion.div variants={item}>
            <PantryReplica onInteract={pause} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
