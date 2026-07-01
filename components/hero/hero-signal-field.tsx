"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

import { profile } from "@/content/profile";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { fadeInUp, revealTransition, staggerContainer } from "@/lib/motion";
import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { SignalCanvas } from "@/components/hero/signal-canvas";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const reducedItem = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
};

export function HeroSignalField() {
  const reducedMotion = useReducedMotion();
  const item = reducedMotion ? reducedItem : fadeInUp;

  return (
    <Section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden py-0"
    >
      <SignalCanvas />

      {/* Anchors the network graphic to the type instead of leaving it as
          disconnected ambient decoration (design critique item #3). */}
      <div
        className="absolute left-[8%] top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-signal/[0.07] blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/55 to-background"
        aria-hidden="true"
      />

      <Container full className="relative">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={reducedMotion ? undefined : staggerContainer(0.08)}
          className="max-w-3xl"
        >
          <motion.div variants={item} className="flex flex-col gap-2">
            <p className="font-mono text-sm text-signal">
              {profile.currentTitle} · {profile.currentCompany}
            </p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ ...revealTransition, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="h-px w-16 bg-signal/60"
            />
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-6xl font-semibold tracking-tighter text-foreground lg:text-7xl"
          >
            {profile.name}
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-2xl leading-snug text-foreground lg:text-3xl"
          >
            {profile.leadershipStatement}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-wrap items-center gap-2"
          >
            {profile.heroProofPoints.map((point) => (
              <Badge key={point.label} className="h-auto px-3 py-1.5">
                <span className="text-foreground">{point.value}</span>
                <span className="ml-1.5 font-sans text-muted-foreground">
                  {point.label}
                </span>
              </Badge>
            ))}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-6"
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
