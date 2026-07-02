import type { Testimonial } from "@/content/testimonials";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col border-t-2 border-accent/70 bg-card px-2 pt-6">
      <blockquote className="flex-1 font-serif text-xl italic leading-relaxed text-foreground">
        “{testimonial.quote}”
      </blockquote>
      <figcaption className="mt-6 border-t border-border pt-4">
        <p className="font-medium text-foreground">{testimonial.name}</p>
        <p className="mt-0.5 text-sm text-muted-foreground">{testimonial.title}</p>
        <p className="mt-1 font-mono text-xs text-accent">
          {testimonial.relationship} · {testimonial.date}
        </p>
      </figcaption>
    </figure>
  );
}
