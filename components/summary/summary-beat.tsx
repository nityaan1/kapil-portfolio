"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

interface SummaryBeatProps {
  index: number;
  total: number;
  progress: MotionValue<number>;
  text: string;
}

/**
 * One narrative line in the pinned Executive Summary. Fades/slides in and
 * back out as the section's own scroll progress passes through this beat's
 * slice of the range — the "documentary narrator" effect (docs/PRD.md §3).
 */
export function SummaryBeat({ index, total, progress, text }: SummaryBeatProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const margin = (end - start) * 0.3;

  const opacity = useTransform(
    progress,
    [start, start + margin, end - margin, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [start, start + margin, end - margin, end],
    [24, 0, 0, -24]
  );

  return (
    <motion.p
      style={{ opacity, y }}
      className="absolute inset-x-0 max-w-3xl text-xl font-medium leading-snug text-foreground sm:text-2xl lg:text-4xl"
    >
      {text}
    </motion.p>
  );
}
