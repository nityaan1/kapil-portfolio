# Design System — "The Signal"

Status: **Frozen.** This is the single source of truth for every visual decision in the build. Any new component or section must derive its values from this document — no eyeballed one-offs.

## Colors

| Token | Value | Use |
|---|---|---|
| `bg-base` | `#08090B` | Page background |
| `bg-surface` | `#101216` | Card/panel surfaces |
| `bg-surface-raised` | `#15171C` | Nested/hovered surfaces |
| `border-hairline` | `rgba(255,255,255,0.08)` | All card/divider borders |
| `text-primary` | `#F2F3F0` | Body/headline text |
| `text-secondary` | `#9A9FA6` | Captions, metadata, timestamps |
| `signal` | `#4FE0C5` | The one accent: active states, traveling signal line, key numerals, primary CTA |
| `warmth` | `#E8A94C` | Reserved almost exclusively for Awards/Certifications |
| `error` | `#E5484D` | Contact form validation only |

Rule: no filled-accent buttons except one CTA per viewport. The accent stays rare and meaningful.

## Typography

- **Body/UI:** Geist Sans (variable, self-hosted via the `geist` package / `next/font`)
- **Numerals/data:** Geist Mono — every metric, date, revenue figure, and P&L number renders in monospace. This is the ownable typographic decision reinforcing "The Signal" concept.
- **Scale (1.250 modular ratio, 16px root):** 12 / 14 / 16 / 18 / 20 / 25 / 31 / 39 / 49 / 61 / 76px
- **Weights:** 400 body, 500 UI labels, 600 subheads, 700 hero/section titles only. Never 800/900.

## Border Radius

| Element | Radius |
|---|---|
| Data pills / mono badges | 4px |
| Standard cards | 12px |
| Large panels/modals | 20px |
| Buttons | 8px |
| Status dots only | 999px (full round) — never buttons or cards |

## Shadows (glow, not drop-shadow)

- Resting card: inset top hairline `0 1px 0 rgba(255,255,255,0.06)` + `0 8px 24px rgba(0,0,0,0.4)`
- Hover/active: `0 0 0 1px rgba(79,224,197,0.25)` + `0 0 24px rgba(79,224,197,0.08)`

## Animation Timings

| Interaction | Duration/Easing |
|---|---|
| Micro (hover, focus) | 120–160ms ease-out |
| Standard reveal/expand | 400ms `cubic-bezier(0.16, 1, 0.3, 1)` |
| Signal-line traversal | Scroll-linked (not time-based) |
| Counters/metrics | 900–1200ms ease-out, fires once |
| Entrance stagger | 60–80ms per child, capped ~6 steps |
| `prefers-reduced-motion` | Disables stagger/parallax/counting; only 150ms opacity crossfades remain |

## Grid System

- 12-column, max-width 1200px content, 1440px full-bleed for network canvas
- Base unit 4px; gutters 24px (mobile) / 32px (tablet) / 48px (desktop)
- Vertical rhythm between sections: 96px (mobile) / 160px (desktop)

## Icon Style

- Lucide, 1.5px stroke, no fill, for standard UI icons
- Bespoke SVG for node/edge iconography (timeline, industries, skills) — not from a generic icon pack

## Card Style

- Flat `bg-surface`, 1px hairline border, 12px radius, 32px internal padding
- Hover: border brightens to `signal` at 25% opacity + glow + `translateY(-2px)`
- No gradients on standard cards — reserved for hero canvas and signal line only

## Button Style

- **Primary (one per viewport max):** ghost — 1px `signal` border, `signal` text, background fills to `signal` at 10% opacity on hover
- **Secondary:** text-only, underline-on-hover, `text-primary` color
- 8px radius, 150ms hover transition, padding scales with `size` prop

## Spacing Scale

`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 160` (px)

## Component Hierarchy

- **Primitives** (shadcn, restyled): Button, Card, Badge, Dialog, Accordion, Tabs, Tooltip, Input
- **Composed:** MetricReadout, TimelineNode, SignalLine, SkillNode, IndustryCard, TestimonialCard, CaseStudyCard, AwardBadge, QueryTheNetwork (assistant)
- **Layout:** Section, Container, NavRail
- **Page-level:** HeroSignalField, ExecutiveSummary, CareerTimeline, MetricsBoard, SkillsConstellation, IndustryGrid, ProjectCaseStudies, AwardsWall, EducationTimeline, TestimonialDeck, QueryTheNetwork, ContactFooter

## Theme Mode

Dark-only by design — "The Signal" concept is inherently a dark-canvas network visualization; a light mode would break the core metaphor (no light-mode toggle is planned).
