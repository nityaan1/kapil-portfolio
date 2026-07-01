"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

import { summaryBeats } from "@/content/summary";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { SummaryBeat } from "@/components/summary/summary-beat";

/**
 * The Executive Summary as a pinned, scroll-driven narration rather than a
 * paragraph dump (PRD §3: "story, not paragraphs"). The section is several
 * viewport-heights tall; a sticky inner stage holds position while each
 * beat crossfades in based on scroll progress through that height — the
 * "documentary narrator" reading. Falls back to a plain stacked reveal
 * under prefers-reduced-motion, since scroll-pinning is itself a motion
 * effect the design system says to disable.
 */
export function ExecutiveSummary() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (reducedMotion) {
    return (
      <section id="summary" className="scroll-mt-24 py-24 lg:py-40">
        <Container>
          <SectionHeading index="01" title="Executive Summary" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.1)}
            className="flex flex-col gap-8"
          >
            {summaryBeats.map((beat) => (
              <motion.p
                key={beat}
                variants={fadeInUp}
                className="max-w-3xl text-2xl font-medium leading-snug text-foreground"
              >
                {beat}
              </motion.p>
            ))}
          </motion.div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="summary"
      ref={containerRef}
      className="relative scroll-mt-24"
      style={{ height: `${summaryBeats.length * 70}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center">
        <Container>
          <SectionHeading index="01" title="Executive Summary" />
          <div className="relative min-h-56 lg:min-h-40">
            {summaryBeats.map((beat, i) => (
              <SummaryBeat
                key={beat}
                index={i}
                total={summaryBeats.length}
                progress={scrollYProgress}
                text={beat}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
