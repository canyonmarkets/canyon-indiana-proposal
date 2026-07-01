'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { item } from '@/app/components/deck/anim';
import { useDeck } from '@/app/components/deck/Deck';

const SHOTS = [
  {
    img: '/img/env-tent.jpg',
    label: 'Field break-tent market',
    caption: 'Coolers, hot food, and 250+ SKUs feed a whole crew inside one break — self-checkout, no truck line.',
  },
  {
    img: '/img/env-crew.jpg',
    label: 'Grab hot food & go',
    caption: 'Walk up, grab a hot sandwich and a cold drink, tap, and get back to work. No cashier, no wait.',
  },
  {
    img: '/img/env-amenity.jpg',
    label: 'Amenity market',
    caption: 'A clean, branded market — fresh food, coffee, and cold drinks, steps from where crews work.',
  },
  {
    img: '/img/env-real.jpg',
    label: 'A real micro market',
    caption: 'Not a concept. Open-shelf markets with self-checkout run in the field today.',
  },
  {
    img: '/img/env-proven.jpg',
    label: 'A proven format',
    caption: 'The same self-serve model retailers already trust — tuned for your crews and your site.',
  },
];

const ROTATE_MS = 3600;

export default function MarketGalleryScene() {
  const { pause } = useDeck();
  const [i, setI] = useState(0);
  const [interacted, setInteracted] = useState(false);

  useEffect(() => {
    if (interacted) return;
    const t = setInterval(() => setI((x) => (x + 1) % SHOTS.length), ROTATE_MS);
    return () => clearInterval(t);
  }, [interacted]);

  const select = (n: number) => {
    setI(n);
    setInteracted(true);
    pause();
  };

  const shot = SHOTS[i];

  return (
    <div className="scene">
      <div className="scene-inner max-w-6xl">
        <motion.div variants={item} className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="eyebrow text-ember-500">See it in the space</p>
            <h2 className="display mt-1.5 text-2xl font-bold leading-tight text-steel-50 sm:text-3xl">
              This is a <span className="text-ember-500">micro market.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-steel-300">
            Open shelves, coolers, and a self-checkout kiosk — dropped into your trailers, tents, and break rooms. No
            machines, no lines, no cashier.
          </p>
        </motion.div>

        {/* hero */}
        <motion.div variants={item} className="panel reticle mt-4 overflow-hidden rounded-2xl">
          <div className="relative h-[48vh] w-full bg-charcoal-950">
            <AnimatePresence mode="wait">
              <motion.img
                key={shot.img}
                src={shot.img}
                alt={shot.label}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* caption */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal-950 via-charcoal-950/70 to-transparent px-6 pb-5 pt-16">
              <AnimatePresence mode="wait">
                <motion.div key={shot.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <p className="eyebrow text-ember-300">{shot.label}</p>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-steel-50 sm:text-base">{shot.caption}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* thumbnails */}
        <motion.div variants={item} className="mt-3 flex gap-2">
          {SHOTS.map((s, n) => (
            <button
              key={s.img}
              onClick={() => select(n)}
              aria-label={s.label}
              className={`relative h-14 flex-1 overflow-hidden rounded-lg border-2 transition-all ${
                n === i ? 'border-ember-500' : 'border-transparent opacity-55 hover:opacity-100'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.img} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
