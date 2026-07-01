"use client";

import { motion } from "framer-motion";

import { fadeInUp } from "@/lib/motion";
import type { Project } from "@/content/projects";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="rounded-xl border border-border bg-card p-8 shadow-card transition-colors duration-150 hover:border-signal/25"
    >
      <p className="font-mono text-xs text-signal">
        {project.company} · {project.era}
      </p>
      <h3 className="mt-2 text-2xl font-semibold text-foreground">
        {project.title}
      </h3>
      <p className="mt-4 max-w-2xl text-secondary-foreground/80">
        {project.narrative}
      </p>

      {project.metrics && (
        <div className="mt-6 flex flex-wrap gap-6 border-t border-border pt-6">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <p className="font-mono text-2xl font-semibold text-foreground">
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
