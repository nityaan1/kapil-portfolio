/**
 * Skills, sourced from docs/content-inventory.md. Only two LinkedIn skills
 * have confirmed endorsement counts — the inventory explicitly flags the
 * other 23 as not yet extracted, so only these two get the hard-data
 * treatment. `capabilities` are real, LinkedIn-sourced self-described
 * strengths (Dell "Key Strengths" + HP "Executive Responsibilities" lists)
 * presented separately as qualitative, not endorsement-backed.
 */

export interface EndorsedSkill {
  id: string;
  label: string;
  endorsements: number;
}

/** Gauge scale for the radial meters — chosen so both real values sit legibly under it. */
export const ENDORSEMENT_SCALE_MAX = 25;

export const endorsedSkills: EndorsedSkill[] = [
  { id: "key-account-management", label: "Key Account Management", endorsements: 18 },
  { id: "team-management", label: "Team Management", endorsements: 23 },
];

export const capabilities: string[] = [
  "CXO relationship development",
  "Strategic account & territory planning",
  "CSG + ISG solution positioning",
  "Business trend analysis",
  "Cross-functional leadership",
  "Coaching & team enablement",
  "Enterprise sales strategy & revenue leadership",
  "High-performance team development",
  "Strategic customer & partner engagement",
  "Market intelligence & competitive alignment",
  "Digital transformation across customer ecosystems",
];
