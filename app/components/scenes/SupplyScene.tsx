'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';
import { useDeck } from '@/app/components/deck/Deck';
import { SUPPLY_CATEGORIES } from '@/app/data/proposal';
import { DIST_GROUPS, type DistGroup } from '@/app/data/supply';

const MAX = Math.max(...SUPPLY_CATEGORIES.map((c) => c.count));

const variantCount = (g: DistGroup) => g.products.reduce((a, p) => a + Math.max(p.flavors.length, 1), 0);

function Chip({ on, onClick, accent, label }: { on: boolean; onClick: () => void; accent: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all ${
        on ? 'border-ember-500/60 bg-charcoal-800 text-steel-50' : 'border-charcoal-600/30 bg-charcoal-900/40 text-steel-300 hover:border-charcoal-500/50'
      }`}
    >
      <span className="h-2 w-2 flex-none rounded-sm" style={{ background: accent }} />
      {label}
    </button>
  );
}

export default function SupplyScene() {
  const { pause } = useDeck();
  const [active, setActive] = useState<string | null>(null);
  const select = (id: string | null) => {
    setActive(id);
    pause();
  };
  const sel = active ? DIST_GROUPS.find((g) => g.id === active) ?? null : null;

  return (
    <div className="scene">
      <div className="scene-inner max-w-6xl">
        <motion.div variants={item} className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-ember-500">Hardened Supply Chain</p>
            <h2 className="display mt-1.5 text-2xl font-bold leading-tight text-steel-50 sm:text-3xl">
              Engineered around <span className="text-ember-500">the majors.</span>
            </h2>
          </div>
          <p className="text-sm text-steel-300">
            Tap a channel to see <span className="font-semibold text-ember-300">every variant it delivers</span>.
          </p>
        </motion.div>

        {/* channel filter */}
        <motion.div variants={item} className="mt-4 flex flex-wrap gap-2">
          <Chip on={active === null} onClick={() => select(null)} accent="#C94B0C" label="All channels" />
          {DIST_GROUPS.map((g) => (
            <Chip key={g.id} on={active === g.id} onClick={() => select(g.id)} accent={g.accent} label={g.name} />
          ))}
        </motion.div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          {/* explorer */}
          <motion.div variants={item} className="panel h-[54vh] overflow-hidden rounded-2xl p-4">
            <AnimatePresence mode="wait">
              {sel ? (
                <motion.div
                  key={sel.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex h-full flex-col"
                >
                  <div className="flex items-center gap-3 rounded-xl border-l-2 bg-charcoal-800/40 px-4 py-3" style={{ borderColor: sel.accent }}>
                    <span className="h-3 w-3 flex-none rounded-sm" style={{ background: sel.accent }} />
                    <div>
                      <h3 className="display text-lg font-bold leading-tight text-steel-50">{sel.name}</h3>
                      <p className="kicker text-steel-500">{sel.channel}</p>
                    </div>
                    <span className="ml-auto text-right">
                      <span className="display block text-sm font-bold text-ember-300">{sel.products.length} brands</span>
                      <span className="kicker text-steel-500">{variantCount(sel)} variants</span>
                    </span>
                  </div>

                  <div className="mt-3 flex-1 overflow-y-auto pr-1">
                    <div className="columns-2 gap-3 sm:columns-3">
                      {sel.products.map((p) => (
                        <div key={p.name} className="mb-3 break-inside-avoid rounded-lg border border-charcoal-700/70 bg-charcoal-900/40 p-2.5">
                          <p className="display text-[13px] font-bold leading-tight text-steel-100">{p.name}</p>
                          {p.flavors.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-1">
                              {p.flavors.map((f) => (
                                <span key={f} className="rounded border border-charcoal-700 bg-charcoal-800 px-1.5 py-0.5 text-[10px] leading-none text-steel-300">
                                  {f}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="grid h-full grid-cols-2 gap-2.5 overflow-y-auto sm:grid-cols-3"
                >
                  {DIST_GROUPS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => select(g.id)}
                      className="rounded-xl border border-charcoal-700 bg-charcoal-900/40 p-3 text-left transition-all hover:border-ember-500/40 hover:bg-charcoal-800"
                    >
                      <span className="block h-2.5 w-2.5 rounded-sm" style={{ background: g.accent }} />
                      <h3 className="display mt-2 text-sm font-bold leading-tight text-steel-50">{g.name}</h3>
                      <p className="kicker text-steel-500">{g.channel}</p>
                      <p className="mt-1.5 text-[12px] leading-snug text-steel-300">
                        {g.products.slice(0, 4).map((p) => p.name).join(' · ')}
                        {g.products.length > 4 ? ` +${g.products.length - 4}` : ''}
                      </p>
                      <p className="kicker mt-1.5 text-ember-300">{g.products.length} brands · {variantCount(g)} variants</p>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* catalog depth */}
          <motion.div variants={item} className="panel rounded-2xl p-5">
            <p className="kicker text-steel-400">Catalog depth · 263 SKUs</p>
            <div className="mt-3.5 space-y-2.5">
              {SUPPLY_CATEGORIES.map((c, i) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-steel-300">{c.name}</span>
                    <span className="text-steel-500">{c.count}</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-charcoal-900">
                    <motion.div
                      className="h-full rounded-full bg-ember-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${(c.count / MAX) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.06, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="kicker mt-4 leading-relaxed text-steel-500">
              DSD fleets handle the freight onto site — our team stays on markets &amp; tech.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
