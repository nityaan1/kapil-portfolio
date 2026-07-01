/**
 * Typed identity data (hero + nav). Sourced verbatim from
 * docs/content-inventory.md — the single source of truth shared by the UI
 * and (in a later milestone) the AI assistant's grounding context. Do not
 * add facts here that aren't in that file. Career/metrics/summary data
 * lives in the sibling content/timeline.ts, metrics.ts, and summary.ts.
 */

export const profile = {
  name: "Kapil Taneja",
  currentTitle: "Enterprise Account Director – Conglomerates",
  currentCompany: "Dell Technologies",
  location: "Mumbai, Maharashtra, India",
  headline:
    "Director and Regional Head, Enterprise Vertical — driving digital transformation and growth across technology and telecom.",
  /**
   * Drafted from the verified Executive Summary for the hero's one leadership
   * statement (PRD §3). Grounded in real facts only (two decades, the four
   * named employers) — flagged in docs/PRD.md §11 for the user's sign-off
   * before this copy is treated as final.
   */
  leadershipStatement:
    "Two decades scaling enterprise technology businesses across Dell, HP, Vodafone Idea, and Airtel — turning CXO trust into sustained, measurable growth.",
  /**
   * A restrained proof-of-scale row for the hero (design critique: the first
   * viewport had no scale cue at all). Pulled straight from the Leadership
   * Metrics table in docs/content-inventory.md — do not add a number here
   * that isn't sourced there.
   */
  heroProofPoints: [
    { value: "25+", label: "years in enterprise tech & telecom" },
    { value: "$100M+", label: "P&L led" },
    { value: "$211M", label: "revenue budget scaled" },
  ],
  email: "Kapil.taneja75@gmail.com",
  phone: "+91 9819818274",
  linkedinUrl: "https://www.linkedin.com/in/tanejakapil/",
  cvHref: "/cv.pdf",
  /** Pending — see docs/content-inventory.md open items. */
  portraitUrl: null as string | null,
} as const;

export type Profile = typeof profile;
