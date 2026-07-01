import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  /** Anchor id used by NavRail for scroll-spy and deep links (e.g. "hero", "timeline"). */
  id: string;
}

/** Vertical-rhythm wrapper: 96px mobile / 160px desktop between major sections (docs/design-system.md). */
export function Section({ id, className, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-24 py-24 lg:py-40", className)}
      {...props}
    />
  );
}
