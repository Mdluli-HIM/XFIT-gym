import { ImageResponse } from "next/og";

import { BrandMark, loadBrandFonts } from "@/lib/brand-image";

// Favicon (48px is what Google Search shows) + Android / PWA icons, generated at build time from the XFIT mark.
export function generateImageMetadata() {
  return [32, 48, 192, 512].map(px => ({
    id: String(px),
    size: { width: px, height: px },
    contentType: "image/png",
  }));
}

export default async function Icon({
  id,
}: {
  id: Promise<string | number>;
}) {
  const px = Number(await id);

  return new ImageResponse(<BrandMark size={px} />, {
    width: px,
    height: px,
    fonts: await loadBrandFonts(),
  });
}
