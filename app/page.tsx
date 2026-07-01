import { NavRail } from "@/components/layout/nav-rail";
import { HeroSignalField } from "@/components/hero/hero-signal-field";
import { ExecutiveSummary } from "@/components/summary/executive-summary";
import { CareerTimeline } from "@/components/timeline/career-timeline";
import { MetricsBoard } from "@/components/metrics/metrics-board";
import { IndustryGrid } from "@/components/industries/industry-grid";
import { SkillsConstellation } from "@/components/skills/skills-constellation";
import { ProjectCaseStudies } from "@/components/projects/project-case-studies";
import { AwardsWall } from "@/components/awards/awards-wall";
import { EducationTimeline } from "@/components/education/education-timeline";
import { TestimonialDeck } from "@/components/testimonials/testimonial-deck";
import { QueryTheNetwork } from "@/components/assistant/query-the-network";

export default function Home() {
  return (
    <>
      <NavRail />
      <main>
        <HeroSignalField />
        <ExecutiveSummary />
        <CareerTimeline />
        <MetricsBoard />
        <IndustryGrid />
        <SkillsConstellation />
        <ProjectCaseStudies />
        <AwardsWall />
        <EducationTimeline />
        <TestimonialDeck />
        <QueryTheNetwork />
      </main>
    </>
  );
}
