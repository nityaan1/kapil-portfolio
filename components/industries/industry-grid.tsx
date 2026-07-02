"use client";

import { motion } from "framer-motion";

import { industries } from "@/content/industries";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * A plain, always-legible list rather than a flip/hover card grid — the
 * card grid was flagged as a generic pattern (docs/creative-direction.md).
 * Typography and a hairline rule do the separating instead.
 */
export function IndustryGrid() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="industries" navLabel="Industries">
      <Container>
        <SectionHeading
          index="04"
          title="Industry Experience"
          description="Where two decades of enterprise selling actually landed."
        />
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.06)}
          className="divide-y divide-border border-y border-border"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.id}
              variants={fadeInUp}
              className="grid grid-cols-1 gap-x-8 gap-y-1 py-5 sm:grid-cols-[220px_1fr]"
            >
              <h3 className="font-medium text-foreground">{industry.label}</h3>
              <p className="text-sm text-muted-foreground">{industry.context}</p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
