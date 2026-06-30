'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Check, Coffee, Cookie, Flame, Minus, Plus, ShoppingBag, Zap } from 'lucide-react';

type Screen = 'idle' | 'categories' | 'products' | 'cart' | 'thanks';

const CATS = [
  { id: 'energy', name: 'Energy', icon: Zap, items: ['Celsius', 'Alani Nu', 'Monster Ultra', 'C4 Energy', 'Ghost', 'Reign'] },
  { id: 'soda', name: 'Soda', icon: Coffee, items: ['Coca-Cola', 'Sprite', 'Dr Pepper', 'Mountain Dew', 'Diet Coke', 'A&W'] },
  { id: 'chips', name: 'Chips', icon: Flame, items: ["Doritos", 'Cheetos', "Lay's BBQ", 'Takis', 'Ruffles', 'Fritos'] },
  { id: 'snacks', name: 'Snacks', icon: Cookie, items: ['Cheez-Its', 'Pop-Tarts', "Welch's", "Jack Link's", 'Rice Krispies', 'Pringles'] },
  { id: 'candy', name: 'Candy', icon: Cookie, items: ['Skittles', 'Starburst', 'Sour Patch', "Reese's", 'Trolli', 'Mike & Ike'] },
  { id: 'food', name: 'Hot Food', icon: Flame, items: ['Hot Pockets', 'Jimmy Dean', "Tina's Burrito", 'White Castle', 'Red Baron'] },
];

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export default function PantryReplica({ onInteract }: { onInteract?: () => void }) {
  const [screen, setScreen] = useState<Screen>('idle');
  const [catId, setCatId] = useState(CATS[0].id);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [stamp, setStamp] = useState('');
  const cat = CATS.find((c) => c.id === catId) ?? CATS[0];
  const count = Object.values(cart).reduce((a, b) => a + b, 0);

  const go = (s: Screen) => {
    if (screen === 'idle') onInteract?.();
    setScreen(s);
  };
  const add = (n: string) => setCart((c) => ({ ...c, [n]: (c[n] || 0) + 1 }));
  const dec = (n: string) =>
    setCart((c) => {
      const q = (c[n] || 0) - 1;
      const x = { ...c };
      if (q <= 0) delete x[n];
      else x[n] = q;
      return x;
    });
  const confirm = () => {
    const d = new Date();
    let h = d.getHours();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12 || 12;
    setStamp(`${h}:${pad(d.getMinutes())}:${pad(d.getSeconds())} ${ampm}`);
    setScreen('thanks');
  };

  useEffect(() => {
    if (screen !== 'thanks') return;
    const t = setTimeout(() => {
      setCart({});
      setScreen('idle');
    }, 5000);
    return () => clearTimeout(t);
  }, [screen]);

  return (
    <div className="relative mx-auto w-full max-w-[330px] select-none">
      {/* Device bezel */}
      <div className="relative overflow-hidden rounded-[2rem] border-[6px] border-charcoal-700 bg-charcoal-950 shadow-2xl" style={{ aspectRatio: '3 / 4' }}>
        {/* sandbox pill — only where there's no top bar */}
        {(screen === 'idle' || screen === 'thanks') && (
          <div className="absolute right-3 top-3 z-30 rounded-full border border-ember-500/50 bg-charcoal-950/90 px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider text-ember-300">
            Sandbox · demo
          </div>
        )}

        {/* top bar (not on idle) */}
        {screen !== 'idle' && screen !== 'thanks' && (
          <div className="absolute inset-x-0 top-0 z-20 flex h-11 items-center justify-between border-b border-charcoal-700 bg-charcoal-900/95 px-3">
            <button
              onClick={() => setScreen(screen === 'products' ? 'categories' : screen === 'cart' ? 'categories' : 'idle')}
              className="flex items-center gap-1 text-steel-300"
            >
              <ArrowLeft size={15} />
              <span className="text-[10px] font-bold uppercase tracking-wide">Back</span>
            </button>
            <span className="display text-[11px] font-bold uppercase tracking-wide text-steel-100">Clayco Pantry · Demo</span>
            <button onClick={() => count > 0 && setScreen('cart')} className="relative flex items-center text-ember-400">
              <ShoppingBag size={18} />
              {count > 0 && (
                <span className="absolute -right-2 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-ember-500 px-1 text-[9px] font-bold text-white">
                  {count}
                </span>
              )}
            </button>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* IDLE */}
          {screen === 'idle' && (
            <motion.button
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => go('categories')}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center"
            >
              <Image src="/img/canyon-logo.png" alt="Canyon" width={56} height={44} className="h-11 w-auto" />
              <div className="display text-xl font-bold uppercase tracking-wide text-steel-50">Clayco Compute</div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-ember-300">Sponsored Pantry</div>
              <div className="mt-4 rounded-full bg-ember-500 px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white">
                Tap to begin
              </div>
              <div className="absolute bottom-4 text-[8px] uppercase tracking-widest text-steel-500">Take what you want · It&apos;s on us</div>
            </motion.button>
          )}

          {/* CATEGORIES */}
          {screen === 'categories' && (
            <motion.div key="cats" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="absolute inset-0 pt-11">
              <div className="grid h-full grid-cols-2 gap-2 p-3">
                {CATS.map((c) => {
                  const Icon = c.icon;
                  return (
                    <button
                      key={c.id}
                      onClick={() => {
                        setCatId(c.id);
                        setScreen('products');
                      }}
                      className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-charcoal-700 bg-charcoal-800 active:border-ember-500"
                    >
                      <Icon size={22} className="text-ember-400" />
                      <span className="display text-[13px] font-bold uppercase text-steel-100">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* PRODUCTS */}
          {screen === 'products' && (
            <motion.div key="prods" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="absolute inset-0 overflow-auto pt-11">
              <div className="px-3 py-2">
                <p className="display text-[11px] font-bold uppercase tracking-wide text-ember-300">{cat.name}</p>
                <div className="mt-1.5 space-y-1.5">
                  {cat.items.map((p) => (
                    <div key={p} className="flex items-center justify-between rounded-lg border border-charcoal-700 bg-charcoal-800 px-3 py-2.5">
                      <span className="text-sm font-medium text-steel-100">{p}</span>
                      <button
                        onClick={() => add(p)}
                        className="rounded-md bg-ember-500 px-3 py-1 text-[11px] font-bold uppercase text-white active:bg-ember-400"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* CART */}
          {screen === 'cart' && (
            <motion.div key="cart" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} className="absolute inset-0 flex flex-col pt-11">
              <div className="flex-1 overflow-auto px-3 py-2">
                <p className="display text-[11px] font-bold uppercase tracking-wide text-ember-300">Your pickup</p>
                <div className="mt-1.5 space-y-1.5">
                  {Object.entries(cart).map(([n, q]) => (
                    <div key={n} className="flex items-center justify-between rounded-lg border border-charcoal-700 bg-charcoal-800 px-3 py-2">
                      <span className="text-sm font-medium text-steel-100">{n}</span>
                      <div className="flex items-center gap-2.5">
                        <button onClick={() => dec(n)} className="flex h-6 w-6 items-center justify-center rounded-full bg-charcoal-700 text-steel-200">
                          <Minus size={13} />
                        </button>
                        <span className="w-4 text-center text-sm font-bold text-steel-50">{q}</span>
                        <button onClick={() => add(n)} className="flex h-6 w-6 items-center justify-center rounded-full bg-charcoal-700 text-steel-200">
                          <Plus size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                  {count === 0 && <p className="mt-6 text-center text-xs text-steel-500">Cart is empty</p>}
                </div>
              </div>
              <div className="border-t border-charcoal-700 p-3">
                <button
                  onClick={confirm}
                  disabled={count === 0}
                  className="w-full rounded-lg bg-ember-500 py-3 text-sm font-bold uppercase tracking-wide text-white active:bg-ember-400 disabled:opacity-40"
                >
                  Confirm pickup · No charge
                </button>
              </div>
            </motion.div>
          )}

          {/* THANKS */}
          {screen === 'thanks' && (
            <motion.div key="thanks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 14 }} className="flex h-16 w-16 items-center justify-center rounded-full bg-ember-500">
                <Check size={32} className="text-white" />
              </motion.div>
              <div className="display text-lg font-bold uppercase text-steel-50">Enjoy!</div>
              <div className="text-[11px] text-steel-300">{count} item{count !== 1 ? 's' : ''} logged to Clayco</div>
              <div className="mt-1 rounded-md border border-charcoal-700 bg-charcoal-900 px-3 py-1.5 font-mono text-[10px] text-live-500">
                ✓ logged at {stamp}
              </div>
              <div className="absolute bottom-4 text-[8px] uppercase tracking-widest text-steel-500">Itemized · timestamped · per-site</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
