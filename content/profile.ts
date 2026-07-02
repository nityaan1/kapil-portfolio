/**
 * Typed identity data (hero + nav). Sourced verbatim from the CV supplied
 * 2026-07-02 (docs/content-inventory.md) — the single source of truth for
 * site copy. Do not add facts here that aren't in that file. Career/metrics/
 * summary data lives in the sibling content/timeline.ts, metrics.ts, and
 * summary.ts.
 */

export const profile = {
  name: "Kapil Taneja",
  currentTitle: "Strategic Account Head – Conglomerates",
  currentCompany: "Dell Technologies",
  location: "Mumbai, Maharashtra, India",
  headline: "Enterprise Sales Director | BFSI & Financial Services Growth Leader",
  /**
   * Drafted from the verified Professional Summary for the hero's one
   * leadership statement. Grounded in real facts only (23+ years, the four
   * named employers, the $200M P&L figure).
   */
  leadershipStatement:
    "23+ years building and running enterprise technology and telecom businesses across Dell, HP, Vodafone Idea, and Airtel — turning BFSI and global-enterprise trust into sustained, measurable growth.",
  /**
   * A restrained proof-of-scale row for the hero. Pulled straight from the
   * CV's Professional Summary and Professional Experience sections — do not
   * add a number here that isn't sourced there.
   */
  heroProofPoints: [
    { value: "23+", label: "years in enterprise tech & telecom" },
    { value: "$200M", label: "P&L & account revenue led" },
    { value: "$211M", label: "largest revenue budget scaled" },
  ],
  email: "kapil.taneja75@gmail.com",
  phone: "+91 9819818274",
  linkedinUrl: "https://www.linkedin.com/in/tanejakapil/",
  cvHref: "/cv.pdf",
  /** Pending — no portrait supplied. */
  portraitUrl: null as string | null,
} as const;

export type Profile = typeof profile;
