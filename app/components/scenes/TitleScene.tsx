'use client';

import { motion } from 'framer-motion';
import { item, word } from '@/app/components/deck/anim';
import { PROPOSAL } from '@/app/lib/site';

export default function TitleScene() {
  return (
    <div className="scene">
      <div className="scene-inner">
        <motion.p variants={item} className="eyebrow text-ember-sheen">
          Large Project Workforce Solutions
        </motion.p>

        <h1 className="display mt-6 text-6xl font-bold leading-[0.92] text-steel-50 sm:text-8xl">
          <motion.span variants={word} className="block">Zero cost.</motion.span>
          <motion.span variants={word} className="block">Full service.</motion.span>
          <motion.span variants={word} className="block text-ember-500">Zero burden.</motion.span>
        </h1>

        <motion.div
          variants={item}
          className="mt-8 h-[3px] origin-left bg-ember-500"
          style={{ width: 150 }}
        />

        <motion.p variants={item} className="mt-8 max-w-2xl text-xl leading-relaxed text-steel-300">
          {PROPOSAL.thesis}
        </motion.p>

        <motion.p variants={item} className="mt-10 font-mono text-[0.7rem] font-bold uppercase tracking-[0.18em] text-steel-300">
          {PROPOSAL.company} · {PROPOSAL.lockup}
        </motion.p>
      </div>
    </div>
  );
}
