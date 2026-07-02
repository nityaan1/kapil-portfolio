/**
 * Awards & recognition. The Gold Award is confirmed in the CV supplied
 * 2026-07-02; IIMB Pathbreaker isn't in that CV but is confirmed directly by
 * the user and restored per their request (docs/content-inventory.md).
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
    context: "Recognized for driving CSAT improvement in Complaint Management.",
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
