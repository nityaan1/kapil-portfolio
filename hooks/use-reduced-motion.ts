"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mediaQueryList = window.matchMedia(QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * SSR-safe prefers-reduced-motion detection via useSyncExternalStore.
 * Framer Motion's own useReducedMotion reads matchMedia synchronously
 * during the client's first render, which can't match the server's
 * render (no `window` there) and was causing a hydration mismatch — this
 * hook's getServerSnapshot always returns false, matching SSR exactly,
 * then updates on a normal post-hydration render. Every consumer in the
 * app reads from this one hook (docs/design-system.md animation table).
 */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
