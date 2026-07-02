"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "kt-recent-searches";
const MAX_RECENT = 5;

function readStoredRecent(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    // Corrupt value or storage unavailable (private browsing) — start empty.
    return [];
  }
}

/**
 * Recent search terms, persisted client-side only (localStorage) — no
 * server, no account, no external API. Read via a lazy useState initializer
 * (not an effect) — safe here because this data is only ever rendered
 * inside the command palette's dialog, which is always closed until a user
 * interaction happens well after hydration, so there's no hydration-mismatch
 * window to worry about.
 */
export function useRecentSearches() {
  const [recent, setRecent] = useState<string[]>(readStoredRecent);

  const addRecent = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setRecent((prev) => {
      const next = [
        trimmed,
        ...prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase()),
      ].slice(0, MAX_RECENT);
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Storage unavailable — recent searches just won't persist this session.
      }
      return next;
    });
  }, []);

  const clearRecent = useCallback(() => {
    setRecent([]);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // no-op
    }
  }, []);

  return { recent, addRecent, clearRecent };
}
