import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site-url";

// Public pages only (the member/staff demo is excluded).
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
