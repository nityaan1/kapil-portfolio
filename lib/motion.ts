import type { Transition, Variants } from "framer-motion";

/** Standard reveal easing/duration — the "Linear-esque" expo-out snap (docs/design-system.md). */
export const revealTransition: Transition = {
  duration: 0.4,
  ease: [0.16, 1, 0.3, 1],
};

/** Fade + 8–16px translate-Y entrance, the default reveal for any section content. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: revealTransition },
};

/**
 * Wraps a group of fadeInUp children, staggering 60–80ms apart. The design
 * system caps entrance staggers at ~6 steps — callers should slice their
 * list to 6 items before mapping them under this container.
 */
export function staggerContainer(staggerSeconds = 0.07): Variants {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerSeconds,
        delayChildren: 0.05,
        when: "beforeChildren",
      },
    },
  };
}

/** Micro hover/focus timing for buttons, links, and card hover states. */
export const microTransition: Transition = {
  duration: 0.15,
  ease: "easeOut",
};
