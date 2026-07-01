"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";

import { fadeInUp } from "@/lib/motion";
import type { AwardEntry } from "@/content/awards";

/**
 * The one deliberate break from the cold signal palette — `warmth` is
 * reserved almost exclusively for this section (docs/design-system.md).
 * Deliberately not a literal trophy graphic: a small line icon and a
 * restrained plaque layout instead of the "Little League banquet" look
 * flagged in docs/creative-direction.md.
 */
export function AwardCard({ award }: { award: AwardEntry }) {
  const Icon = award.type === "Award" ? Award : GraduationCap;

  return (
    <motion.div
      variants={fadeInUp}
      className="flex gap-5 rounded-xl border border-warmth/25 bg-card p-6 shadow-card transition-colors duration-150 hover:border-warmth/50"
    >
      <div className="flex size-11 shrink-0 items-center justify-center rounded-sm border border-warmth/30 bg-warmth/10 text-warmth">
        <Icon className="size-5" />
      </div>
      <div>
        <p className="font-mono text-xs text-warmth">{award.type} · {award.era}</p>
        <h3 className="mt-1 font-semibold text-foreground">{award.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{award.issuer}</p>
        <p className="mt-2 text-sm text-secondary-foreground/80">{award.context}</p>
      </div>
    </motion.div>
  );
}
