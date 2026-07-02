"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Tiny cross-component open/close store for the search command palette —
 * same SSR-safe useSyncExternalStore pattern as use-reduced-motion.ts, so
 * both the NavRail trigger button and the palette itself (rendered as
 * siblings, not parent/child) can read and flip one shared boolean without
 * lifting state into a client wrapper around the whole page.
 */

let isOpen = false;
const listeners = new Set<() => void>();

function setOpen(value: boolean) {
  if (isOpen === value) return;
  isOpen = value;
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return isOpen;
}

function getServerSnapshot() {
  return false;
}

export function useCommandPalette() {
  const open = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const openPalette = useCallback(() => setOpen(true), []);
  const closePalette = useCallback(() => setOpen(false), []);
  const togglePalette = useCallback(() => setOpen(!isOpen), []);

  return { open, openPalette, closePalette, togglePalette };
}
