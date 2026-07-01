/**
 * Career timeline data, sourced from the "Career Timeline" section of
 * docs/content-inventory.md. Companies are the top-level chapters; roles
 * are nested underneath where a company spanned more than one title.
 *
 * Note: the CV lists the same $27M Data/Mobile Broadband figure under both
 * MTS and Bharti Airtel (an unreconciled duplication flagged in the
 * inventory's "Open items"). It's kept here only under MTS; the Airtel
 * "Regional Head" bullets below intentionally omit that figure rather than
 * assert an unconfirmed number twice.
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
        title: "Enterprise Account Director – Conglomerates",
        dates: "Jun 2025 – Present",
        bullets: [
          "Manages strategic accounts across Dell's Customer Service Group (CSG) and Infrastructure Solutions Group (ISG)",
          "Drives CXO-level engagement and expands share of wallet through multi-portfolio conversations",
          "Leads and coaches a team of sales professionals and managers",
          "Serves 500+ clients",
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
        title: "Head of Enterprise Sales, West India",
        dates: "Aug 2022 – Jun 2025",
        bullets: [
          "Shaped and executed enterprise sales strategy aligned to HP's strategic vision",
          "Led high-impact sales teams through data-driven performance management",
          "Built strategic customer and channel partnerships using market intelligence",
          "Served 45+ clients",
          "Completed the IIMB Pathbreaker executive education program (IIM Bangalore, HP-sponsored)",
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
        title: "VP & National Sales Head, BFSI Vertical",
        dates: "Jul 2020 – Feb 2022",
        bullets: [
          "Managed national operations generating $30M/annum across BFSI and global enterprise clients",
          "Owned P&L and profitability for the vertical",
          "Led customer experience and NPS improvement initiatives",
        ],
      },
      {
        title: "Head for Global Enterprise",
        dates: "Apr 2017 – Jul 2020",
        bullets: [
          "Managed $70M/annum in operations for global enterprise clients",
          "Enabled client adoption of IoT, Smart Cities, Unified Communications, and Cloud",
          "Owned national budget, forecast, and P&L with consistent year-on-year growth",
        ],
      },
      {
        title: "National Head, Sales & Operations – Large Accounts Vertical",
        dates: "Aug 2013 – Mar 2017",
        bullets: [
          "Helped circle teams hit a $211M annual revenue budget with 23% average YoY growth",
          "Grew orders 40% across the Top 100 customer accounts, including SBI, Future Group, and HDFC",
          "Delivered 100% growth against new product revenue targets",
          "Led a team that scaled from 14 to 35 people across VP-era roles",
        ],
      },
    ],
  },
  {
    id: "mts",
    company: "MTS – Sistema Shyam Teleservices Ltd",
    dates: "Sep 2011 – May 2013",
    roles: [
      {
        title: "Regional Manager / Regional Head, North & East India",
        bullets: [
          "Owned $27M in revenue for Data (Mobile Broadband) products",
          "Achieved RMS and CMS leadership in the circle through product planning and launch",
          "Built data-centric usage and revenue enhancement programs across customer segments",
          "Led churn management and retention through churn analytics",
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
        title: "Regional Head, North and East India",
        bullets: [
          "Owned strategies to grow revenue, customer base, and new order bookings across circle teams",
          "Launched programs to increase profitability across pre-paid and post-paid segments",
          "Achieved RMS and CMS leadership while maintaining strong brand health scores",
        ],
      },
      {
        title: "Head – Acquisition (Circle & Corporate, multiple roles)",
        bullets: [
          "Managed the product life cycle for Data Broadband across the North Hub",
          "Ran customer acquisition across 7 distributors, 200 key retail outlets, and a Modern Trade network",
          "Led the Capex Optimization Project, transforming the organization from a Capex to a customer-owned model",
          "Won a Gold Award for improving CSAT scores in complaint management",
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
        title: "Assistant Manager, Sales & Marketing",
        bullets: [
          "Owned sales targets for security products across Delhi and Punjab branches",
          "Grew top-line revenue 10% annually, including new business with Spectranet, Ranbaxy, and O&M",
          "Led client servicing, price negotiations, and competitive market research",
        ],
      },
    ],
  },
];
