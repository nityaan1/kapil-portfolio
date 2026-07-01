"use client";

import { motion } from "framer-motion";

import { projects } from "@/content/projects";
import { staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/projects/project-card";

export function ProjectCaseStudies() {
  return (
    <Section id="projects">
      <Container>
        <SectionHeading
          index="06"
          title="Projects"
          description="Two moments with enough real substantiation to stand as case studies, not a padded list."
        />
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.1)}
          className="flex flex-col gap-6"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
