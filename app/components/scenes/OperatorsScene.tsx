'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { item } from '@/app/components/deck/anim';

type Owner = { name: string; role: string; img: string; bio: string; tag?: string; featured?: boolean; personal?: string };

const OWNERS: Owner[] = [
  {
    name: 'Joleen Martin',
    role: 'Founder — Canyon Advisors · Cleaners · Apartments',
    img: '/img/joleen.png',
    featured: true,
    bio: "Sole owner of Canyon Advisors — the family's real-estate investment firm since 1998 — with 300+ properties bought, renovated, rented, and sold across Texas, Arizona, and Tennessee. Founded Canyon Cleaners in 2017, then built Canyon Apartments, a 35-unit fully-furnished corporate-housing operation rented by the week. MBA, Grand Canyon University.",
    personal: 'And the role she treasures most: grandmother of four.',
  },
  {
    name: 'Jeff Martin',
    role: 'Co-Owner · Canyon Markets',
    img: '/img/jeff.png',
    bio: "Builds and runs Canyon's proprietary technology — the self-checkout kiosks, par-level dashboard, and AI insights behind this proposal — and operates the markets on the ground. A 32-year educator at the high-school and university level, with a PhD in administration.",
  },
];

// Drop-in headshot: shows the icon underneath; the photo covers it when it loads.
// onError hides the broken img via the DOM (no React state → no re-render that
// would interrupt the scene's entrance animation).
function Avatar({ src, name }: { src: string; name: string }) {
  return (
    <div className="relative flex h-20 w-20 flex-none items-center justify-center overflow-hidden rounded-full border border-charcoal-600 bg-charcoal-800">
      <User size={34} className="text-steel-500" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        onError={(e) => {
          e.currentTarget.style.display = 'none';
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
}

export default function OperatorsScene() {
  return (
    <div className="scene">
      <div className="scene-inner max-w-5xl">
        <motion.p variants={item} className="eyebrow text-ember-500">
          The Operators
        </motion.p>
        <motion.h2 variants={item} className="display mt-2 text-3xl font-bold leading-tight text-steel-50 sm:text-4xl">
          You&apos;re not hiring a vendor. <span className="text-ember-500">You&apos;re hiring owners.</span>
        </motion.h2>

        <div className="mt-7 grid items-stretch gap-5 sm:grid-cols-2">
          {OWNERS.map((o, i) => (
            <motion.div
              key={o.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`panel rounded-2xl p-6 ${o.featured ? 'border border-ember-500/35' : ''}`}
            >
              {o.tag && <p className="kicker mb-3 text-ember-300">{o.tag}</p>}
              <div className="flex items-center gap-4">
                <Avatar src={o.img} name={o.name} />
                <div className="min-w-0">
                  <h3 className="display text-xl font-bold leading-tight text-steel-50">{o.name}</h3>
                  <p className="mt-1 text-[13px] font-medium leading-snug text-ember-300">{o.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-steel-300">{o.bio}</p>
              {o.personal && (
                <p className="mt-3 border-t border-charcoal-600/40 pt-3 text-[13px] leading-snug text-ember-200">{o.personal}</p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="mt-6 rounded-xl border border-ember-500/25 bg-charcoal-800/40 px-5 py-4 text-center">
          <p className="text-sm text-steel-200">
            A <span className="font-semibold text-ember-300">woman-owned</span> family of companies, built by Joleen Martin since 1998.
          </p>
          <p className="kicker mt-2 text-steel-400">Canyon Advisors · Canyon Cleaners · Canyon Apartments · Canyon Markets</p>
        </motion.div>
      </div>
    </div>
  );
}
