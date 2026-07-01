"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { testimonials } from "@/content/testimonials";
import { cn } from "@/lib/utils";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { TestimonialCard } from "@/components/testimonials/testimonial-card";
import { Button } from "@/components/ui/button";

/**
 * A native scroll-snap carousel rather than a custom drag implementation —
 * buttery on trackpad/touch/keyboard for free, with prev/next buttons and
 * active-dot tracking layered on top (PRD: "every interaction should feel
 * premium").
 */
export function TestimonialDeck() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const node = scrollerRef.current;
    if (!node) return;

    function onScroll() {
      if (!node) return;
      const children = Array.from(node.children) as HTMLElement[];
      let closest = 0;
      let minDiff = Infinity;
      children.forEach((child, index) => {
        const diff = Math.abs(child.offsetLeft - node.scrollLeft);
        if (diff < minDiff) {
          minDiff = diff;
          closest = index;
        }
      });
      setActiveIndex(closest);
    }

    node.addEventListener("scroll", onScroll, { passive: true });
    return () => node.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToIndex(index: number) {
    const node = scrollerRef.current;
    const card = node?.children[index];
    if (card instanceof HTMLElement) {
      node?.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    }
  }

  return (
    <Section id="testimonials">
      <Container>
        <div className="flex items-end justify-between">
          <SectionHeading
            index="09"
            title="Testimonials"
            description="Five real recommendations, full attribution, nothing trimmed."
          />
          <div className="mb-16 hidden gap-2 lg:mb-24 lg:flex">
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Previous testimonial"
              disabled={activeIndex === 0}
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Next testimonial"
              disabled={activeIndex === testimonials.length - 1}
              onClick={() =>
                scrollToIndex(Math.min(testimonials.length - 1, activeIndex + 1))
              }
            >
              <ChevronRight />
            </Button>
          </div>
        </div>

        <div
          ref={scrollerRef}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:-mx-8 md:px-8 lg:-mx-12 lg:px-12"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="w-full shrink-0 snap-start sm:w-[85%] lg:w-[46%]"
            >
              <TestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              aria-label={`Go to testimonial from ${testimonial.name}`}
              onClick={() => scrollToIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                index === activeIndex ? "w-6 bg-signal" : "w-1.5 bg-border"
              )}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
