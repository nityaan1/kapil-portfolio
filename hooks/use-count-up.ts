"use client";

import { useEffect, useState } from "react";
import { animate } from "framer-motion";

/**
 * Animates 0 -> target once `start` flips true, then holds (design system:
 * counters animate once on scroll-into-view, never re-trigger). Under
 * reduced motion, jumps straight to the final value instead of counting.
 */
export function useCountUp(
  target: number,
  start: boolean,
  options: { reducedMotion?: boolean; duration?: number } = {}
) {
  const { reducedMotion = false, duration = 1.1 } = options;
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    // Reduced motion: duration 0 still routes through animate()'s onUpdate
    // callback rather than calling setState directly in the effect body.
    const controls = animate(0, target, {
      duration: reducedMotion ? 0 : duration,
      ease: "easeOut",
      onUpdate: setValue,
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start, target, reducedMotion]);

  return Math.round(value);
}
