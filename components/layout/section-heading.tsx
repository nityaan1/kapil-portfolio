"use client";

import { motion } from "framer-motion";

import { fadeInUp } from "@/lib/motion";

interface SectionHeadingProps {
  /** Chapter number, e.g. "01" — reinforces the documentary/chapter framing. */
  index: string;
  title: string;
  description?: string;
}

export function SectionHeading({ index, title, description }: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      variants={fadeInUp}
      className="mb-16 flex items-baseline gap-4 lg:mb-24"
    >
      <span className="font-mono text-sm text-signal">{index}</span>
      <div>
        <h2 className="text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-2 max-w-xl text-muted-foreground">{description}</p>
        )}
      </div>
    </motion.div>
  );
}
