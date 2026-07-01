"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { useIntersectionOnce } from "@/hooks/use-intersection-once";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { ENDORSEMENT_SCALE_MAX, type EndorsedSkill } from "@/content/skills";

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * A radial "signal strength" meter instead of a progress bar (design
 * system: "no boring progress bars") — the ring fill and the center
 * number both animate from the same count-up value, once, on scroll-into-view.
 */
export function SkillGauge({ skill }: { skill: EndorsedSkill }) {
  const { ref, hasIntersected } = useIntersectionOnce<HTMLDivElement>({
    threshold: 0.4,
  });
  const reducedMotion = useReducedMotion();
  const value = useCountUp(skill.endorsements, hasIntersected, { reducedMotion });
  const ratio = Math.min(1, value / ENDORSEMENT_SCALE_MAX);
  const offset = CIRCUMFERENCE * (1 - ratio);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-8 shadow-card transition-colors duration-150 hover:border-signal/25"
    >
      <div className="relative size-32">
        <svg viewBox="0 0 100 100" className="size-32 -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="var(--border)"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="var(--signal)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-3xl font-semibold tabular-nums text-foreground">
          {value}
        </div>
      </div>
      <div className="text-center">
        <p className="font-medium text-foreground">{skill.label}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          {skill.endorsements} LinkedIn endorsements
        </p>
      </div>
    </div>
  );
}
