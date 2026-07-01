"use client";

import { motion } from "framer-motion";

import { industries } from "@/content/industries";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { IndustryCard } from "@/components/industries/industry-card";

export function IndustryGrid() {
  return (
    <Section id="industries">
      <Container>
        <SectionHeading
          index="04"
          title="Industry Experience"
          description="Tap a domain for how it shows up in the work."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer(0.05)}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          {industries.map((industry) => (
            <motion.div key={industry.id} variants={fadeInUp}>
              <IndustryCard industry={industry} />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
