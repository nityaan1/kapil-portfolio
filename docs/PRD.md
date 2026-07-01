# Product Requirements Document
## Executive Portfolio — Kapil Taneja

Status: **Draft for approval — no code written yet.**
Source of truth for all content: [`content-inventory.md`](./content-inventory.md)

---

## 1. Vision & Success Criteria

Not a resume site. A cinematic, editorial-grade personal brand site for a 23-year enterprise technology/telecom sales executive (Dell, HP, Vodafone Idea, Airtel), built to convert a LinkedIn click into an immediate impression of credibility and leadership caliber.

**The 10-second test:** a recruiter, CXO peer, or board contact lands on the hero, and before they've scrolled past the first section, they understand: (1) who he is, (2) the scale he operates at ($100M+ P&L, $211M budgets, Dell/HP/Vodafone pedigree), (3) that this site itself is evidence of the same quality bar he applies to his work.

**Non-goals:** no generic timeline-of-jobs template, no stock-photo aesthetic, no invented statistics, no filler "Lorem ipsum" sections waiting for content.

---

## 2. Audience & Primary Use Cases

| Audience | What they're trying to do |
|---|---|
| CXO / board contact via LinkedIn | Fast credibility check before a meeting or intro |
| Executive recruiter | Scan scope (P&L size, team size, industries) and pull the CV in one click |
| Potential employer/partner | Understand leadership philosophy and track record, not just job titles |
| Journalist/conference organizer | Get a quotable bio and a way to schedule time |

---

## 3. Content Requirements (real data only)

All copy is generated from `content-inventory.md`. Rule: **if a fact isn't in that file, it does not appear on the site or come out of the AI assistant.** This is a hard constraint, not a style preference — it's what "the AI should never hallucinate" and "no fake statistics" require in practice.

Sections and their backing data (see inventory for full detail):
1. **Hero** — name, current headline, one leadership statement (to be drafted from the Executive Summary, approved by user before use), portrait (pending upload)
2. **Executive Summary** — narrative adaptation of the verified summary paragraph — storytelling, not paragraph-dump
3. **Career Timeline** — 6 organizations, interactive expand-per-role, using the verified achievements/responsibilities per role
4. **Leadership Metrics** — animated counters using only the defensible metrics table (23+ years, $211M budget, $100M P&L, 35-person team, 500+/45+ clients)
5. **Skills** — Key Account Management (18 endorsements) and Team Management (23 endorsements) confirmed; interactive visualization sized to real endorsement weight, not decorative bars. *(Will look better with the fuller 25-skill list — flagged as an open item.)*
6. **Industry Experience** — Telecom, BFSI, IoT, Smart Cities, Unified Communications, Cloud, Enterprise Networking, Cybersecurity, Servers & Compute, End Point Devices
7. **Projects/Case Studies** — the CV is role-description-heavy rather than project-case-study-heavy; the two strongest candidates are (a) the $211M Large Accounts national rollout with 23% YoY growth and 40% growth in Top 100 accounts, and (b) the Capex Optimization Project (Capex→customer-owned model transformation). Framed as Challenge/Approach/Solution/Impact/Lessons using only verified facts — will read thinner than a typical case study, which is honest given the source material. **User can enrich this section with more narrative detail on request.**
8. **Awards** — Gold CSAT Award; **Certifications** — IIMB Pathbreaker (IIM Bangalore executive program)
9. **Education** — MBA (Amity University, Noida, 1999–2001), B.Com (Delhi University)
10. **Testimonials** — 5 real, named, sourced LinkedIn recommendations, in full
11. **AI Assistant** — see §5
12. **Downloads/Contact** — CV download, LinkedIn link, email, "Schedule a meeting" (needs a calendar link — Calendly/similar — from user), QR code (auto-generated from the live site URL)

---

## 4. Feature Requirements (from user brief, mapped to build detail)

- **Career Timeline:** expand/collapse per role, framer-motion height animation, achievements/responsibilities/tech tags per the inventory. No photos are available per-role, so timeline design should not depend on imagery it doesn't have.
- **Leadership Metrics:** counters animate on scroll-into-view once, respecting `prefers-reduced-motion` (jump to final value instead of counting).
- **Skills:** a non-bar visualization — e.g., an orbit/cluster layout sized by endorsement count, or a weighted tag cloud. Decide during style-guide sign-off.
- **Industries:** interactive card grid, flip or hover-reveal with one line of real context per industry from the inventory.
- **Testimonials:** carousel or masonry, full attribution (name, title, relationship, date) — never trimmed to the point of losing the source.
- **Downloads:** CV must be an actual PDF export of the site content (or the source CV, user's choice), LinkedIn/email/schedule links are plain `<a>` tags, QR code generated client-side (e.g. `qrcode` lib) pointing at the deployed URL — no third-party QR API that logs the target.

---

## 5. AI Assistant — Grounding Design

This is the highest-risk feature for the "never hallucinate" requirement, so it gets its own section.

**Architecture:** server-side API route (Next.js Route Handler) → Anthropic API (Claude). The entire `content-inventory.md` (a few KB) is injected as context on every request — no vector DB/RAG needed at this content size, which also means no retrieval-relevance failures.

**System prompt contract (non-negotiable):**
- Answer only using the supplied context block.
- If the answer isn't in the context, respond that the information isn't available on the site rather than guessing or inferring.
- Never invent numbers, dates, employers, or quotes.
- Decline off-topic requests (general chit-chat, unrelated advice) and redirect to what it can answer.

**Verification plan:** before shipping, run a fixed adversarial test set (e.g. "What's his salary?", "Has he worked in the US?", "Does he have a PhD?" — all things NOT in the inventory) and confirm the assistant refuses/deflects every time, plus a positive set ("What ERP systems does he know?" — note: ERP is NOT in the inventory either, so this must also be refused) to catch overconfident answers.

**API key handling:** server-side environment variable only, never exposed to the client bundle.

---

## 6. Information Architecture

**Model:** single-page cinematic scroll as the primary experience (matches "scrolling should tell a story"), with dedicated deep-linkable routes for anything that benefits from its own URL for SEO/sharing.

```
/ (single-page scroll, all sections below as anchored regions)
 ├── #hero
 ├── #summary
 ├── #timeline
 ├── #metrics
 ├── #skills
 ├── #industries
 ├── #projects        → also exists as /projects/[slug] for direct-share deep links
 ├── #awards
 ├── #education
 ├── #testimonials
 └── #contact

/projects/[slug]        — full case study, same content as the in-page expanded card, own <title>/OG tags
/api/assistant           — POST route for the AI assistant (server-only)
/cv.pdf                  — static download
```

**Navigation:** a slim fixed/floating nav that (a) shows section progress as you scroll (a subtle progress indicator, not a bulky sidebar), (b) collapses to a menu icon on mobile, (c) offers a persistent but unobtrusive "Download CV" / "Contact" affordance so the two highest-intent actions are never more than one tap away.

---

## 7. Visual Style Guide

**Direction:** dark-mode-first, editorial minimalism. Apple's restraint + Linear's precision/motion + Stripe's grid discipline + Notion's warmth in typography + Arc's playful-but-controlled accent color.

- **Palette:** near-black base (`#0A0A0C`), off-white text (`#F5F5F0`), a single confident accent color for CTAs/highlights. Recommend a deep, desaturated **cobalt/indigo** (`#4C6FFF`-ish) — signals technology/enterprise without looking like generic "startup blue." Open to a different accent if he has a personal/brand color preference.
- **Typography:** one geometric/grotesk sans for UI and body (e.g. **Inter** or **Geist**), paired with a distinctive display typeface for the hero headline and section titles for gravitas (e.g. **Geist** at very large weight, or a serif display like **Fraunces** for contrast — decide by A/B'ing both against his photo once available).
- **Grid & spacing:** generous whitespace, 12-column responsive grid, section padding that scales with viewport — nothing should ever feel cramped.
- **Motion principles:**
  - Every animation ties to scroll position or user intent — no motion "for decoration"
  - Standard entrance: fade + 8–16px translate-Y, 400–600ms, ease-out
  - Counters/timeline: triggered once on intersection, never re-trigger on scroll-back
  - Respect `prefers-reduced-motion: reduce` globally — fall back to instant states
  - Hover states are subtle (scale 1.02, opacity/color shifts) — never bouncy or gimmicky
- **Imagery:** since there's exactly one real photo (pending) and no per-role photography, the design leans on typography, whitespace, and abstract/geometric motion accents rather than photo grids — this is a feature of the constraint, not a workaround.

---

## 8. Tech Stack & Rationale

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | SSG/ISR for near-instant loads + strong SEO out of the box; Route Handlers give a clean home for the AI assistant API without a separate backend |
| Language | **TypeScript** | Content inventory becomes typed data (`lib/content.ts`), catching typos/broken references at build time rather than in front of a CXO |
| Styling | **Tailwind CSS v4** | Fast iteration on the whitespace/typography-heavy design language; no runtime CSS-in-JS cost |
| Animation | **Framer Motion (`motion/react`)** | Purpose-built for scroll-linked reveals, layout animations (timeline expand/collapse), and respects reduced-motion out of the box |
| Components | **shadcn/ui** | Accessible primitives (dialog, accordion, tabs) we can restyle fully to match the brand instead of fighting a themed component library |
| Icons | **Lucide** | Matches shadcn conventions, consistent stroke weight fits the minimal aesthetic |
| Content | Typed local data module generated from `content-inventory.md` | No CMS overhead for a single-person, infrequently-updated site; also becomes the AI assistant's context source — one file, two consumers, impossible for site copy and assistant answers to drift apart |
| AI | **Anthropic API (Claude)**, server-side Route Handler | Strong instruction-following for the "never hallucinate, admit gaps" contract |
| Hosting | **Vercel** | Native Next.js support, edge caching, easiest path to near-perfect Lighthouse scores |
| Testing | **Playwright** (smoke/e2e) + **axe-core** (accessibility) | Confirms interactive features (timeline expand, assistant, downloads) actually work, and catches a11y regressions before they ship |

---

## 9. Non-Functional Requirements

- **Performance:** Core Web Vitals in the green; images (once photo is added) served via `next/image` with proper sizing; fonts self-hosted/subset via `next/font`.
- **Accessibility:** WCAG 2.1 AA — keyboard-navigable timeline/accordions, proper heading hierarchy, sufficient contrast in dark mode, `prefers-reduced-motion` respected, AI assistant chat usable via keyboard/screen reader.
- **SEO:** per-page metadata, OG images for `/projects/[slug]`, sitemap.xml, semantic HTML.
- **Responsiveness:** desktop (primary showcase), tablet, and mobile all get intentional layouts — not just breakpoint shrinkage.

---

## 10. Development Roadmap (each milestone stops for approval)

| Milestone | Scope | Approval gate |
|---|---|---|
| **M0 — Content lock** | Finalize inventory: photo, $27M MTS/Airtel reconciliation, optional full skills list, testimonial publish confirmation | User approves `content-inventory.md` as final |
| **M1 — Scaffold & design tokens** | Next.js/TS/Tailwind project init, font/color tokens, empty layout shell matching the style guide | User approves look/feel on a blank page before any content goes in |
| **M2 — Core narrative** | Hero, Executive Summary, Career Timeline (real data, real animation) | Review for tone and motion feel |
| **M3 — Proof sections** | Leadership Metrics, Skills, Industry Experience, Awards, Certifications, Education | Review for data accuracy against inventory |
| **M4 — Depth sections** | Projects/case studies, Testimonials | Review — case study depth is inherently limited by source material; confirm acceptable or enrich content first |
| **M5 — AI Assistant** | Route handler, grounding system prompt, adversarial test set run and shown to user | User reviews transcript of the adversarial tests before assistant goes live |
| **M6 — Utility & polish** | Downloads (CV/QR), Contact, full responsive pass, Lighthouse/a11y pass | Final review before deploy |
| **M7 — Deploy** | Vercel production deploy, domain hookup if applicable | Explicit go-ahead required (this is the one irreversible/visible-to-others step) |

---

## 11. Open Decisions Needed From User

1. Photo/headshot upload
2. Reconcile the $27Mn Data/Mobile Broadband figure — MTS, Airtel, or both?
3. Accent color preference (proposed: cobalt/indigo) — approve or override
4. Typography direction (all-sans vs. sans+display-serif pairing) — approve or override
5. Calendar link for "Schedule a Meeting" (Calendly or equivalent)
6. Confirm OK to publish the 5 testimonials by full name (public LinkedIn recommendations, but confirming is good practice)
7. Domain/hosting — use Vercel's default subdomain for now, or is there a custom domain to point?
