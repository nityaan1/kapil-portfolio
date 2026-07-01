# Creative Direction — Final Design Review

Status: **Frozen.** This supersedes PRD §7 (Visual Style Guide) for concept/metaphor purposes; `design-system.md` supersedes it for concrete tokens.

## Critique of the Original PRD

The original PRD was operationally sound but conceptually generic — every section was a competent instance of a pattern that already exists on countless executive/consultant portfolios, with no single governing idea tying them together.

| Section | Generic pattern it defaulted to |
|---|---|
| Hero | Full-bleed portrait + name + title + tagline (the single most common executive-site pattern) |
| Executive Summary | Risk of shipping as three nicely-typeset paragraphs — not actually a story |
| Career Timeline | Vertical/horizontal expand-cards — literally what LinkedIn already renders |
| Leadership Metrics | Animated counters — the most overused "credibility" widget on the internet |
| Skills | No concrete alternative to progress bars had been specified |
| Industry cards | Flip/hover cards — a Bootstrap-era pattern |
| Projects | Challenge/Approach/Solution/Impact/Lessons — the standard Dribbble/Behance case-study skeleton |
| Awards | "Trophy showcase" risked a Little-League-banquet feel |
| Testimonials | Carousel/masonry — the default WordPress plugin pattern |
| AI Assistant | Corner chat bubble — now the default "add AI to a site" pattern, reads as trend-chasing |
| Overall IA | Long scroll + floating anchor nav — the generic agency-template structure |

**Diagnosis:** sections were listed rather than unified under one idea. Apple, Linear, Stripe, and Arc all organize their sites around a single governing metaphor, not a checklist.

## Five Directions Considered

1. **The Signal** — career as a living network graph (nodes = companies/clients/skills, scroll traces a signal through the graph). Authentic to a 23-year telecom/connectivity career.
2. **The Ledger** — career as a financial instrument; Bloomberg-terminal-meets-Stripe-dashboard, real revenue/growth charts per era.
3. **Field Notes** — career as an operator's journal; warm, voice-driven, testimonials woven throughout rather than parked in a carousel.
4. **Systems Blueprint** — career as an engineered system; continuous scroll-driven zoom-out from current role to the full system beneath it.
5. **The Interview** — AI-first; the assistant is the hero, traditional sections become a secondary "Browse" mode.

Full comparison (visual inspiration / UX / emotional impact / recruiter memorability / complexity / risk) for each lives in the conversation history that produced this document.

## Recommendation (Adopted)

**Direction 1, "The Signal,"** with two grafts:
- From Direction 2 (Ledger): metrics render as real scale/growth data in monospace numerals along the network, not generic counters.
- From Direction 5 (Interview): the AI assistant becomes **"Query the Network"** — a first-class console styled consistently with the signal/node motif, positioned as an alternate way to traverse the same graph, not a bolted-on chat bubble.

**Why:** it's the only direction authentic to his actual domain (a telecom/networking executive whose site behaves like a network) rather than an aesthetic borrowed from an unrelated industry. Lower technical risk than the Blueprint's continuous zoom-scroll, and it preserves Field Notes' human warmth through node annotations (testimonials, voice) without making that the entire concept.
