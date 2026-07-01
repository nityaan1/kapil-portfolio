import { Quote } from "lucide-react";

import type { Testimonial } from "@/content/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-8 shadow-card transition-colors duration-150 hover:border-signal/25">
      <Quote className="size-6 text-signal/50" aria-hidden="true" />
      <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-foreground">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <p className="font-medium text-foreground">{testimonial.name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{testimonial.title}</p>
        <p className="mt-1 font-mono text-xs text-signal">
          {testimonial.relationship} · {testimonial.date}
        </p>
      </figcaption>
    </figure>
  );
}
