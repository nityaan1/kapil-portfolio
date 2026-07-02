/**
 * Two project case studies, sourced from the CV supplied 2026-07-02
 * (docs/content-inventory.md). The CV is written as role descriptions, not
 * project narratives, so these are the two moments with enough
 * substantiated detail to stand alone — presented as a tight narrative +
 * real metrics rather than a padded template.
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
    era: "Sep 2013 – 2019",
    narrative:
      "As National Sales & Operations Head for Large Accounts, delivered a $211M national revenue budget with 23% average year-over-year growth — while lifting orders from Top-100 customers by 40% and hitting a 100% growth target on new product revenue nationally.",
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
      "As Regional Head for North & East India, led the transformation of Bharti Airtel's infrastructure model from a capital-heavy Capex approach to a customer-owned model — reducing capital investment while sustaining growth across an indirect channel network of 7 distributors and 200 retail outlets.",
  },
];
