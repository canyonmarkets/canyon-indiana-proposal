import type { Tag } from '@/app/data/proposal';

export type PillarSpec = {
  id: string;
  num: string;
  name: string;
  eyebrow: string;
  headline: string;
  emphasis?: string; // portion of the headline rendered in ember
  subhead: string;
  points: { title: string; body: string }[];
  burden_removed: string;
  proof: string;
  tag: Tag;
  roadmap?: { cards: { icon: 'calendar' | 'promo'; name: string; body: string }[] };
};

export const OVERVIEW = {
  eyebrow: 'The Opportunity',
  headline: 'Four programs. One operator. Zero on you.',
  subhead:
    'Canyon runs the entire on-site food and amenity layer across your campus — from the sponsored admin pantry to the food-truck lane — so your team never stocks, staffs, or chases any of it.',
  pillars: [
    { id: 'pantry', name: 'Admin Pantry Service', oneLiner: 'A sponsored pantry across all admin trailers where your 200+ leadership and admin staff grab and go at no charge — every item logged to the room it left.' },
    { id: 'amenities', name: 'Amenities Tent Markets + Gym', oneLiner: 'Two automated micro-markets anchor opposite ends of your 36,000 sq ft amenity tent, with one AI cooler running the gym’s premium fuel on its own.' },
    { id: 'field', name: 'Field Break-Tent Markets', oneLiner: 'High-capacity 250+ SKU micro-markets put hot fuel and cold drinks in 2,000+ crews’ hands inside a 30-minute break — no truck line, no walk off-site.' },
    { id: 'foodtrucks', name: 'Food Truck Management', oneLiner: 'Canyon sources, schedules, contracts, and vets every truck in the lane your blueprint already drew — at no additional cost and zero hours on your calendar.' },
  ],
};

export const PILLAR_SPECS: PillarSpec[] = [
  {
    id: 'pantry',
    num: '01',
    name: 'Admin Pantry Service',
    eyebrow: 'Pillar 01 · Sponsored Pantry',
    headline: 'Your Clayco & Microsoft staff grab and go. You see every item.',
    subhead:
      'A sponsored pantry across all admin trailers where your 200+ leadership and admin staff take what they want at no charge, every item logged the instant it leaves the shelf.',
    tag: 'live',
    points: [
      { title: 'Nothing to pay, nothing to badge', body: 'Walk up, take coffee, snacks, drinks, and go. No card, no PIN, no kiosk line. Every admin trailer stays stocked — the cafe, the leadership pantry, the CX and safety rooms, and beyond.' },
      { title: 'A custom app, built for Clayco', body: 'We built a kiosk app just for Clayco’s pantry service. It captures every pull the moment it happens, timestamped and tagged to the trailer it came from, and a live par system keeps shelves full and flags reorders before you run dry.' },
      { title: 'One clean invoice a month', body: 'Every location rolls up into a single transparent statement to the corporate account. You see exactly what was consumed, where, and when, line by line.' },
    ],
    burden_removed:
      'Right now, someone on your team is the snack runner — the warehouse-club trips, the expense receipts, the who-took-what arguments, the half-empty break rooms by 2pm. At this scale, with admin trailers strung across the whole campus, doing that by hand would be a full-time nightmare. Canyon makes it vanish: we stock every admin trailer, log every item to the room it left, and hand you one clean monthly invoice — nobody on your side lifts a finger.',
    proof: 'Canyon custom-built this exact app — Clayco-branded — for the Indiana site. Execs can tap through it right inside this proposal.',
  },
  {
    id: 'amenities',
    num: '02',
    name: 'Amenities Tent Markets + Gym',
    eyebrow: 'Pillar 02 · The Amenity Tent',
    headline: 'The amenity tent, fueled end to end.',
    emphasis: 'fueled end to end',
    subhead:
      'Inside your 36,000 sq ft amenity tent, two automated micro-markets anchor each end of the cross-traffic, and a single AI cooler runs the gym’s high-value fuel on its own.',
    tag: 'proposed',
    points: [
      { title: 'Both ends, no bottleneck', body: 'A paid micro-market at each end of the tent splits the rush across two thoroughfares. Crews tap and go in about three seconds, cashless, no line, no cashier, no break burned waiting.' },
      { title: 'Gym fuel, run by AI', body: 'One AI-managed smart cooler in the fitness center carries the higher-value supplemental line, protein, recovery, premium hydration, clean energy, with shrink protection built into the items most likely to walk.' },
      { title: 'Self-checkout we already run', body: 'These kiosks aren’t a concept. Canyon’s custom self-checkout software is live today on job sites across Arizona. We drop a proven system into your amenity tent, not a prototype.' },
    ],
    burden_removed:
      'Thousands of crews hit the same amenity tent in the same 30-minute window. Two markets at opposite ends absorb that surge so nobody loses half their break in a line, and the gym’s premium stock manages and protects itself instead of bleeding out as shrink. None of it lands on your team to staff, stock, or watch.',
    proof: 'Canyon’s custom self-checkout app runs live today on job sites across Arizona. The gym AI smart cooler is the proposed deployment for this amenity tent.',
  },
  {
    id: 'field',
    num: '03',
    name: 'Field Break-Tent Markets',
    eyebrow: 'Pillar 03 · Volume Tier',
    headline: 'Feed 2,000+ crews in a 30-minute break.',
    emphasis: '2,000+ crews',
    subhead:
      'High-capacity micro-markets in the break tents put hot fuel and cold drinks in your crews’ hands fast, with no food-truck line and no walk off-site.',
    tag: 'proposed',
    points: [
      { title: 'Built for the rush', body: 'Open-shelf micro-markets with self-checkout kiosks move hundreds of people through a tight break window, no register line, no one waiting on a truck.' },
      { title: 'Hot fuel, not just snacks', body: 'Hot Pockets, Jimmy Dean, Tina’s burritos, White Castle, microwaveable staples that hit your on-site microwaves and air fryers for a hot meal in 90 seconds.' },
      { title: 'Stays stocked all shift', body: '250+ SKUs per market on par-level restocking, so the cold drinks and hot food are still there when the late crews break, not picked clean by noon.' },
    ],
    burden_removed:
      'When the horn blows, 2,000+ workers hit the break tent at once and you have 30 minutes to get them fed and back on task. A food-truck line can’t move that many people, and standard vending caps out around 300 items and runs dry by mid-shift. We put a 250+ SKU micro-market right in the tent — grab, scan, microwave, gone.',
    proof: 'Backed by Canyon’s live kiosk POS, 263-SKU catalog, and par-level restocking already running in the field today.',
  },
  {
    id: 'foodtrucks',
    num: '04',
    name: 'Food Truck Management',
    eyebrow: 'Pillar 04 · Food Trucks',
    headline: 'The food truck lane, fully run.',
    emphasis: 'fully run',
    subhead:
      'Your blueprint already draws the lane and the covered area, so Canyon sources, schedules, and runs the trucks while your team never touches it.',
    tag: 'proposed',
    points: [
      { title: 'Sourced and scheduled', body: 'We round up the local trucks and build a weekly rotating lineup, so the menu stays varied and crews look forward to lunch.' },
      { title: 'Contracts and compliance, handled', body: 'Every contract, every certificate of insurance, every site requirement, vetted and tracked by us against your standards before a truck rolls in.' },
      { title: 'No cost, no coordination', body: 'A vibrant daily rotation in the lane the plan already drew, at no additional cost to you and zero hours on your team’s calendar.' },
    ],
    burden_removed:
      'The endless phone tag with food trucks — chasing vendors, checking insurance certificates, juggling who shows up which day, fielding the no-shows — disappears off your team’s plate entirely. You get a full, rotating lunch lineup in the covered area without making a single call.',
    proof: 'Canyon’s committed food-truck program for this contract: a rotating roster of local trucks running the Food Truck Lane and Covered Outdoor Food Truck Area (sheet A0-0), with all sourcing, scheduling, contracting, and insurance vetting owned by Canyon’s on-site team.',
    roadmap: {
      cards: [
        {
          icon: 'calendar',
          name: 'Crew schedule app',
          body: 'Workers pull up the week’s truck lineup and download the calendar — everyone knows who’s rolling in each day.',
        },
        {
          icon: 'promo',
          name: 'Vendor promo app',
          body: 'Trucks post the day’s specials and promos — and can collect opt-in numbers for their own text blasts.',
        },
      ],
    },
  },
];
