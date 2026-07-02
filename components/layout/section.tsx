import { cn } from "@/lib/utils";

interface SectionProps extends React.ComponentProps<"section"> {
  /** Anchor id used by NavRail for scroll-spy and deep links (e.g. "hero", "timeline"). */
  id: string;
  /**
   * Label shown in the primary nav. Sections without one (e.g. the hero,
   * which is represented by the brand mark instead) are excluded — NavRail
   * discovers every labeled section from the DOM at runtime, so the nav
   * always reflects the page's actual structure (see nav-rail.tsx).
   */
  navLabel?: string;
}

/** Vertical-rhythm wrapper: 96px mobile / 160px desktop between major sections (docs/design-system.md). */
export function Section({ id, navLabel, className, ...props }: SectionProps) {
  return (
    <section
      id={id}
      data-nav-label={navLabel}
      className={cn("scroll-mt-24 py-24 lg:py-40", className)}
      {...props}
    />
  );
}
