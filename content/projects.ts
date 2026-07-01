/**
 * Two project case studies, sourced from docs/content-inventory.md. The
 * CV is written as role descriptions, not project narratives, so these are
 * the only two moments with enough substantiated detail to stand alone
 * (PRD §3) — presented as a tight narrative + real metrics rather than a
 * forced Challenge/Approach/Solution/Impact/Lessons template padded with
 * repetition (docs/creative-direction.md's critique of generic case-study
 * skeletons applies here too).
 */

export interface Project {
  id: string;
  title: string;
  company: string;
  era: string;
  narrative: string;
  metrics?: { value: string; label: string }[];
}

export const projects: Project[] = [
  {
    id: "large-accounts-scale-up",
    title: "Scaling Large Accounts Nationally",
    company: "Vodafone Idea Limited",
    era: "Aug 2013 – Mar 2017",
    narrative:
      "Given a mandate to scale Vodafone Idea's Large Accounts vertical nationally, the team grew the annual revenue budget to $211M with 23% average year-over-year growth — while lifting orders 40% across the Top 100 customers, including SBI, Future Group, and HDFC, and hitting a 100% growth target on new product revenue.",
    metrics: [
      { value: "$211M", label: "revenue budget" },
      { value: "23%", label: "avg. YoY growth" },
      { value: "40%", label: "Top-100 order growth" },
    ],
  },
  {
    id: "capex-optimization",
    title: "From Capex to Customer-Owned",
    company: "Bharti Airtel Limited",
    era: "Dec 2002 – Aug 2011",
    narrative:
      "Led the Capex Optimization Project at Bharti Airtel — transforming the organization's infrastructure model from a capital-heavy Capex approach to a customer-owned model, alongside a bandwidth-monetization initiative (GADs on Limited Plans) that improved revenue share through performance-reduction variance management.",
  },
];
