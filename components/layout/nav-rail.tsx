"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Menu, Search, X } from "lucide-react";

import { profile } from "@/content/profile";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useActiveSection } from "@/hooks/use-active-section";
import { useCommandPalette } from "@/hooks/use-command-palette";
import { microTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

interface NavSection {
  id: string;
  label: string;
}

const EMPTY_SECTIONS: NavSection[] = [];
let cachedSections: NavSection[] | null = null;

function readSectionsFromDom(): NavSection[] {
  if (cachedSections) return cachedSections;
  const nodes = Array.from(
    document.querySelectorAll<HTMLElement>("main section[id][data-nav-label]")
  );
  cachedSections = nodes.map((node) => ({
    id: node.id,
    label: node.dataset.navLabel ?? node.id,
  }));
  return cachedSections;
}

function subscribeNoop() {
  return () => {};
}

function getServerSections() {
  return EMPTY_SECTIONS;
}

/**
 * Discovers nav entries from the rendered page itself — every <Section>
 * with a `navLabel` registers via a `data-nav-label` attribute (see
 * layout/section.tsx) — rather than a hand-maintained list that drifts out
 * of sync as sections are added or removed. The section list is static
 * once mounted (it's derived from server-rendered markup, not user
 * interaction), so this reads it via useSyncExternalStore — the same
 * hydration-safe pattern as use-reduced-motion.ts — rather than a
 * setState-in-effect, which React's lint rules flag as risking cascading
 * renders.
 */
function useDiscoveredSections(): NavSection[] {
  return useSyncExternalStore(subscribeNoop, readSectionsFromDom, getServerSections);
}

/**
 * Floating top nav: a scroll-progress hairline, a brand mark, section links
 * with scroll-spy highlighting (auto-discovered from the page), and the
 * highest-intent action (Download CV) that stays one tap away at all times.
 * Direct contact is via the email address in the hero and footer, not a nav
 * button — see Hero and SiteFooter.
 */
export function NavRail() {
  const progress = useScrollProgress();
  const navSections = useDiscoveredSections();
  const activeSection = useActiveSection(navSections.map((s) => s.id));
  const { openPalette } = useCommandPalette();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    // Focus trap: keyboard users shouldn't be able to Tab past this overlay
    // into content behind it (confirmed via testing that Tab previously
    // escaped into hidden hero/timeline content). Move focus in on open,
    // cycle Tab/Shift+Tab within the panel, restore focus to the trigger
    // on close.
    const triggerNode = triggerRef.current;
    const focusable = panelRef.current
      ? Array.from(
          panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")
        )
      : [];
    focusable[0]?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (event.key === "Tab" && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    function onPointerDown(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      triggerNode?.focus();
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="h-px bg-border" aria-hidden="true">
        <div
          className="h-full origin-left bg-accent transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <nav
        aria-label="Primary"
        className="border-b border-border bg-background/90 backdrop-blur-md"
      >
        <Container full className="flex h-16 items-center justify-between gap-6">
          <a
            href="#hero"
            aria-label={`${profile.name} — back to top`}
            className="shrink-0 whitespace-nowrap font-serif text-lg italic tracking-tight text-foreground transition-colors duration-150 hover:text-accent"
          >
            Kapil Taneja
          </a>

          <div className="hidden min-w-0 items-center gap-6 lg:flex">
            <div className="flex items-center gap-4 xl:gap-5">
              {navSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={activeSection === section.id ? "true" : undefined}
                  className={cn(
                    "whitespace-nowrap text-sm transition-colors duration-150 hover:text-foreground",
                    activeSection === section.id
                      ? "text-accent"
                      : "text-muted-foreground"
                  )}
                >
                  {section.label}
                </a>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={openPalette}
                aria-label="Search the portfolio"
                className="flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:border-accent/40 hover:text-foreground"
              >
                <Search className="size-3.5" aria-hidden="true" />
                <kbd className="rounded-sm border border-border px-1 py-0.5 font-mono text-[10px]">
                  ⌘K
                </kbd>
              </button>
              <a
                href={profile.cvHref}
                download
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="flex items-center gap-1 lg:hidden" ref={menuRef}>
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label="Search the portfolio"
              onClick={openPalette}
            >
              <Search />
            </Button>
            <Button
              ref={triggerRef}
              variant="ghost"
              size="icon-sm"
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((open) => !open)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </Button>

            <AnimatePresence>
              {mobileOpen && (
                <motion.div
                  ref={panelRef}
                  id="mobile-nav-menu"
                  role="menu"
                  initial={{ opacity: 0, scale: 0.98, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98, y: -4 }}
                  transition={microTransition}
                  className="absolute right-4 top-16 flex w-56 flex-col gap-0.5 rounded-lg border border-border bg-popover p-2 shadow-card"
                >
                  {navSections.map((section) => (
                    <a
                      key={section.id}
                      role="menuitem"
                      href={`#${section.id}`}
                      aria-current={activeSection === section.id ? "true" : undefined}
                      className={cn(
                        "rounded-sm px-3 py-2 text-sm transition-colors duration-150 hover:bg-secondary",
                        activeSection === section.id
                          ? "text-accent"
                          : "text-foreground"
                      )}
                      onClick={() => setMobileOpen(false)}
                    >
                      {section.label}
                    </a>
                  ))}
                  <div className="my-1 h-px bg-border" />
                  <a
                    role="menuitem"
                    href={profile.cvHref}
                    download
                    className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-accent transition-colors duration-150 hover:bg-accent/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Download className="size-4" />
                    Download CV
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </nav>
    </header>
  );
}
