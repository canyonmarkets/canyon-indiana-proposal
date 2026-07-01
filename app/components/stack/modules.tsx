'use client';

import { useEffect, useRef, useState, type ComponentType, type ReactElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Activity, Boxes, Check, Cpu, GitBranch, Heart, QrCode, Sparkles, Tablet } from 'lucide-react';

/* ----- shared chrome ----------------------------------------------------- */

function Screen({ title, status, children }: { title: string; status?: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-charcoal-600/30 px-4 py-2.5">
        <span className="kicker text-steel-400">{title}</span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-live-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-live-500" /> {status ?? 'Live'}
        </span>
      </div>
      <div className="relative flex-1 overflow-hidden p-4">{children}</div>
    </div>
  );
}

/** Loops through phases on a timer; returns the current phase index. */
function usePhases(durations: number[]) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    let idx = 0;
    let timer: ReturnType<typeof setTimeout>;
    const run = () => {
      setPhase(idx);
      timer = setTimeout(() => {
        idx = (idx + 1) % durations.length;
        run();
      }, durations[idx]);
    };
    run();
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return phase;
}

function clock() {
  const d = new Date();
  const h = d.getHours() % 12 || 12;
  return `${h}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

/* ----- 1 · kiosk POS ----------------------------------------------------- */

const POS_ITEMS = [
  { n: 'Celsius Arctic', p: 2.75 },
  { n: 'Doritos Nacho', p: 1.95 },
  { n: 'Cheez-It', p: 1.85 },
];

function KioskPOS() {
  const phase = usePhases([700, 850, 850, 1100, 2600]); // 0 empty → 3 charge → 4 approved
  const shown = Math.min(phase, 3);
  const approved = phase === 4;
  const total = POS_ITEMS.slice(0, shown).reduce((a, b) => a + b.p, 0);

  return (
    <Screen title="kiosk · self-checkout" status="Stripe online">
      <div className="mx-auto flex h-full max-w-xs flex-col">
        <div className="flex-1 space-y-2.5">
          {POS_ITEMS.map((it, i) => (
            <motion.div
              key={it.n}
              animate={{ opacity: i < shown ? 1 : 0.18 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between text-sm"
            >
              <span className="text-steel-200">{it.n}</span>
              <span className="font-mono text-steel-100">${it.p.toFixed(2)}</span>
            </motion.div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between border-t border-charcoal-600/30 pt-3">
          <span className="kicker text-steel-400">Total</span>
          <span className="display text-2xl font-bold text-steel-50">${total.toFixed(2)}</span>
        </div>
        <div className="mt-3 h-11">
          <AnimatePresence mode="wait">
            {approved ? (
              <motion.div
                key="ok"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-live-500/40 bg-live-500/10 text-sm font-bold uppercase tracking-wide text-live-500"
              >
                <Check size={16} /> Approved · tap to pay
              </motion.div>
            ) : (
              <motion.div
                key="charge"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex h-11 items-center justify-center rounded-lg bg-ember-500 text-sm font-bold uppercase tracking-wide text-white"
              >
                Charge ${total.toFixed(2)}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Screen>
  );
}

/* ----- 2 · par-level back office ----------------------------------------- */

const PAR_ROWS = [
  { n: 'Celsius Arctic', par: 16, low: 4 },
  { n: 'Monster Ultra', par: 12, low: 3 },
  { n: 'Doritos Nacho', par: 20, low: 7 },
  { n: 'Cheez-It', par: 14, low: 5 },
];

function ParRestock() {
  const phase = usePhases([2400, 2800]); // 0 below par → 1 restocked
  const filled = phase === 1;

  return (
    <Screen title="back office · par levels" status={filled ? 'Restocked' : 'Below par'}>
      <div className="flex h-full flex-col justify-center space-y-3.5">
        {PAR_ROWS.map((r) => {
          const onhand = filled ? r.par : r.low;
          const pct = (onhand / r.par) * 100;
          return (
            <div key={r.n}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-steel-200">{r.n}</span>
                <span className="font-mono text-xs text-steel-400">
                  {onhand}/{r.par}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-charcoal-700">
                <motion.div
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className={`h-full rounded-full ${filled ? 'bg-live-500' : 'bg-ember-500'}`}
                />
              </div>
            </div>
          );
        })}
        <div className="pt-1 text-center">
          <span className="kicker text-ember-300">{filled ? 'Pick-list cleared · synced to route' : 'One-click restock-to-par →'}</span>
        </div>
      </div>
    </Screen>
  );
}

/* ----- 3 · pantry consumption log ---------------------------------------- */

const LOG_FEED = [
  { item: 'Celsius Arctic', who: 'Trailer 14' },
  { item: 'KIND Bar', who: 'Leadership' },
  { item: 'Liquid Death', who: 'Trailer 63' },
  { item: 'Cheez-It', who: 'Trailer 28' },
  { item: 'Cold Brew', who: 'Leadership' },
  { item: 'Pop-Tarts', who: 'Trailer 91' },
];

function PantryLog() {
  const [rows, setRows] = useState<{ id: number; item: string; who: string; t: string }[]>([]);
  const idRef = useRef(0);
  useEffect(() => {
    const push = () => {
      const f = LOG_FEED[idRef.current % LOG_FEED.length];
      idRef.current += 1;
      setRows((r) => [{ id: idRef.current, item: f.item, who: f.who, t: clock() }, ...r].slice(0, 5));
    };
    push();
    const iv = setInterval(push, 1500);
    return () => clearInterval(iv);
  }, []);

  return (
    <Screen title="clayco pantry · consumption log" status="Logging">
      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {rows.map((r) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between rounded-lg border border-charcoal-700 bg-charcoal-800/60 px-3 py-2"
            >
              <div className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-live-500" />
                <span className="text-sm text-steel-100">{r.item}</span>
                <span className="kicker text-steel-500">{r.who}</span>
              </div>
              <span className="font-mono text-[11px] text-steel-400">{r.t}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Screen>
  );
}

/* ----- 4 · sales → inventory bridge -------------------------------------- */

function SalesBridge() {
  const [onhand, setOnhand] = useState(48);
  const [pulse, setPulse] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => {
      setPulse((p) => p + 1);
      setTimeout(() => setOnhand((o) => (o <= 12 ? 48 : o - 1)), 650);
    }, 1800);
    return () => clearInterval(iv);
  }, []);

  return (
    <Screen title="sales → inventory bridge" status="Syncing">
      <div className="flex h-full items-center justify-between gap-2">
        <div className="flex flex-col items-center gap-2">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-ember-500/40 bg-charcoal-800">
            <Tablet className="text-ember-400" />
          </div>
          <span className="kicker text-steel-400">Kiosk sale</span>
        </div>

        <div className="relative flex-1">
          <div className="h-px w-full bg-charcoal-600" />
          <motion.div
            key={pulse}
            initial={{ left: '0%', opacity: 1 }}
            animate={{ left: '100%', opacity: 0.25 }}
            transition={{ duration: 0.65, ease: 'linear' }}
            className="absolute -top-[3px] h-1.5 w-1.5 rounded-full bg-ember-400 shadow-[0_0_8px_2px_rgba(201,75,12,0.6)]"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <motion.div
            key={onhand}
            initial={{ scale: 1 }}
            animate={{ scale: [1.12, 1] }}
            transition={{ duration: 0.4 }}
            className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl border border-live-500/40 bg-charcoal-800"
          >
            <span className="display text-xl font-bold text-steel-50">{onhand}</span>
            <span className="text-[8px] uppercase tracking-wider text-steel-500">on hand</span>
          </motion.div>
          <span className="kicker text-steel-400">Inventory</span>
        </div>
      </div>
    </Screen>
  );
}

/* ----- 5 · fleet telemetry ----------------------------------------------- */

const KIOSKS = ['SF1', 'SF2', 'CC1', 'CC2'];

function Telemetry() {
  const [secs, setSecs] = useState([0, 2, 4, 1]);
  useEffect(() => {
    const iv = setInterval(() => {
      setSecs((arr) => arr.map((s) => (s >= 5 ? 0 : s + 1)));
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  return (
    <Screen title="fleet telemetry · heartbeat" status="All online">
      <div className="grid h-full grid-cols-2 gap-3">
        {KIOSKS.map((k, i) => (
          <div key={k} className="flex flex-col justify-between rounded-xl border border-charcoal-700 bg-charcoal-800/60 p-3">
            <div className="flex items-center justify-between">
              <span className="display text-sm font-bold text-steel-100">{k}</span>
              <motion.span
                animate={{ opacity: secs[i] === 0 ? [1, 0.3, 1] : 1, scale: secs[i] === 0 ? [1, 1.5, 1] : 1 }}
                transition={{ duration: 0.5 }}
                className="h-2 w-2 rounded-full bg-live-500"
              />
            </div>
            <div className="mt-2">
              <span className="font-mono text-[11px] text-steel-400">last beat {secs[i]}s ago</span>
              <div className="mt-0.5 text-[10px] uppercase tracking-wider text-live-500">online · v2.4.1</div>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

/* ----- 6 · AI insights --------------------------------------------------- */

const INSIGHTS = [
  'Celsius velocity +18% at SF1 — raise par 12 → 16 before Friday.',
  'Pop-Tarts dead 9 days at CC2 — pull from planogram, free 2 facings.',
  'Energy category pacing 2.3× site average — add a second cooler at the gym.',
];

function AIInsights() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');
  useEffect(() => {
    const full = INSIGHTS[idx];
    setTyped('');
    let i = 0;
    const type = setInterval(() => {
      i += 1;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(type);
    }, 26);
    const next = setTimeout(() => setIdx((x) => (x + 1) % INSIGHTS.length), 4800);
    return () => {
      clearInterval(type);
      clearTimeout(next);
    };
  }, [idx]);

  return (
    <Screen title="AI insights · claude" status="Analyzing">
      <div className="flex h-full flex-col justify-center gap-5">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg border border-ember-500/40 bg-ember-500/15">
            <Sparkles size={18} className="text-ember-400" />
          </div>
          <p className="min-h-[3.75rem] text-base leading-relaxed text-steel-100">
            {typed}
            <span className="ml-0.5 inline-block h-4 w-[2px] -translate-y-[1px] animate-pulse bg-ember-400 align-middle" />
          </p>
        </div>
        <div className="flex gap-1.5">
          {INSIGHTS.map((_, i) => (
            <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i === idx ? 'bg-ember-500' : 'bg-charcoal-700'}`} />
          ))}
        </div>
      </div>
    </Screen>
  );
}

/* ----- 7 · worker suggestions (QR) --------------------------------------- */

/** Generic QR-style placeholder — swap for the real scannable PNG at deploy. */
function QrPlaceholder({ size = 128 }: { size?: number }) {
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

const REQUESTED = [
  { name: 'Celsius Arctic', votes: 41 },
  { name: 'Takis Fuego', votes: 33 },
  { name: 'Cold Brew', votes: 28 },
  { name: 'Liquid Death', votes: 22 },
];

/** Shows the real QR if /img/qr-suggestions.png exists, else the placeholder. */
function QrImage() {
  return (
    <div className="flex flex-none flex-col items-center gap-1.5">
      <div className="relative h-32 w-32">
        <QrPlaceholder size={128} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/img/qr-suggestions.png"
          alt="Scan to suggest"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
          className="absolute inset-0 h-32 w-32 rounded-lg border border-charcoal-600"
        />
      </div>
      <span className="kicker text-steel-300">Scan to suggest</span>
    </div>
  );
}

function QRSuggest() {
  return (
    <Screen title="worker voice · qr suggestions" status="Open">
      <div className="flex h-full flex-col items-center gap-4 sm:flex-row sm:gap-5">
        <QrImage />

        {/* explainer + live demand board */}
        <div className="min-w-0 flex-1">
          <p className="text-sm leading-relaxed text-steel-200">
            Every worker scans, browses the full menu, and <span className="text-ember-300">hearts what they want</span>. Requests roll up into a
            live board that steers exactly what we stock.
          </p>
          <p className="kicker mt-3 text-steel-500">Most requested this week</p>
          <div className="mt-2 space-y-1.5">
            {REQUESTED.map((r, i) => (
              <div key={r.name} className="flex items-center gap-2">
                <span className="w-28 flex-none truncate text-xs text-steel-200">{r.name}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-charcoal-800">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(r.votes / REQUESTED[0].votes) * 100}%` }}
                    transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-ember-500"
                  />
                </div>
                <span className="flex w-9 flex-none items-center justify-end gap-1 text-[11px] text-steel-400">
                  <Heart size={10} className="text-ember-400" /> {r.votes}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}

/* ----- registry ---------------------------------------------------------- */

export type StackModule = {
  id: string;
  title: string;
  desc: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  Module: ComponentType;
};

export const MODULES: StackModule[] = [
  { id: 'pos', title: 'Custom kiosk POS', desc: 'Self-checkout we built — live in Arizona.', icon: Cpu, Module: KioskPOS },
  { id: 'par', title: 'Par-level back office', desc: 'On-hand vs par, one-click restock.', icon: Boxes, Module: ParRestock },
  { id: 'pantry', title: 'Clayco pantry app', desc: 'Itemized, timestamped consumption.', icon: Tablet, Module: PantryLog },
  { id: 'bridge', title: 'Sales → inventory bridge', desc: 'Every sale decrements on-hand.', icon: GitBranch, Module: SalesBridge },
  { id: 'telemetry', title: 'Live kiosk telemetry', desc: 'Every kiosk heartbeats on a 5-min pulse.', icon: Activity, Module: Telemetry },
  { id: 'ai', title: 'AI operations insights', desc: 'Claude surfaces the next restock move.', icon: Sparkles, Module: AIInsights },
  { id: 'qr', title: 'Worker suggestions', desc: 'Scan-to-favorite demand sensing.', icon: QrCode, Module: QRSuggest },
];
