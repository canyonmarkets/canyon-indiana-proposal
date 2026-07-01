// Single source of truth for proposal identity + chrome.
// Identity is a fresh, proposal-specific mark that echoes the Canyon palette/type
// (Jeff's call) — change the wordmark/lockup here to re-brand in one place.

export const PROPOSAL = {
  company: 'Canyon Markets',
  wordmark: 'CANYON',
  lockup: 'Integrated Site Solutions',
  project: 'Microsoft EKI · Elkhart / South Bend, IN',
  thesis:
    'On-site sustenance for the Elkhart build — engineered in-house, zero-cost to the GC, with Canyon owners on the ground every day.',
} as const;

export const CONTACT = {
  phone: '(602) 935-6830',
  phoneHref: '+16029356830',
  email: 'info@canyon-markets.com',
} as const;

// Persistent "mission control" status line — every item is a real, verifiable fact.
export const TELEMETRY = [
  { label: 'CUSTOM KIOSK LIVE', live: true },
  { label: 'STRIPE TERMINAL ACTIVE', live: true },
  { label: 'SYNC OK', live: true },
] as const;

export const NAV = [
  { id: 'summary', label: 'Executive Summary' },
  { id: 'leadership', label: 'Boots on the Ground' },
  { id: 'footprint', label: 'Site Footprint' },
  { id: 'tech', label: 'The Live Stack' },
  { id: 'supply', label: 'Supply Chain' },
  { id: 'engage', label: 'Engage' },
] as const;
