"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { revealTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Industry } from "@/content/industries";

/**
 * Tap/click/keyboard-toggle reveal instead of a flip card — flip cards
 * don't work well on touch and were flagged as a generic pattern in
 * docs/creative-direction.md's critique. Same disclosure language as
 * TimelineNode, so the whole site shares one interaction model.
 */
export function IndustryCard({ industry }: { industry: Industry }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded((value) => !value)}
      aria-expanded={expanded}
      className="flex w-full flex-col rounded-xl border border-border bg-card p-5 text-left shadow-card transition-colors duration-150 hover:border-signal/25"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-foreground">{industry.label}</h3>
        <Plus
          className={cn(
            "size-4 shrink-0 text-signal transition-transform duration-300",
            expanded && "rotate-45"
          )}
        />
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={revealTransition}
            className="overflow-hidden"
          >
            <p className="mt-3 text-sm text-muted-foreground">{industry.context}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
}
