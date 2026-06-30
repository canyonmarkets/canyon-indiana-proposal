'use client';

import { useEffect, useState } from 'react';

// Counts from 0 → target when mounted (i.e. when its scene becomes active).
// Honors reduced-motion by snapping straight to the target.
export function useCountUp(target: number, durationMs = 1400, delayMs = 250) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setValue(target);
      return;
    }
    let raf = 0;
    let start = 0;
    let delayTimer = 0;

    const tick = (now: number) => {
      if (!start) start = now;
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };

    delayTimer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(delayTimer);
    };
  }, [target, durationMs, delayMs]);

  return value;
}
