"use client";

import { motion } from "framer-motion";

import { projects } from "@/content/projects";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { ProjectCard } from "@/components/projects/project-card";

export function ProjectCaseStudies() {
  const reducedMotion = useReducedMotion();

  return (
    <Section id="projects" navLabel="Projects">
      <Container>
        <SectionHeading
          index="06"
          title="Projects"
          description="Two moments with enough real substantiation to stand as case studies, not a padded list."
        />
        <motion.div
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.1)}
          className="flex flex-col"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
