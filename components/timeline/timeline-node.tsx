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
    <div ref={ref} className="relative pb-12 pl-12 last:pb-0 lg:pl-16">
      {/* Node dot on the spine — lights up once scrolled to, and stays lit. */}
      <span
        className={cn(
          "absolute left-4 top-6 size-2.5 -translate-x-1/2 rounded-full border-2 transition-colors duration-500 lg:left-6",
          hasIntersected
            ? "border-signal bg-signal"
            : "border-border bg-background"
        )}
        aria-hidden="true"
      />

      <button
        type="button"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        className="w-full rounded-xl border border-border bg-card p-6 text-left shadow-card transition-colors duration-150 hover:border-signal/25"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-signal">{entry.dates}</p>
            <h3 className="mt-1 text-xl font-semibold text-foreground">
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
              "size-5 shrink-0 text-muted-foreground transition-transform duration-300",
              expanded && "rotate-180"
            )}
          />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={revealTransition}
            className="overflow-hidden"
          >
            <div className="mt-4 flex flex-col gap-6 rounded-xl border border-border bg-card/50 p-6">
              {entry.roles.map((role) => (
                <div key={role.title}>
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
                        className="flex gap-2 text-sm text-secondary-foreground/80"
                      >
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-signal/60" />
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
