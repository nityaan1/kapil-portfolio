/**
 * Areas of Expertise, sourced verbatim from the "AREAS OF EXPERTISE" section
 * of the CV supplied 2026-07-02 (docs/content-inventory.md) — four
 * categories, three items each. Replaces the earlier LinkedIn-endorsement
 * gauges, which the current CV doesn't corroborate.
 */

export interface ExpertiseCategory {
  id: string;
  label: string;
  items: string[];
}

export const expertiseCategories: ExpertiseCategory[] = [
  {
    id: "growth-gtm",
    label: "Strategic Growth & GTM Strategy",
    items: [
      "Enterprise GTM Architecture",
      "Institutional BFSI Market Expansion",
      "Recurring Revenue Optimization (ARR/MRR)",
    ],
  },
  {
    id: "digital-security",
    label: "Digital & Security Transformation",
    items: [
      "Artificial Intelligence (AI) Adoption",
      "Cybersecurity Commercialisation",
      "Cloud & Digital Infrastructure Evolution",
    ],
  },
  {
    id: "ecosystem-governance",
    label: "Ecosystem & Relationship Governance",
    items: [
      "Board & CXO Alliance Building",
      "Strategic Partner Ecosystems",
      "Co-Sell & Channel Orchestration",
    ],
  },
  {
    id: "executive-leadership",
    label: "Executive Leadership & Scale",
    items: [
      "Cross-Functional Matrix Leadership",
      "Fiscal Stewardship & P&L Optimization",
      "High-Performance Talent Architecture",
    ],
  },
];
