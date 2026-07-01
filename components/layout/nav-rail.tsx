"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Mail, Menu, X } from "lucide-react";

import { profile } from "@/content/profile";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { useActiveSection } from "@/hooks/use-active-section";
import { microTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/container";

const NAV_SECTIONS = [
  { id: "summary", label: "Summary" },
  { id: "timeline", label: "Timeline" },
  { id: "metrics", label: "Metrics" },
  { id: "assistant", label: "Ask AI" },
];

/**
 * Floating top nav: a scroll-progress hairline, a brand mark, section links
 * with scroll-spy highlighting, and the two highest-intent actions
 * (Download CV / Contact) that stay one tap away at all times (PRD §6).
 */
export function NavRail() {
  const progress = useScrollProgress();
  const activeSection = useActiveSection(NAV_SECTIONS.map((s) => s.id));
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileOpen(false);
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
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="h-[2px] bg-signal/20"
        aria-hidden="true"
      >
        <div
          className="h-full origin-left bg-signal transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <nav
        aria-label="Primary"
        className="border-b border-border bg-background/70 backdrop-blur-md"
      >
        <Container className="flex h-16 items-center justify-between">
          <a
            href="#hero"
            aria-label={`${profile.name} — back to top`}
            className="flex size-8 items-center justify-center rounded-sm border border-signal/30 font-mono text-xs font-medium text-signal transition-colors duration-150 hover:border-signal hover:bg-signal/10"
          >
            KT
          </a>

          <div className="hidden items-center gap-8 md:flex">
            <div className="flex items-center gap-6">
              {NAV_SECTIONS.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "text-sm transition-colors duration-150 hover:text-foreground",
                    activeSection === section.id
                      ? "text-signal"
                      : "text-muted-foreground"
                  )}
                >
                  {section.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <a
                href={profile.cvHref}
                download
                className={buttonVariants({ variant: "secondary", size: "sm" })}
              >
                Download CV
              </a>
              <a
                href={`mailto:${profile.email}`}
                className={buttonVariants({ variant: "default", size: "sm" })}
              >
                Contact
              </a>
            </div>
          </div>

          <div className="md:hidden" ref={menuRef}>
            <Button
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
                  id="mobile-nav-menu"
                  role="menu"
                  initial={{ opacity: 0, scale: 0.96, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96, y: -4 }}
                  transition={microTransition}
                  className="absolute right-4 top-16 flex w-48 flex-col gap-1 rounded-xl border border-border bg-card p-2 shadow-card"
                >
                  {NAV_SECTIONS.map((section) => (
                    <a
                      key={section.id}
                      role="menuitem"
                      href={`#${section.id}`}
                      className={cn(
                        "rounded-sm px-3 py-2 text-sm transition-colors duration-150 hover:bg-secondary",
                        activeSection === section.id
                          ? "text-signal"
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
                    className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-foreground transition-colors duration-150 hover:bg-secondary"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Download className="size-4" />
                    Download CV
                  </a>
                  <a
                    role="menuitem"
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-2 rounded-sm px-3 py-2 text-sm text-signal transition-colors duration-150 hover:bg-signal/10"
                    onClick={() => setMobileOpen(false)}
                  >
                    <Mail className="size-4" />
                    Contact
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
