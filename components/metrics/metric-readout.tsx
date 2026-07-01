"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { useIntersectionOnce } from "@/hooks/use-intersection-once";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import type { Metric } from "@/content/metrics";

export function MetricReadout({
  metric,
  hero = false,
}: {
  metric: Metric;
  hero?: boolean;
}) {
  const { ref, hasIntersected } = useIntersectionOnce<HTMLDivElement>({
    threshold: 0.4,
  });
  const reducedMotion = useReducedMotion();
  const value = useCountUp(metric.value, hasIntersected, { reducedMotion });

  return (
    <div
      ref={ref}
      className={cn(
        "h-full rounded-xl border border-border bg-card p-6 shadow-card transition-colors duration-150 hover:border-signal/25",
        hero && "flex flex-col justify-center p-10 lg:min-h-64"
      )}
    >
      <p
        className={cn(
          "font-mono font-semibold tabular-nums text-foreground",
          hero ? "text-6xl lg:text-7xl" : "text-4xl"
        )}
      >
        {metric.prefix}
        {value}
        {metric.suffix}
      </p>
      <p className={cn("mt-2 text-muted-foreground", hero ? "text-base" : "text-sm")}>
        {metric.label}
      </p>
    </div>
  );
}
