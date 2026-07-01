"use client";

import { motion } from "framer-motion";

import { education } from "@/content/education";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * A static, simpler cousin of the Career Timeline's spine — only two
 * entries, so the full scroll-linked signal traversal is deliberately not
 * reused here. That effect stays a signature moment for the career
 * chapters rather than becoming an ambient pattern applied everywhere.
 */
export function EducationTimeline() {
  return (
    <Section id="education">
      <Container>
        <SectionHeading index="08" title="Education" />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={staggerContainer(0.1)}
          className="relative max-w-xl"
        >
          <div
            className="absolute left-4 top-2 bottom-2 w-px bg-border"
            aria-hidden="true"
          />
          <div className="flex flex-col gap-8">
            {education.map((entry) => (
              <motion.div
                key={entry.id}
                variants={fadeInUp}
                className="relative pl-10"
              >
                <span
                  className="absolute left-4 top-1.5 size-3 -translate-x-1/2 rounded-full border-2 border-signal bg-background"
                  aria-hidden="true"
                />
                <h3 className="font-semibold text-foreground">{entry.degree}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {entry.institution}
                  {entry.dates && (
                    <span className="font-mono text-signal"> · {entry.dates}</span>
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
