import { NavRail } from "@/components/layout/nav-rail";
import { Hero } from "@/components/hero/hero";
import { ExecutiveSummary } from "@/components/summary/executive-summary";
import { CareerTimeline } from "@/components/timeline/career-timeline";
import { LeadershipMetrics } from "@/components/metrics/leadership-metrics";
import { IndustryGrid } from "@/components/industries/industry-grid";
import { AreasOfExpertise } from "@/components/skills/areas-of-expertise";
import { ProjectCaseStudies } from "@/components/projects/project-case-studies";
import { EducationTimeline } from "@/components/education/education-timeline";
import { TestimonialDeck } from "@/components/testimonials/testimonial-deck";
import { SiteFooter } from "@/components/layout/site-footer";
import { CommandPalette } from "@/components/search/command-palette-loader";
import { profile } from "@/content/profile";
import { education } from "@/content/education";
import { SITE_URL } from "@/lib/site";

/**
 * Person structured data — every field traces to content/profile.ts and
 * content/education.ts, the same verified source the visible page renders
 * from, so the JSON-LD can never assert a fact the page itself doesn't.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.currentTitle,
  description: profile.headline,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  worksFor: {
    "@type": "Organization",
    name: profile.currentCompany,
  },
  alumniOf: education.map((entry) => ({
    "@type": "CollegeOrUniversity",
    name: entry.institution,
  })),
  sameAs: [profile.linkedinUrl],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        // Safe: personJsonLd is built entirely from typed local content
        // modules, not user input — see comment above.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:border focus:border-accent focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:text-foreground"
      >
        Skip to main content
      </a>
      <NavRail />
      <CommandPalette />
      <main id="main">
        <Hero />
        <ExecutiveSummary />
        <CareerTimeline />
        <LeadershipMetrics />
        <IndustryGrid />
        <AreasOfExpertise />
        <ProjectCaseStudies />
        <EducationTimeline />
        <TestimonialDeck />
      </main>
      <SiteFooter />
    </>
  );
}
