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
    bio: "Joleen is a serial entrepreneur with an MBA from Grand Canyon University. She founded the family's parent company, Canyon Advisors, in 1998, and has since bought, renovated, rented, and sold more than 300 homes across Texas, Arizona, and Tennessee. In 2017 she created Canyon Cleaners to help run a thriving Phoenix Airbnb business — which has since grown into Canyon Apartments, more than 35 fully-furnished corporate-housing units rented across the Phoenix area. She started Canyon Markets to serve her apartment-management partners, and it has grown into a premier operator for construction, distribution, and warehouse facilities. Her three daughters all grew up in the family businesses and now either work alongside her or run companies of their own.",
    personal: 'But of all the hats she wears, her favorite by far is grandmother of four.',
  },
  {
    name: 'Jeff Martin',
    role: 'Co-Owner · Canyon Markets',
    img: '/img/jeff.png',
    bio: "Jeff is the technology half of Canyon Markets — he designs, builds, and runs the software behind this proposal: the self-checkout kiosks, the par-level dashboard, and the live AI insights, all in-house. A 32-year educator at the high-school and university level, he holds a PhD in administration. And with the help of one of his six brothers, he recently managed the construction of the family's new home in Queen Creek, Arizona.",
    personal: 'He also nurses a severe guitar addiction that fills the few unoccupied minutes of his day.',
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
        <motion.h2 variants={item} className="display mt-2 text-2xl font-bold leading-tight text-steel-50 sm:text-3xl">
          You&apos;re not hiring a vendor. <span className="text-ember-500">You&apos;re hiring owners.</span>
        </motion.h2>

        <div className="mt-5 grid items-stretch gap-4 sm:grid-cols-2">
          {OWNERS.map((o, i) => (
            <motion.div
              key={o.name}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className={`panel rounded-2xl p-5 ${o.featured ? 'border border-ember-500/35' : ''}`}
            >
              {o.tag && <p className="kicker mb-3 text-ember-300">{o.tag}</p>}
              <div className="flex items-center gap-4">
                <Avatar src={o.img} name={o.name} />
                <div className="min-w-0">
                  <h3 className="display text-xl font-bold leading-tight text-steel-50">{o.name}</h3>
                  <p className="mt-1 text-[13px] font-medium leading-snug text-ember-300">{o.role}</p>
                </div>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-steel-300">{o.bio}</p>
              {o.personal && (
                <p className="mt-2.5 border-t border-charcoal-600/40 pt-2.5 text-[13px] leading-snug text-ember-200">{o.personal}</p>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div variants={item} className="mt-4 rounded-xl border border-ember-500/25 bg-charcoal-800/40 px-5 py-3.5 text-center">
          <p className="text-sm text-steel-200">
            A <span className="font-semibold text-ember-300">woman-owned</span> family of companies, built by Joleen Martin since 1998.
          </p>
          <p className="kicker mt-2 text-steel-400">
            <a href="https://canyon-advisors.com" target="_blank" rel="noopener noreferrer" className="ulink transition-colors hover:text-ember-300">Canyon Advisors</a>
            {' · '}
            <a href="https://canyon-cleaners.netlify.app" target="_blank" rel="noopener noreferrer" className="ulink transition-colors hover:text-ember-300">Canyon Cleaners</a>
            {' · '}
            <a href="https://canyon-apts.com" target="_blank" rel="noopener noreferrer" className="ulink transition-colors hover:text-ember-300">Canyon Apartments</a>
            {' · '}
            <a href="https://canyon-markets.com" target="_blank" rel="noopener noreferrer" className="ulink transition-colors hover:text-ember-300">Canyon Markets</a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
