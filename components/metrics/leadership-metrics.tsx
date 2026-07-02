"use client";

import { motion } from "framer-motion";

import { leadershipPillars } from "@/content/metrics";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Leadership Metrics as an editorial showcase of impact, not animated
 * counters — six pillars, numbered like chapters, separated by hairline
 * rules instead of boxed cards (docs/design-system.md).
 */
export function LeadershipMetrics() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="metrics" navLabel="Leadership">
      <Container>
        <SectionHeading
          index="03"
          title="Leadership Metrics"
          description="Six pillars of impact — sourced, not rounded up for effect."
        />
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.08)}
          className="divide-y divide-border border-y border-border"
        >
          {leadershipPillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              variants={fadeInUp}
              className="py-8 lg:grid lg:grid-cols-[96px_1fr_2fr] lg:items-baseline lg:gap-8 lg:py-10"
            >
              <span className="font-mono text-xs text-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-xl text-foreground lg:mt-0 lg:text-2xl">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground lg:mt-0">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
