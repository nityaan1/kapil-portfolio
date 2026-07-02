"use client";

import type { RefObject } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TimelineSpineProps {
  containerRef: RefObject<HTMLElement | null>;
}

/**
 * A quiet scroll-linked progress rule down the career timeline — a faint
 * base line is always visible; the accent overlay fills in as the reader
 * scrolls through the section. No glow — a hairline, not a signal.
 */
export function TimelineSpine({ containerRef }: TimelineSpineProps) {
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      className="absolute left-0 top-0 bottom-0 w-px bg-border"
      aria-hidden="true"
    >
      {/* Reduced motion: skip the scroll-driven fill and show the spine fully lit statically. */}
      <motion.div
        className="absolute inset-x-0 top-0 h-full origin-top bg-accent"
        style={reducedMotion ? undefined : { scaleY }}
      />
    </div>
  );
}
