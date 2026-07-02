/**
 * Falls back to a placeholder so absolute URLs (OG image, canonical,
 * sitemap) still resolve correctly in dev/preview. Set NEXT_PUBLIC_SITE_URL
 * to the real production domain before/at deploy — PRD open item #7.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://kapiltaneja.example.com";
