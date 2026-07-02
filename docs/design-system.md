# Design System — "Executive Editorial"

Status: **Frozen.** This is the single source of truth for every visual decision in the build. Any new component or section must derive its values from this document — no eyeballed one-offs.

Supersedes the earlier dark "The Signal" network-visualization system (rewritten 2026-07-02): that direction read as futuristic/AI-generated rather than the handcrafted, premium executive feel the site now targets. Light paper background, ink typography, one restrained accent, hairline dividers instead of boxed cards.

## Colors

| Token | Value | Use |
|---|---|---|
| `background` | `#F7F5F0` | Page background — warm paper, not stark white |
| `card` / `popover` | `#FFFFFF` | The few genuinely floating surfaces (command palette, mobile menu) |
| `border` | `rgba(32,30,26,0.12)` | Hairline dividers — the primary content separator, replacing card borders |
| `foreground` | `#201E1A` | Body/headline text — warm charcoal, not pure black |
| `muted-foreground` | `#6C675E` | Captions, metadata, secondary copy |
| `accent` | `#8A6A3F` | The one accent — muted bronze. Active nav state, key numerals, CTA outline, section-index numerals |
| `destructive` | `#A4342C` | Form validation only |

Rule: no filled-accent buttons except one CTA per viewport. The accent stays rare and meaningful — this hasn't changed from the prior system, only the hue has.

## Typography

- **Body/UI:** Geist Sans (variable, self-hosted via `next/font`)
- **Display/editorial:** Newsreader (serif, `next/font/google`) — hero name, section titles (via `font-heading`), pull quotes, big narrative lines. This is the ownable typographic decision that gives the site its editorial, premium-print feel.
- **Numerals/dates/eyebrows:** Geist Mono — used sparingly (dates, section index numbers, metric figures), not as the default numeral treatment everywhere.
- **Scale (1.250 modular ratio, 16px root):** 12 / 14 / 16 / 18 / 20 / 25 / 31 / 39 / 49 / 61 / 76px
- **Weights:** 400 body, 500 UI labels, 600 subheads. Never 700+/800/900 — hierarchy comes from size, serif/sans contrast, and whitespace, not weight.

## Border Radius

| Element | Radius |
|---|---|
| Pills / mono badges | 4px |
| Buttons, inputs | 6px |
| Elevated surfaces (dialogs, dropdowns) | 8–10px |
| Status dots only | 999px (full round) — never buttons or the few remaining panels |

Nothing in the system uses the old 12–20px "AI-template" card radius.

## Shadows

Flat and soft — no colored glow (the prior system's `signal`-tinted glow was part of what read as futuristic).

- Resting elevated surface: `0 1px 2px rgba(28,26,23,0.04), 0 8px 24px rgba(28,26,23,0.06)`
- Hover/active: `0 1px 2px rgba(28,26,23,0.05), 0 12px 32px rgba(28,26,23,0.09)`

Most sections use **no shadow at all** — hairline `border-t`/`border-b`/`divide-y` rules do the separating instead of elevation.

## Animation Timings

| Interaction | Duration/Easing |
|---|---|
| Micro (hover, focus) | 120–160ms ease-out |
| Standard reveal/expand | 400ms `cubic-bezier(0.16, 1, 0.3, 1)` |
| Timeline spine fill | Scroll-linked (not time-based) |
| Entrance stagger | 60–80ms per child, capped ~6 steps |
| `prefers-reduced-motion` | Disables stagger/parallax; only 150ms opacity crossfades remain |

## Grid System

- 12-column, max-width 1200px content, 1440px full-bleed where a section wants to run wider than body copy
- Base unit 4px; gutters 24px (mobile) / 32px (tablet) / 48px (desktop)
- Vertical rhythm between sections: 96px (mobile) / 160px (desktop)

## Icon Style

- Lucide, 1.5px stroke, no fill, for standard UI icons
- LinkedIn is the one hand-authored brand SVG (Lucide dropped brand glyphs)

## Section/Row Style (replaces the old "Card Style")

- Content sections are ruled lists (`divide-y`/`border-t`/`border-b` in `border` color), not boxed cards with backgrounds and shadows
- The only surfaces that still get a card treatment (white fill, soft shadow, small radius) are things that are genuinely floating in front of content: the command palette dialog and the mobile nav dropdown
- Hover states on interactive rows: text/border color shifts to `accent`, no lift/translate, no glow

## Button Style

- **Primary (one per viewport max):** ghost — 1px `accent` border, `accent` text, background fills to `accent` at 10% opacity on hover
- **Secondary:** text-only, underline-on-hover, `foreground` color
- 6px radius, 150ms hover transition, padding scales with `size` prop

## Spacing Scale

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160` (px)

## Component Hierarchy

- **Primitives** (shadcn, restyled): Button, Tooltip. (Accordion/Badge/Card/Dialog/Input/Tabs were scaffolded but never used by any section and were removed in the 2026-07-02 audit — CommandPalette uses `@base-ui/react/dialog` directly instead of a wrapper.)
- **Composed:** TimelineNode, TimelineSpine, TestimonialCard, ProjectCard
- **Layout:** Section, Container, NavRail, SectionHeading, SiteFooter
- **Page-level:** Hero, ExecutiveSummary, CareerTimeline, LeadershipMetrics, IndustryGrid, AreasOfExpertise, ProjectCaseStudies, EducationTimeline, TestimonialDeck, CommandPalette

## Contact

There is no "Contact" button — that's a generic template pattern. The email address is surfaced directly (as text, in `mailto:` links) in two places: the hero's meta row and the site footer, both always one scroll away regardless of where a reader is on the page.

## Navigation

The primary nav is populated at runtime, not hand-maintained — every `<Section navLabel="...">` registers itself via a `data-nav-label` attribute, and `NavRail` discovers them from the DOM in document order (see `components/layout/nav-rail.tsx`). Adding, removing, or reordering a section on the page automatically keeps the nav in sync; there is no separate list to remember to update.

## Theme Mode

Light-only by design — warm paper and ink typography are the point; a dark mode would break the editorial-print metaphor (no light/dark toggle is planned).
