import type { MetadataRoute } from "next";

import { company } from "@/data/company";
import { seo } from "@/data/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.fullName,
    short_name: company.name,
    description: seo.description,
    start_url: "/",
    display: "browser",
    background_color: seo.themeColor,
    theme_color: seo.themeColor,
    icons: [
      { src: "/icon/192", sizes: "192x192", type: "image/png" },
      { src: "/icon/512", sizes: "512x512", type: "image/png" },
    ],
  };
}
