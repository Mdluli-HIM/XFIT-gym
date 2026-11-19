import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared pieces for generated images (share image, favicon, app icons),
 * so they all use the same XFIT look: red/black, Geist Black type.
 * Runs at build time only.
 */
export const brandColors = {
  black: "#0a0a0a",
  deepRed: "#43100c",
  red: "#d3131b",
  white: "#f5f5f5",
} as const;

const fontDir = join(
  process.cwd(),
  "node_modules/geist/dist/fonts/geist-sans"
);

export async function loadBrandFonts() {
  const [black, bold] = await Promise.all([
    readFile(join(fontDir, "Geist-Black.ttf")),
    readFile(join(fontDir, "Geist-Bold.ttf")),
  ]);

  return [
    { name: "Geist", data: black, weight: 900 as const, style: "normal" as const },
    { name: "Geist", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

/** Square XFIT mark used for favicons and app icons. */
export function BrandMark({ size }: { size: number }) {
  const showWordmark = size >= 120;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: brandColors.black,
        backgroundImage: `radial-gradient(circle at 75% 20%, ${brandColors.red} 0%, ${brandColors.deepRed} 45%, ${brandColors.black} 85%)`,
        color: brandColors.white,
        fontFamily: "Geist",
        fontWeight: 900,
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: showWordmark ? size * 0.34 : size * 0.86,
          letterSpacing: showWordmark ? -size * 0.024 : -size * 0.02,
          lineHeight: 1,
          marginTop: showWordmark ? 0 : -size * 0.06,
        }}
      >
        {showWordmark ? "XFIT" : "X"}
      </div>

      {showWordmark && (
        <div
          style={{
            display: "flex",
            width: size * 0.5,
            height: Math.max(3, size * 0.03),
            marginTop: size * 0.05,
            backgroundColor: brandColors.red,
          }}
        />
      )}
    </div>
  );
}
