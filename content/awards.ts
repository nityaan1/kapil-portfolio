/**
 * Awards & certifications, sourced from docs/content-inventory.md. Exactly
 * two credentials exist — do not pad this list.
 */

export interface AwardEntry {
  id: string;
  type: "Award" | "Certification";
  title: string;
  issuer: string;
  context: string;
  era: string;
}

export const awards: AwardEntry[] = [
  {
    id: "csat-gold",
    type: "Award",
    title: "Gold Award — CSAT Improvement",
    issuer: "Bharti Airtel Limited",
    context: "Recognized for contribution to improving CSAT scores in complaint management.",
    era: "2002 – 2011",
  },
  {
    id: "iimb-pathbreaker",
    type: "Certification",
    title: "IIMB Pathbreaker",
    issuer: "Indian Institute of Management, Bangalore",
    context: "Executive education program, sponsored by HP.",
    era: "2022 – 2025",
  },
];
