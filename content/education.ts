/**
 * Education, sourced from docs/content-inventory.md.
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
    degree: "MBA, Sales & Marketing",
    institution: "Amity University, Noida",
    dates: "1999 – 2001",
  },
  {
    id: "bcom",
    degree: "Bachelor of Commerce",
    institution: "Delhi University",
  },
];
