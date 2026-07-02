/**
 * Education, sourced from the CV supplied 2026-07-02
 * (docs/content-inventory.md). Dates are omitted — the current CV doesn't
 * state them, and this file does not assert facts it can't source.
 */

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  dates?: string;
}

export const education: EducationEntry[] = [
  {
    id: "mba",
    degree: "Master's in Business Management",
    institution: "Amity Business School",
  },
  {
    id: "bcom",
    degree: "Bachelor of Commerce",
    institution: "Delhi University",
  },
];
