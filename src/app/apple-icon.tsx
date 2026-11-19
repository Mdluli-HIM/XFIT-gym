import { ImageResponse } from "next/og";

import { BrandMark, loadBrandFonts } from "@/lib/brand-image";

// iPhone / iPad home-screen icon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  return new ImageResponse(<BrandMark size={180} />, {
    ...size,
    fonts: await loadBrandFonts(),
  });
}
