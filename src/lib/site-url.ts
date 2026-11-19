/**
 * The ONE setting for the website's public address (used for SEO
 * metadata, and later for sitemap / social share links).
 *
 * Order:
 *  1. NEXT_PUBLIC_SITE_URL: set this in Vercel when the real domain
 *     is ready, e.g. https://www.example.co.za
 *  2. Vercel's production URL (VERCEL_PROJECT_PRODUCTION_URL)
 *  3. This deployment's Vercel URL (VERCEL_URL), e.g. previews
 *  4. http://localhost:3000 for local development
 *
 * We do NOT own xfit.co.za, so it must not be used.
 */
function resolveSiteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ??
    process.env.VERCEL_URL;

  if (vercelHost) {
    return `https://${vercelHost}`;
  }

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();
