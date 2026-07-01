'use client';

import { type ReactElement } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { item } from '@/app/components/deck/anim';
import { Tag } from '@/app/components/ui';

/** Generic QR-style placeholder — swap for the real scannable PNG at deploy. */
function QrPlaceholder({ size = 150 }: { size?: number }) {
  const n = 25;
  const cell = size / n;
  const inFinder = (i: number, j: number) => (i < 8 && j < 8) || (i > n - 9 && j < 8) || (i < 8 && j > n - 9);
  const dots: ReactElement[] = [];
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (inFinder(i, j)) continue;
      if ((i * 7 + j * 13 + i * j * 3) % 3 === 0) {
        dots.push(<rect key={`${i}-${j}`} x={i * cell} y={j * cell} width={cell} height={cell} fill="#060810" />);
      }
    }
  }
  const Finder = ({ x, y }: { x: number; y: number }) => (
    <>
      <rect x={x * cell} y={y * cell} width={7 * cell} height={7 * cell} fill="#060810" />
      <rect x={(x + 1) * cell} y={(y + 1) * cell} width={5 * cell} height={5 * cell} fill="#FCFCFB" />
      <rect x={(x + 2) * cell} y={(y + 2) * cell} width={3 * cell} height={3 * cell} fill="#060810" />
    </>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="crispEdges" className="rounded-lg border border-charcoal-600">
      <rect width={size} height={size} fill="#FCFCFB" />
      {dots}
      <Finder x={0} y={0} />
      <Finder x={n - 7} y={0} />
      <Finder x={0} y={n - 7} />
    </svg>
  );
}

/** Real QR (/img/qr-suggestions.png) covers the placeholder once it exists. */
function QrBlock() {
  return (
    <div className="flex flex-none flex-col items-center gap-2.5">
      <div className="relative h-[150px] w-[150px]">
        <QrPlaceholder size={150} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/qr-suggestions.png"
          alt="Scan to add your favorites"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          className="absolute inset-0 h-[150px] w-[150px] rounded-lg border border-charcoal-600"
        />
      </div>
      <motion.span
        animate={{
          scale: [1, 1.06, 1],
          boxShadow: ['0 0 0 0 rgba(52,211,153,0)', '0 0 22px 5px rgba(52,211,153,0.45)', '0 0 0 0 rgba(52,211,153,0)'],
        }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        className="flex items-center gap-2 rounded-full border border-live-500/60 bg-live-500/15 px-4 py-2 text-sm font-bold uppercase tracking-wide text-live-500"
      >
        <span className="livedot pulse" /> Live · scan it now
      </motion.span>
      <span className="text-sm font-bold text-steel-200">Opens the real menu on your phone</span>
    </div>
  );
}

const STEPS = [
  { t: 'Scan the code', d: 'From any phone — nothing to install' },
  { t: 'Browse the full menu', d: 'Every item across the pantries and markets' },
  { t: 'Heart your picks', d: 'Your favorites roll straight into our restock' },
];

const REQUESTED = [
  { name: 'Celsius Arctic', votes: 41 },
  { name: 'Takis Fuego', votes: 33 },
  { name: 'Cold Brew', votes: 28 },
  { name: 'Liquid Death', votes: 22 },
  { name: 'Quest Bar', votes: 18 },
];

export default function SuggestScene() {
  return (
    <div className="scene">
      <div className="scene-inner max-w-6xl">
        <motion.div variants={item} className="flex items-center justify-between gap-4">
          <p className="eyebrow text-ember-500">Worker Voice · Live Demand</p>
          <Tag tag="live" />
        </motion.div>
        <motion.h2 variants={item} className="display mt-3 text-3xl font-bold leading-tight text-steel-50 sm:text-4xl">
          The crew picks the <span className="text-ember-500">menu.</span>
        </motion.h2>
        <motion.p variants={item} className="mt-3 max-w-2xl text-base leading-relaxed text-steel-300">
          Every worker and contractor scans one code, browses the full menu on their phone, and hearts what they want —
          so the shelves reflect what your people actually ask for, not a guess.
        </motion.p>
        <motion.p variants={item} className="mt-3 text-sm font-semibold text-ember-300">
          Reviewing this on a screen? Point your phone camera at the code below — it&apos;s live right now, and it opens the real menu.
        </motion.p>

        <div className="mt-7 grid items-center gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          {/* left — QR + steps */}
          <motion.div variants={item} className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
            <QrBlock />
            <div className="space-y-3">
              {STEPS.map((s, i) => (
                <div key={s.t} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full border border-ember-500/40 bg-ember-500/15 text-xs font-bold text-ember-300">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-steel-100">{s.t}</p>
                    <p className="text-[13px] leading-snug text-steel-400">{s.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* right — live demand board */}
          <motion.div variants={item} className="panel rounded-2xl p-5">
            <p className="kicker text-steel-400">Most requested this week</p>
            <div className="mt-3 space-y-2.5">
              {REQUESTED.map((r, i) => (
                <div key={r.name} className="flex items-center gap-3">
                  <span className="w-28 flex-none truncate text-sm text-steel-200">{r.name}</span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-charcoal-800">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(r.votes / REQUESTED[0].votes) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-ember-500"
                    />
                  </div>
                  <span className="flex w-10 flex-none items-center justify-end gap-1 text-xs text-steel-300">
                    <Heart size={11} className="fill-current text-ember-400" /> {r.votes}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[13px] leading-relaxed text-steel-400">
              Requests roll up in real time — the shelves reflect the crew, across every pantry and market on site.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
