"use client";

import { useRef } from "react";

import { timeline } from "@/content/timeline";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { SignalSpine } from "@/components/timeline/signal-spine";
import { TimelineNode } from "@/components/timeline/timeline-node";

export function CareerTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Section id="timeline">
      <Container>
        <SectionHeading
          index="02"
          title="Career Timeline"
          description="Six companies, twenty-five years — the chapters that built the operator."
        />
        <div ref={containerRef} className="relative">
          <SignalSpine containerRef={containerRef} />
          <div>
            {timeline.map((entry) => (
              <TimelineNode key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
