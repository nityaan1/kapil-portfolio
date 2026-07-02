import { Mail } from "lucide-react";

import { profile } from "@/content/profile";
import { LinkedInIcon } from "@/components/icons/linkedin-icon";
import { Container } from "@/components/layout/container";

/**
 * A quiet closing line, not a sitemap dump — the nav already carries every
 * section link, so the footer's only job is to keep the email one scroll
 * away from wherever a reader ends up (docs/design-system.md).
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <div className="flex items-center gap-6">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-accent"
          >
            <Mail className="size-4" />
            {profile.email}
          </a>
          <a
            href={profile.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-150 hover:text-accent"
          >
            <LinkedInIcon className="size-4" />
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
