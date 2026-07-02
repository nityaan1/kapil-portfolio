"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";

import { profile } from "@/content/profile";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";

const reducedItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

/**
 * A quiet, typographic hero — no network canvas, no glow. A faint oversized
 * serif monogram is the one decorative flourish, positioned like a
 * watermark rather than a hero "feature," so the name and headline carry
 * the section (docs/design-system.md — editorial, not futuristic).
 */
export function Hero() {
  const reducedMotion = useReducedMotion();
  const item = reducedMotion ? reducedItem : fadeInUp;

  return (
    <Section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden py-0"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[8vw] -right-[4vw] select-none font-serif text-[32vw] italic leading-none text-foreground/[0.035]"
      >
        KT
      </span>

      <Container className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reducedMotion ? undefined : staggerContainer(0.08)}
          className="max-w-3xl"
        >
          <motion.div variants={item} className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
              {profile.currentTitle} · {profile.currentCompany}
            </p>
            <div className="h-px w-16 bg-border" />
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-8 font-serif text-6xl leading-[1.05] tracking-tight text-foreground lg:text-8xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-4 max-w-xl font-serif text-xl italic leading-snug text-muted-foreground lg:text-2xl"
          >
            {profile.headline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/85 lg:text-xl"
          >
            {profile.leadershipStatement}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-y border-border py-5"
          >
            {profile.heroProofPoints.map((point) => (
              <div key={point.label} className="flex items-baseline gap-2">
                <span className="font-mono text-2xl font-medium tabular-nums text-foreground">
                  {point.value}
                </span>
                <span className="text-sm text-muted-foreground">{point.label}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-6"
          >
            <a
              href={profile.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className={buttonVariants({ variant: "secondary" })}
            >
              <LinkedInIcon className="size-4" />
              View LinkedIn
            </a>

            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-accent"
            >
              <Mail className="size-4" />
              {profile.email}
            </a>

            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="size-4" />
              {profile.location}
            </span>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
