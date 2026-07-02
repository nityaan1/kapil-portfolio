"use client";

import { motion } from "framer-motion";

import { fadeInUp } from "@/lib/motion";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={fadeInUp} className="border-t border-border py-10 first:pt-0">
      <p className="font-mono text-xs text-accent">
        {project.company} · {project.era}
      </p>
      <h3 className="mt-2 font-serif text-2xl text-foreground lg:text-3xl">
        {project.title}
      </h3>
      <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">
        {project.narrative}
      </p>

      {project.metrics && (
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-4">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-mono text-2xl font-medium text-foreground">
                {metric.value}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
