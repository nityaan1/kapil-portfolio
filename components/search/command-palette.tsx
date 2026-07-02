"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Clock, CornerDownLeft, Search, Sparkles } from "lucide-react";

import { useCommandPalette } from "@/hooks/use-command-palette";
import { useRecentSearches } from "@/hooks/use-recent-searches";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";
import {
  searchPortfolio,
  SUGGESTED_SEARCHES,
  type SearchResult,
} from "@/lib/search-index";
import { HighlightedText } from "@/components/search/highlighted-text";

type PaletteRow =
  | { type: "result"; key: string; result: SearchResult }
  | { type: "query"; key: string; label: string; source: "recent" | "suggested" };

const FLASH_DURATION_MS = 900;

/**
 * Executive Search — a free, zero-API, client-side command palette over the
 * verified portfolio content (lib/search-index.ts). Replaces the AI
 * assistant: same "jump straight to the fact" job, none of the inference
 * risk, none of the server dependency.
 */
export function CommandPalette() {
  const { open, openPalette, closePalette } = useCommandPalette();
  const { recent, addRecent } = useRecentSearches();
  const reducedMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => searchPortfolio(query), [query]);
  const isEmptyQuery = query.trim().length === 0;

  const rows: PaletteRow[] = useMemo(() => {
    if (!isEmptyQuery) {
      return results.map((result) => ({
        type: "result" as const,
        key: result.item.id,
        result,
      }));
    }
    return [
      ...recent.map((label) => ({
        type: "query" as const,
        key: `recent-${label}`,
        label,
        source: "recent" as const,
      })),
      ...SUGGESTED_SEARCHES.map((label) => ({
        type: "query" as const,
        key: `suggested-${label}`,
        label,
        source: "suggested" as const,
      })),
    ];
  }, [isEmptyQuery, results, recent]);

  // Global Cmd/Ctrl+K shortcut opens the palette from anywhere on the site.
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        openPalette();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openPalette]);

  // Reset transient state during render (React's documented pattern for
  // "adjust state when a value changes") rather than in an effect, so there's
  // no extra render pass. Imperative DOM focus stays in an effect below,
  // since that's an external-system side effect, not a state update.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQuery("");
      setActiveIndex(0);
    }
  }

  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    setActiveIndex(0);
  }

  // Reliably focus the input on open, regardless of whatever the dialog
  // primitive focuses by default.
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(id);
  }, [open]);

  function navigateToSection(sectionId: string) {
    const target = document.getElementById(sectionId);
    if (!target) return;
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    target.classList.add("search-flash");
    window.setTimeout(() => target.classList.remove("search-flash"), FLASH_DURATION_MS);
  }

  function selectResult(result: SearchResult) {
    addRecent(query.trim() || result.item.title);
    closePalette();
    navigateToSection(result.item.sectionId);
  }

  function runQuery(label: string) {
    setQuery(label);
    inputRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, Math.max(rows.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const row = rows[activeIndex];
      if (!row) return;
      if (row.type === "query") runQuery(row.label);
      else selectResult(row.result);
    }
  }

  const activeRowId = rows[activeIndex]?.key;

  return (
    <DialogPrimitive.Root
      open={open}
      onOpenChange={(next) => (next ? openPalette() : closePalette())}
    >
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
        <DialogPrimitive.Popup
          aria-label="Executive search"
          className="fixed inset-4 z-50 mx-auto flex max-h-[32rem] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card outline-none data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 sm:inset-x-0 sm:top-[12vh] sm:bottom-auto sm:mx-auto sm:w-full sm:max-w-2xl"
        >
          <div className="flex items-center gap-3 border-b border-border px-4 py-3">
            <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
            <input
              ref={inputRef}
              role="combobox"
              aria-expanded={rows.length > 0}
              aria-controls="executive-search-listbox"
              aria-activedescendant={activeRowId ? `search-row-${activeRowId}` : undefined}
              autoComplete="off"
              spellCheck={false}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search the career, metrics, expertise, industries..."
              aria-label="Search the portfolio"
              className="flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <kbd className="hidden shrink-0 rounded-sm border border-border px-1.5 py-0.5 font-mono text-xs text-muted-foreground sm:inline">
              esc
            </kbd>
          </div>

          <div
            id="executive-search-listbox"
            role="listbox"
            aria-label={isEmptyQuery ? "Recent and suggested searches" : "Search results"}
            className="flex-1 overflow-y-auto p-2"
          >
            {!isEmptyQuery && results.length === 0 && (
              <div className="flex flex-col items-center gap-3 px-6 py-12 text-center">
                <Search className="size-6 text-muted-foreground" aria-hidden="true" />
                <p className="text-sm text-foreground">No results for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-muted-foreground">
                  Try a company, a metric, a skill, or an industry.
                </p>
              </div>
            )}

            {isEmptyQuery && recent.length > 0 && (
              <p className="px-3 pb-1 pt-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Recent
              </p>
            )}
            {isEmptyQuery &&
              recent.map((label) => {
                const index = rows.findIndex((r) => r.key === `recent-${label}`);
                return (
                  <PaletteQueryRow
                    key={`recent-${label}`}
                    id={`search-row-recent-${label}`}
                    icon={<Clock className="size-4" aria-hidden="true" />}
                    label={label}
                    active={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => runQuery(label)}
                  />
                );
              })}

            {isEmptyQuery && (
              <p className="px-3 pb-1 pt-3 font-mono text-xs uppercase tracking-wide text-muted-foreground">
                Suggested
              </p>
            )}
            {isEmptyQuery &&
              SUGGESTED_SEARCHES.map((label) => {
                const index = rows.findIndex((r) => r.key === `suggested-${label}`);
                return (
                  <PaletteQueryRow
                    key={`suggested-${label}`}
                    id={`search-row-suggested-${label}`}
                    icon={<Sparkles className="size-4" aria-hidden="true" />}
                    label={label}
                    active={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => runQuery(label)}
                  />
                );
              })}

            {!isEmptyQuery &&
              results.map((result, index) => (
                <button
                  key={result.item.id}
                  id={`search-row-${result.item.id}`}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => selectResult(result)}
                  className={cn(
                    "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors duration-100",
                    index === activeIndex ? "bg-accent/10" : "hover:bg-secondary"
                  )}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-foreground">
                      <HighlightedText text={result.item.title} ranges={result.titleRanges} />
                    </span>
                    {result.item.subtitle && (
                      <span className="block truncate text-xs text-muted-foreground">
                        {result.item.subtitle}
                      </span>
                    )}
                  </span>
                  <span className="shrink-0 rounded-sm border border-border px-1.5 py-0.5 font-mono text-[10px] text-accent">
                    {result.item.category}
                  </span>
                </button>
              ))}
          </div>

          <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="rounded-sm border border-border px-1 py-0.5 font-mono text-[10px]">↑</kbd>
                <kbd className="rounded-sm border border-border px-1 py-0.5 font-mono text-[10px]">↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <CornerDownLeft className="size-3" aria-hidden="true" />
                select
              </span>
            </span>
            <span className="hidden sm:inline">Searches only what&rsquo;s on this page</span>
          </div>
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function PaletteQueryRow({
  id,
  icon,
  label,
  active,
  onMouseEnter,
  onClick,
}: {
  id: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onMouseEnter: () => void;
  onClick: () => void;
}) {
  return (
    <button
      id={id}
      type="button"
      role="option"
      aria-selected={active}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors duration-100",
        active ? "bg-accent/10 text-foreground" : "text-muted-foreground hover:bg-secondary"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
