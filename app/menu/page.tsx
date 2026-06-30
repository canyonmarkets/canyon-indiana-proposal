import type { Metadata } from 'next';
import MenuApp from './MenuApp';

export const metadata: Metadata = {
  title: 'Canyon Markets · Pantry Favorites',
  description: 'Pick your favorite snacks and drinks — we stock the pantry to the crew.',
  robots: { index: false, follow: false },
};

export default function MenuPage() {
  return <MenuApp />;
}
