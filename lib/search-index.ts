/**
 * Client-side search index for the Executive Search command palette.
 * Built entirely from the existing typed content modules — the same single
 * source of truth the page renders from — so search results can never say
 * anything the site itself doesn't already say. No external API, no network
 * request: this is a plain array evaluated once at build time.
 */

import { timeline } from "@/content/timeline";
import { leadershipPillars } from "@/content/metrics";
import { expertiseCategories } from "@/content/skills";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { awards } from "@/content/awards";
import { education } from "@/content/education";

export type SearchCategory =
  | "Company"
  | "Role"
  | "Expertise"
  | "Industry"
  | "Award"
  | "Education"
  | "Project"
  | "Metric";

export interface SearchItem {
  id: string;
  title: string;
  subtitle?: string;
  category: SearchCategory;
  /** Anchor id to scroll to when this result is selected. */
  sectionId: string;
  /** Extra text searched but never displayed (bullets, context, narrative). */
  keywords?: string;
}

const companyItems: SearchItem[] = timeline.map((entry) => ({
  id: `company-${entry.id}`,
  title: entry.company,
  subtitle: entry.dates,
  category: "Company",
  sectionId: "timeline",
  keywords: entry.roles
    .map((role) => `${role.title} ${role.bullets.join(" ")}`)
    .join(" "),
}));

const roleItems: SearchItem[] = timeline.flatMap((entry) =>
  entry.roles.map((role) => ({
    id: `role-${entry.id}-${role.title}`,
    title: role.title,
    subtitle: `${entry.company}${role.dates ? ` · ${role.dates}` : ""}`,
    category: "Role" as const,
    sectionId: "timeline",
    keywords: role.bullets.join(" "),
  }))
);

const metricItems: SearchItem[] = leadershipPillars.map((pillar) => ({
  id: `metric-${pillar.id}`,
  title: pillar.title,
  subtitle: "Leadership metric",
  category: "Metric",
  sectionId: "metrics",
  keywords: pillar.description,
}));

const industryItems: SearchItem[] = industries.map((industry) => ({
  id: `industry-${industry.id}`,
  title: industry.label,
  subtitle: "Industry experience",
  category: "Industry",
  sectionId: "industries",
  keywords: industry.context,
}));

const expertiseItems: SearchItem[] = expertiseCategories.flatMap((category) =>
  category.items.map((item, index) => ({
    id: `expertise-${category.id}-${index}`,
    title: item,
    subtitle: category.label,
    category: "Expertise" as const,
    sectionId: "expertise",
  }))
);

const projectItems: SearchItem[] = projects.map((project) => ({
  id: `project-${project.id}`,
  title: project.title,
  subtitle: `${project.company} · ${project.era}`,
  category: "Project",
  sectionId: "projects",
  keywords: `${project.narrative} ${(project.metrics ?? []).map((m) => `${m.value} ${m.label}`).join(" ")}`,
}));

const awardItems: SearchItem[] = awards.map((award) => ({
  id: `award-${award.id}`,
  title: award.title,
  subtitle: `${award.issuer} · ${award.era}`,
  category: "Award",
  sectionId: "education",
  keywords: award.context,
}));

const educationItems: SearchItem[] = education.map((entry) => ({
  id: `education-${entry.id}`,
  title: entry.degree,
  subtitle: `${entry.institution}${entry.dates ? ` · ${entry.dates}` : ""}`,
  category: "Education",
  sectionId: "education",
}));

export const searchIndex: SearchItem[] = [
  ...companyItems,
  ...roleItems,
  ...metricItems,
  ...industryItems,
  ...expertiseItems,
  ...projectItems,
  ...awardItems,
  ...educationItems,
];

export interface HighlightRange {
  start: number;
  end: number;
}

interface FieldMatch {
  score: number;
  ranges: HighlightRange[];
}

/**
 * Contiguous case-insensitive substring match first (scored by position —
 * earlier is more relevant, with real highlight ranges); falls back to a
 * loose in-order fuzzy match so small typos still surface something. No
 * dependency needed at this index size (~90 items).
 */
function matchField(query: string, text: string): FieldMatch | null {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();

  const idx = lowerText.indexOf(lowerQuery);
  if (idx !== -1) {
    return {
      score: 100 - idx * 0.1,
      ranges: [{ start: idx, end: idx + lowerQuery.length }],
    };
  }

  let textIndex = 0;
  let start = -1;
  for (let queryIndex = 0; queryIndex < lowerQuery.length; queryIndex++) {
    const char = lowerQuery[queryIndex];
    let found = -1;
    for (; textIndex < lowerText.length; textIndex++) {
      if (lowerText[textIndex] === char) {
        found = textIndex;
        break;
      }
    }
    if (found === -1) return null;
    if (start === -1) start = found;
    textIndex = found + 1;
  }

  return {
    score: 40 - (textIndex - start),
    ranges: [{ start, end: textIndex }],
  };
}

export interface SearchResult {
  item: SearchItem;
  score: number;
  titleRanges: HighlightRange[];
}

export function searchPortfolio(query: string, limit = 8): SearchResult[] {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const results: SearchResult[] = [];

  for (const item of searchIndex) {
    const titleMatch = matchField(trimmed, item.title);
    const subtitleMatch = item.subtitle ? matchField(trimmed, item.subtitle) : null;
    const keywordMatch = item.keywords ? matchField(trimmed, item.keywords) : null;

    if (!titleMatch && !subtitleMatch && !keywordMatch) continue;

    const score = Math.max(
      titleMatch ? titleMatch.score + 20 : -Infinity,
      subtitleMatch ? subtitleMatch.score + 5 : -Infinity,
      keywordMatch ? keywordMatch.score : -Infinity
    );

    results.push({
      item,
      score,
      titleRanges: titleMatch ? titleMatch.ranges : [],
    });
  }

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, limit);
}

export const SUGGESTED_SEARCHES = [
  "Dell Technologies",
  "$211M",
  "BFSI",
  "Cybersecurity Commercialisation",
  "Capex Optimization",
  "Amity Business School",
];
