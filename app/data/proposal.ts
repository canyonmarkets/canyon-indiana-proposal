// Structured proposal content. Copy lives here so it's easy to iterate.
// Numbers are real/defensible; site-specific deployments are tagged 'proposed'.

export type Tag = 'live' | 'proposed';

export const STATS: { value: string; label: string }[] = [
  { value: '$0', label: 'To the GC' },
  { value: '263', label: 'SKU catalog' },
  { value: '24/7', label: 'Every shift' },
  { value: '4–5 YR', label: 'On-site owner' },
  { value: '3–4K', label: 'Contract workers' },
  { value: '225', label: 'Admin / leadership' },
];

// "What standard vending can't do" — the problem framing.
export const PROBLEM = [
  'Rotating shifts around the clock — day, swing, overnight.',
  'A campus footprint measured in acres, with zero food infrastructure.',
  '225 admin staff who expect a premium break experience, and 3,000–4,000 contractors who get 30-minute breaks.',
  'Fragmented low-tier vendors mean empty shelves, bottlenecked lines, and a coordination burden that lands on your team.',
];

// Campus zones for the interactive site map. Each is backed by the real
// blueprint floor-plan crop, with pulsing pins (x/y = % of the plan image)
// where the markets land. Popup graphics get wired in next.
export const ZONES: {
  id: string;
  name: string;
  sheet: string;
  deployment: string;
  tag: Tag;
  layout: string;
  dots: { x: string; y: string; label: string; sub: string; short: string; popup: string }[];
}[] = [
  {
    id: 'msft-clayco',
    name: 'Microsoft / Clayco Trailer',
    sheet: 'A0-1',
    deployment: 'Admin pantry market',
    tag: 'proposed',
    layout: '/img/layout-msft-clayco.png',
    dots: [{ x: '30%', y: '52%', label: 'Admin pantry market', sub: 'Beside the trailer café', short: 'Café market', popup: '/img/market-admin.png' }],
  },
  {
    id: 'leadership',
    name: 'Leadership Trailer',
    sheet: 'A0-2',
    deployment: 'Premium leadership pantry',
    tag: 'proposed',
    layout: '/img/layout-leadership.png',
    dots: [{ x: '37%', y: '69%', label: 'Leadership pantry', sub: 'At the designated pantry room', short: 'Pantry', popup: '/img/popout-leadership.jpg' }],
  },
  {
    id: 'amenity-west',
    name: 'Amenity Tent · West',
    sheet: 'A0-4',
    deployment: 'Automated micro-market',
    tag: 'proposed',
    layout: '/img/layout-amenity-west.png',
    dots: [{ x: '14%', y: '80%', label: 'West micro-market', sub: 'Recreation thoroughfare', short: 'Market', popup: '/img/market-crew.png' }],
  },
  {
    id: 'amenity-east',
    name: 'Amenity Tent · East',
    sheet: 'A0-4',
    deployment: 'Micro-market + AI gym cooler',
    tag: 'proposed',
    layout: '/img/layout-amenity-east.png',
    dots: [
      { x: '57%', y: '62%', label: 'Dining micro-market', sub: 'Assembly / dining area', short: 'Dining', popup: '/img/market-crew.png' },
      { x: '31%', y: '71%', label: 'AI gym cooler', sub: 'Inside the fitness center', short: 'Gym cooler', popup: '/img/cooler-ref.jpg' },
    ],
  },
];

// The verifiable, shipped tech — this is what wins it on merit.
export const TECH: { title: string; body: string; tag: Tag }[] = [
  {
    title: 'Custom kiosk POS',
    body: 'A bespoke self-checkout app we built in-house — running live today on job sites across Arizona. Not an off-the-shelf vending front-end.',
    tag: 'live',
  },
  {
    title: 'Par-level back office',
    body: 'A 27-screen operations dashboard: per-machine par vs on-hand, one-click restock-to-par, velocity and dead-SKU analysis, P&L, auto pick-lists.',
    tag: 'live',
  },
  {
    title: 'Clayco pantry app',
    body: 'A pantry app we already built for Clayco — itemized, timestamped consumption logging, offline-resilient. Running at a Clayco site right now.',
    tag: 'live',
  },
  {
    title: 'Sales → inventory bridge',
    body: 'Every kiosk sale flows straight into the dashboard and decrements on-hand automatically. One integrated system, not bolted-together parts.',
    tag: 'live',
  },
  {
    title: 'Live kiosk telemetry',
    body: 'Every kiosk heartbeats every 5 minutes — online/offline status and app version on a dedicated monitoring page.',
    tag: 'live',
  },
  {
    title: 'AI operations insights',
    body: 'Claude analyzes velocity, par, and sales to surface restock and dead-SKU recommendations — wired to live operational data.',
    tag: 'live',
  },
];

// Supply chain — committed DSD distributor model for Indiana (placeholder until
// Jeff's finalized menu map lands; category counts are from the real catalog).
export const SUPPLY_NOTE =
  'For a build this scale we re-engineer the assortment onto major Direct-Store-Delivery channels — their fleets handle the heavy freight onto site, so our team stays focused on keeping markets immaculate and tech running.';

export const SUPPLY_CATEGORIES: { name: string; count: number }[] = [
  { name: 'Snacks', count: 61 },
  { name: 'Energy Drink', count: 59 },
  { name: 'Food', count: 41 },
  { name: 'Other Drink', count: 36 },
  { name: 'Candy', count: 30 },
  { name: 'Chips', count: 14 },
  { name: 'Drink', count: 13 },
  { name: 'Ice Cream', count: 8 },
];

export const DISTRIBUTORS = ['Coca-Cola', 'Pepsi', 'Keurig Dr Pepper', 'Frito-Lay', 'Broadline'];
