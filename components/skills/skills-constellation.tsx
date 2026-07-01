"use client";

import { motion } from "framer-motion";

import { capabilities, endorsedSkills } from "@/content/skills";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { SkillGauge } from "@/components/skills/skill-gauge";

export function SkillsConstellation() {
  return (
    <Section id="skills">
      <Container>
        <SectionHeading
          index="05"
          title="Skills"
          description="Two skills carry real LinkedIn endorsement counts; the rest are self-described strengths from his current and recent roles."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {endorsedSkills.map((skill) => (
            <motion.div key={skill.id} variants={fadeInUp}>
              <SkillGauge skill={skill} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.04)}
          className="mt-6 flex flex-wrap gap-2"
        >
          {capabilities.map((capability) => (
            <motion.span
              key={capability}
              variants={fadeInUp}
              className="rounded-sm border border-border bg-card px-3 py-1.5 font-mono text-xs text-muted-foreground transition-colors duration-150 hover:border-signal/40 hover:text-foreground"
            >
              {capability}
            </motion.span>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
