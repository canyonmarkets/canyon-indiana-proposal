'use client';

import { motion } from 'framer-motion';
import { Dumbbell, ShoppingBag, Tent, Truck } from 'lucide-react';
import { item } from '@/app/components/deck/anim';
import { OVERVIEW } from '@/app/data/pillars';

const ICONS: Record<string, React.ReactNode> = {
  pantry: <ShoppingBag size={22} />,
  amenities: <Dumbbell size={22} />,
  field: <Tent size={22} />,
  foodtrucks: <Truck size={22} />,
};

export default function OpportunityScene() {
  return (
    <div className="scene">
      <div className="scene-inner">
        <motion.p variants={item} className="eyebrow text-ember-500">
          {OVERVIEW.eyebrow}
        </motion.p>
        <motion.h2 variants={item} className="display mt-3 text-4xl font-bold leading-tight text-steel-50 sm:text-5xl">
          Four programs. One operator. <span className="text-ember-500">Zero on you.</span>
        </motion.h2>
        <motion.p variants={item} className="mt-4 max-w-3xl text-lg leading-relaxed text-steel-300">
          {OVERVIEW.subhead}
        </motion.p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {OVERVIEW.pillars.map((p, i) => (
            <motion.div key={p.id} variants={item} className="panel panel-hover flex flex-col rounded-2xl p-5">
              <div className="flex items-center justify-between text-ember-400">
                <span>{ICONS[p.id]}</span>
                <span className="display text-2xl font-bold text-charcoal-400">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <h3 className="display mt-4 text-lg font-bold leading-tight text-steel-50">{p.name}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-steel-300">{p.oneLiner}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
