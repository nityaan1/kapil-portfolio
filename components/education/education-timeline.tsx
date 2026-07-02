"use client";

import { motion } from "framer-motion";

import { education } from "@/content/education";
import { awards } from "@/content/awards";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";

/**
 * Education and Awards merged into one section — with a single confirmed
 * award, a dedicated Awards grid read as padding for the sake of a fuller
 * page (docs/creative-direction.md's critique of the "trophy showcase"
 * pattern applies doubly to a near-empty one).
 */
export function EducationTimeline() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="education" navLabel="Education">
      <Container>
        <SectionHeading index="07" title="Education & Recognition" />
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 gap-x-16 gap-y-10 lg:grid-cols-2"
        >
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Education
            </h3>
            <div className="mt-4 flex flex-col gap-6">
              {education.map((entry) => (
                <motion.div key={entry.id} variants={fadeInUp}>
                  <h4 className="font-serif text-xl text-foreground">{entry.degree}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {entry.institution}
                    {entry.dates && (
                      <span className="font-mono text-accent"> · {entry.dates}</span>
                    )}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Recognition
            </h3>
            <div className="mt-4 flex flex-col gap-6">
              {awards.map((award) => (
                <motion.div key={award.id} variants={fadeInUp}>
                  <p className="font-mono text-xs text-accent">
                    {award.type} · {award.era}
                  </p>
                  <h4 className="mt-1.5 font-serif text-xl text-foreground">{award.title}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{award.issuer}</p>
                  <p className="mt-2 text-sm text-foreground/75">{award.context}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
