/**
 * Leadership Metrics, rewritten 2026-07-02 as a curated executive showcase
 * rather than animated counters — six pillars of leadership impact, sourced
 * verbatim from the user-approved copy in docs/content-inventory.md. Every
 * figure quoted inside a description ties back to a fact already
 * established in content/timeline.ts.
 */

export interface LeadershipPillar {
  id: string;
  title: string;
  description: string;
}

export const leadershipPillars: LeadershipPillar[] = [
  {
    id: "gtm-architecture",
    title: "Enterprise GTM Architecture & Scale",
    description:
      "Engineered and executed high-velocity Go-To-Market strategies across West, North, and East India, steering multi-million dollar P&Ls (up to $211M) to consistently capture dominant market share and defend legacy revenue.",
  },
  {
    id: "bfsi-expansion",
    title: "Institutional BFSI & Conglomerate Expansion",
    description:
      "Cultivated enduring, trusted-advisor relationships with conglomerate boards and CXOs to orchestrate complex subscription and lifecycle-based services, expanding wallet share by up to 40% within Top-100 accounts.",
  },
  {
    id: "emerging-tech",
    title: "Emerging Tech Commercialisation",
    description:
      "Spearheaded client modernization cycles by positioning high-value infrastructure suites, securing rapid market adoption of Artificial Intelligence (AI), advanced cybersecurity, and cloud-led digital transformations.",
  },
  {
    id: "ecosystem-cosell",
    title: "Ecosystem & Co-Sell Orchestration",
    description:
      "Unlocked non-linear revenue streams by leveraging multi-tier indirect channel frameworks (distributors and retail networks) while driving highly matrixed, cross-functional co-sell motions with strategic partners.",
  },
  {
    id: "revenue-governance",
    title: "Predictable Revenue Governance",
    description:
      "Established rigorous, data-driven forecasting architectures across Solutions Engineering, Customer Experience, and Finance, eliminating operational friction to deliver up to 23% average YoY revenue growth.",
  },
  {
    id: "talent-architecture",
    title: "High-Performance Talent Architecture",
    description:
      "Recruited, mentored, and retained cross-functional, matrixed sales teams of up to 35 professionals, intentionally developing the next generation of regional sales directors and account leaders.",
  },
];
