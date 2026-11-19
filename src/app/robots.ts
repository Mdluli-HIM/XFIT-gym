import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Member / staff demo pages are not for search engines.
      disallow: ["/member/", "/admin/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
