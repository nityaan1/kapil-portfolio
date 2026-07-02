"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { useIntersectionOnce } from "@/hooks/use-intersection-once";
import { revealTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { TimelineEntry } from "@/content/timeline";

export function TimelineNode({ entry }: { entry: TimelineEntry }) {
  const [expanded, setExpanded] = useState(Boolean(entry.defaultExpanded));
  const { ref, hasIntersected } = useIntersectionOnce<HTMLDivElement>({
    threshold: 0.3,
  });

  return (
    <div ref={ref} className="relative border-b border-border pl-8 last:border-b-0 lg:pl-12">
      {/* Node dot on the spine — lights up once scrolled to, and stays lit. */}
      <span
        className={cn(
          "absolute left-0 top-8 size-2 -translate-x-1/2 rounded-full border-2 transition-colors duration-500",
          hasIntersected ? "border-accent bg-accent" : "border-border bg-background"
        )}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls={`timeline-panel-${entry.id}`}
        className="w-full py-6 text-left"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-accent">{entry.dates}</p>
            <h3 className="mt-1.5 font-serif text-2xl text-foreground">
              {entry.company}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {entry.roles.length > 1
                ? `${entry.roles.length} roles`
                : entry.roles[0].title}
            </p>
          </div>
          <ChevronDown
            className={cn(
              "mt-1 size-4 shrink-0 text-muted-foreground transition-transform duration-300",
              expanded && "rotate-180"
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={`timeline-panel-${entry.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={revealTransition}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-6 pb-8">
              {entry.roles.map((role) => (
                <div key={role.title} className="border-t border-border pt-5 first:border-t-0 first:pt-0">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-medium text-foreground">{role.title}</h4>
                    {role.dates && (
                      <p className="font-mono text-xs text-muted-foreground">
                        {role.dates}
                      </p>
                    )}
                  </div>
                  <ul className="mt-3 flex flex-col gap-2">
                    {role.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm leading-relaxed text-foreground/75"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-accent/60" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
