"use client";

import { motion } from "framer-motion";

import { awards } from "@/content/awards";
import { staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { AwardCard } from "@/components/awards/award-card";

export function AwardsWall() {
  return (
    <Section id="awards">
      <Container>
        <SectionHeading
          index="07"
          title="Awards & Certifications"
          description="Two credentials, both real — no padding for the sake of a fuller grid."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer(0.1)}
          className="grid grid-cols-1 gap-4 lg:grid-cols-2"
        >
          {awards.map((award) => (
            <AwardCard key={award.id} award={award} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
