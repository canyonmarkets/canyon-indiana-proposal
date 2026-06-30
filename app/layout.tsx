import type { Metadata } from 'next';
import { Inter, Space_Mono } from 'next/font/google';
import './globals.css';
import { PROPOSAL } from '@/app/lib/site';

const inter = Inter({ variable: '--font-inter', subsets: ['latin'], display: 'swap' });
const spaceMono = Space_Mono({ variable: '--font-space-mono', weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: `${PROPOSAL.company} · ${PROPOSAL.lockup} — Microsoft EKI`,
  description:
    'A turnkey, zero-cost on-site sustenance operation for the Microsoft EKI hyperscale data-center build in Elkhart / South Bend, Indiana.',
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
