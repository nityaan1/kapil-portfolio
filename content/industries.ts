/**
 * Industry/domain exposure, sourced from the CV supplied 2026-07-02
 * (docs/content-inventory.md). Trimmed to what the current CV substantiates
 * — do not pad with domains only a prior LinkedIn export claimed.
 */

export interface Industry {
  id: string;
  label: string;
  context: string;
}

export const industries: Industry[] = [
  {
    id: "technology",
    label: "Technology",
    context: "Enterprise technology sales leadership at Dell Technologies and HP Inc.",
  },
  {
    id: "telecommunications",
    label: "Telecommunications",
    context: "Two decades across Bharti Airtel and Vodafone Idea.",
  },
  {
    id: "bfsi",
    label: "BFSI & Financial Services",
    context: "Trusted-advisor relationships with conglomerate boards and BFSI CXOs, expanding wallet share within Top-100 accounts.",
  },
  {
    id: "cloud-infrastructure",
    label: "Cloud & Digital Infrastructure",
    context: "Positioned high-value infrastructure suites driving cloud-led digital transformation for enterprise clients.",
  },
  {
    id: "cybersecurity",
    label: "Cybersecurity",
    context: "Commercialised advanced cybersecurity suites as part of client modernization cycles.",
  },
  {
    id: "ai",
    label: "Artificial Intelligence",
    context: "Securing rapid market adoption of AI as part of emerging-tech commercialisation.",
  },
];
