'use client';

import { useRef, useState } from 'react';
import { Check, Heart } from 'lucide-react';
import { MENU, TOTAL_ITEMS } from './catalog';

export default function MenuApp() {
  const [sel, setSel] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const picks = Object.keys(sel).filter((k) => sel[k]);
  const count = picks.length;
  const toggle = (key: string) => setSel((s) => ({ ...s, [key]: !s[key] }));

  const submit = () => {
    try {
      localStorage.setItem('canyon-favorites', JSON.stringify({ picks, at: new Date().toISOString() }));
      const raw = localStorage.getItem('canyon-favorites-tally');
      const tally: Record<string, number> = raw ? JSON.parse(raw) : {};
      picks.forEach((p) => {
        tally[p] = (tally[p] || 0) + 1;
      });
      localStorage.setItem('canyon-favorites-tally', JSON.stringify(tally));
    } catch {
      /* storage may be blocked — submit still succeeds visually */
    }
    setDone(true);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const reset = () => {
    setSel({});
    setDone(false);
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const jump = (id: string) => document.getElementById(`cat-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const ItemBtn = ({ k, label }: { k: string; label: string }) => {
    const on = !!sel[k];
    return (
      <button
        onClick={() => toggle(k)}
        aria-pressed={on}
        className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-all ${
          on ? 'border-ember-500/70 bg-ember-500/10' : 'border-charcoal-600/40 bg-charcoal-800/50 hover:border-charcoal-500'
        }`}
      >
        <span className={`text-sm ${on ? 'font-semibold text-steel-50' : 'text-steel-200'}`}>{label}</span>
        <span
          className={`flex h-6 w-6 flex-none items-center justify-center rounded-full border transition-all ${
            on ? 'border-ember-500 bg-ember-500 text-white' : 'border-charcoal-500 text-transparent'
          }`}
        >
          <Check size={14} strokeWidth={3} />
        </span>
      </button>
    );
  };

  return (
    <div ref={scrollRef} className="fixed inset-0 overflow-y-auto bg-charcoal-900">
      {done ? (
        <div className="flex min-h-full flex-col items-center justify-center px-6 py-16 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-ember-500">
            <Check size={40} strokeWidth={3} className="text-white" />
          </div>
          <h1 className="display mt-5 text-3xl font-bold text-steel-50">You&apos;re all set!</h1>
          <p className="mt-2 max-w-xs text-steel-300">
            <span className="font-semibold text-ember-300">{count}</span> favorite{count === 1 ? '' : 's'} logged. We keep these stocked for your crew.
          </p>
          <button onClick={reset} className="mt-7 rounded-xl bg-charcoal-700 px-6 py-3 text-sm font-bold uppercase tracking-wide text-steel-100 transition-colors hover:bg-charcoal-600">
            Choose again
          </button>
          <p className="kicker mt-8 text-steel-600">Sponsored Pantry · Canyon Markets</p>
        </div>
      ) : (
        <>
          {/* header + category quick-nav */}
          <div className="sticky top-0 z-20 border-b border-charcoal-700/60 bg-charcoal-900/90 backdrop-blur">
            <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/canyon-logo.png" alt="Canyon Markets" className="h-7 w-auto" />
              <div className="min-w-0">
                <h1 className="display text-base font-bold leading-none text-steel-50">Pantry Favorites</h1>
                <p className="mt-0.5 text-[12px] text-steel-300">Tap everything you&apos;d grab on a shift</p>
              </div>
              <span className="ml-auto flex-none rounded-full border border-ember-500/40 bg-ember-500/10 px-2.5 py-1 text-[11px] font-bold text-ember-300">
                {count} picked
              </span>
            </div>
            <nav className="mx-auto max-w-2xl overflow-x-auto px-4 pb-2">
              <div className="flex gap-1.5">
                {MENU.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => jump(c.id)}
                    className="flex-none whitespace-nowrap rounded-full border border-charcoal-600/50 bg-charcoal-800/60 px-3 py-1 text-[11px] font-semibold text-steel-300 transition-colors hover:border-ember-500/50 hover:text-ember-300"
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </nav>
          </div>

          {/* categories */}
          <main className="mx-auto max-w-2xl px-4 pb-28 pt-5">
            {MENU.map((cat) => {
              const Icon = cat.icon;
              const groups = cat.brands.filter((b) => b.variants.length >= 2);
              const singles = cat.brands.filter((b) => b.variants.length < 2);
              return (
                <section key={cat.id} id={`cat-${cat.id}`} className="mb-8 scroll-mt-28">
                  <div className="mb-3 flex items-center gap-2">
                    <Icon size={16} className="text-ember-400" />
                    <h2 className="display text-sm font-bold uppercase tracking-wide text-steel-100">{cat.name}</h2>
                  </div>

                  {groups.map((b) => (
                    <div key={b.brand} className="mb-4">
                      <p className="mb-2 flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-steel-300">
                        <span className="h-1 w-1 flex-none rounded-full bg-ember-500" />
                        {b.brand}
                      </p>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {b.variants.map((v) => (
                          <ItemBtn key={`${b.brand} · ${v}`} k={`${b.brand} · ${v}`} label={v} />
                        ))}
                      </div>
                    </div>
                  ))}

                  {singles.length > 0 && (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {singles.map((b) => (
                        <ItemBtn key={b.brand} k={b.brand} label={b.brand} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
            <p className="kicker text-center text-steel-600">{TOTAL_ITEMS} items · more added every week</p>
          </main>

          {/* submit bar */}
          <div className="sticky bottom-0 z-20 border-t border-charcoal-700/60 bg-charcoal-900/90 backdrop-blur">
            <div className="mx-auto max-w-2xl px-4 py-3">
              <button
                onClick={submit}
                disabled={count === 0}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold uppercase tracking-wide transition-all ${
                  count === 0 ? 'cursor-not-allowed bg-charcoal-700 text-steel-500' : 'bg-ember-500 text-white hover:bg-ember-400 active:scale-[0.99]'
                }`}
              >
                <Heart size={16} className={count === 0 ? '' : 'fill-current'} />
                {count === 0 ? 'Pick your favorites' : `Submit ${count} favorite${count === 1 ? '' : 's'}`}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
