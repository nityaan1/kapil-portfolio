"use client";

import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface SignalSpineProps {
  containerRef: RefObject<HTMLElement | null>;
}

/**
 * The scroll-linked vertical trace running through the career timeline —
 * "The Signal" concept's traveling-pulse motif applied to scroll position
 * instead of time (docs/design-system.md: "Signal-line traversal:
 * scroll-linked, not time-based"). A faint base line is always visible;
 * the bright overlay fills in as the reader scrolls through the section.
 */
export function SignalSpine({ containerRef }: SignalSpineProps) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      className="absolute left-4 top-0 bottom-0 w-px bg-border lg:left-6"
      aria-hidden="true"
    >
      {/* Reduced motion: skip the scroll-driven fill and show the spine fully lit statically. */}
      <motion.div
        className="absolute inset-x-0 top-0 h-full origin-top bg-signal"
        style={reducedMotion ? undefined : { scaleY }}
      />
    </div>
  );
}
