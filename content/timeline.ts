/**
 * Career timeline data, sourced from the CV supplied 2026-07-02
 * (docs/content-inventory.md). Companies are the top-level chapters; roles
 * are nested underneath where a company spanned more than one title.
 *
 * Note: the new CV attributes the $27M Data/Mobile Broadband P&L to Bharti
 * Airtel alone (Dec 2002 – Aug 2011) and no longer lists MTS as a separate
 * employer — the earlier MTS entry has been removed accordingly.
 */

export interface TimelineRole {
  title: string;
  dates?: string;
  bullets: string[];
}

export interface TimelineEntry {
  id: string;
  company: string;
  dates: string;
  roles: TimelineRole[];
  defaultExpanded?: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    id: "dell",
    company: "Dell Technologies",
    dates: "Jun 2025 – Present",
    defaultExpanded: true,
    roles: [
      {
        title: "Strategic Account Head – Conglomerates",
        dates: "Jun 2025 – Present",
        bullets: [
          "Leads enterprise sales for strategic conglomerate accounts across Dell's Customer Solutions Group (CSG) and Infrastructure Solutions Group (ISG) in a highly matrixed, cross-functional environment",
          "Coaches and mentors sales professionals to meet and exceed targets covering $200M in account revenue",
          "Drives CXO-level engagement across conglomerate accounts to expand share of wallet through subscription and services-led selling motions",
          "Owns account strategy, sales forecasting, and cross-functional alignment across Solutions Engineering, Customer Experience, and Finance",
          "Identifies market trends and orchestrates specialized resources to position Dell as a differentiated technology partner",
        ],
      },
    ],
  },
  {
    id: "hp",
    company: "HP Inc.",
    dates: "Aug 2022 – Jun 2025",
    roles: [
      {
        title: "Zonal Head – Enterprise Accounts, West India",
        dates: "Aug 2022 – Jun 2025",
        bullets: [
          "Led sales strategy, GTM execution, and team performance for Enterprise, Global Accounts, and GCC segments across West India",
          "Managed a revenue budget of $210M across Enterprise, Global Accounts, and GCC through disciplined GTM execution and regular business reviews",
          "Led and developed a team of 13 sales professionals, building the next generation of account leaders",
          "Built and sustained executive-level relationships with customer CXOs and partners, improving NPS/CSAT through structured feedback loops and account planning",
          "Deployed emerging endpoint technologies to enhance customer experience and defend market share against competition",
        ],
      },
    ],
  },
  {
    id: "vodafone-idea",
    company: "Vodafone Idea Limited",
    dates: "Sep 2013 – Aug 2022",
    roles: [
      {
        title: "VP, Global Enterprise & Head, Strategic Accounts Vertical",
        dates: "2019 – Aug 2022",
        bullets: [
          "Owned P&L and profitability up to $100M for BFSI and global enterprise clients, centred on subscription and services-lifecycle sales motions",
          "Partnered with new-generation banking and financial services customers to build and scale new business lines supporting digital and security transformation",
          "Built long-term CXO partnerships across BFSI accounts, driving technology adoption and upgrade cycles while improving customer NPS",
          "Forecasted monthly and annual sales targets with strong accuracy, driving cross-functional initiatives that kept the business consistently on plan",
          "Led teams of 14–35 across VP-era roles",
        ],
      },
      {
        title: "National Sales & Operations Head – Large Accounts",
        dates: "Sep 2013 – 2019",
        bullets: [
          "Delivered a $211M national revenue budget with 23% average YoY growth by selling enterprise-grade solutions to large national customers",
          "Grew orders from Top-100 customers by 40% through targeted relationship and account-growth programs",
          "Achieved 100% growth in new-product revenue nationally through ambitious go-to-market execution",
          "Owned budget planning and execution across circles, maintaining positive NPS with large customers throughout",
          "Led a team of 7+ direct reports",
        ],
      },
    ],
  },
  {
    id: "airtel",
    company: "Bharti Airtel Limited",
    dates: "Dec 2002 – Aug 2011",
    roles: [
      {
        title: "Regional Head, North & East India / Head – Acquisition",
        dates: "Dec 2002 – Aug 2011",
        bullets: [
          "Owned $27M in Data (Mobile Broadband) revenue across North & East India, achieving RMS and CMS leadership in the circle",
          "Conceived and launched new circle products, balancing ARPU against aggressive market and competitive positioning",
          "Managed an indirect channel network of 7 distributors, 200 retail outlets, and 3 ARCs to drive acquisition and retention",
          "Led the transformation from a Capex to a customer-owned model, reducing capital investment while sustaining growth",
          "Won a Gold Award for driving CSAT improvement in Complaint Management",
        ],
      },
    ],
  },
  {
    id: "group4",
    company: "Group 4 Securitas India Pvt Ltd",
    dates: "May 2001 – Dec 2002",
    roles: [
      {
        title: "Assistant Manager – Sales & Marketing",
        bullets: [
          "Grew top-line revenue by 10% annually across Delhi and Punjab branches, securing new business with Spectranet, Ranbaxy, and O&M",
          "Negotiated price increases and expanded service scope with existing clients through proactive account management",
        ],
      },
    ],
  },
];
