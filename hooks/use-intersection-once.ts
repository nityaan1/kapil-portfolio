"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True once the ref's element has entered the viewport; never resets.
 * Backs scroll-triggered reveals and (in later milestones) counters,
 * which the design system specifies should animate once, not on every
 * scroll-back (docs/design-system.md animation table).
 */
export function useIntersectionOnce<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.2 }
) {
  const ref = useRef<T | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || hasIntersected) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasIntersected(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasIntersected]);

  return { ref, hasIntersected };
}
