import type { Variants } from 'framer-motion';

// Calm, cinematic scene transition — gentle rise + fade, no zoom (keeps it uncluttered).
export const sceneVariants: Variants = {
  enter: (dir: number) => ({ opacity: 0, y: dir >= 0 ? 36 : -36 }),
  center: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.07,
      delayChildren: 0.12,
    },
  },
  exit: (dir: number) => ({
    opacity: 0,
    y: dir >= 0 ? -28 : 28,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  }),
};

// Per-child reveal — inherits enter/center/exit from the scene parent.
export const item: Variants = {
  enter: { opacity: 0, y: 18 },
  center: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

// Headline lines — settle in cleanly, line by line.
export const word: Variants = {
  enter: { opacity: 0, y: 24 },
  center: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};
