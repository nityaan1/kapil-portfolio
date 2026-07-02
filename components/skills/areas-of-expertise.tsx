"use client";

import { motion } from "framer-motion";

import { expertiseCategories } from "@/content/skills";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Four categories straight from the CV's "Areas of Expertise" — plain
 * typography instead of endorsement-count gauges, which the current CV
 * doesn't corroborate.
 */
export function AreasOfExpertise() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="expertise" navLabel="Expertise">
      <Container>
        <SectionHeading index="05" title="Areas of Expertise" />
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.08)}
          className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {expertiseCategories.map((category) => (
            <motion.div key={category.id} variants={fadeInUp}>
              <h3 className="border-b border-border pb-3 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                {category.label}
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {category.items.map((item) => (
                  <li key={item} className="text-sm leading-snug text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
