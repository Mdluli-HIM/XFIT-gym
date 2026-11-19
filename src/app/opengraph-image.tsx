import { ImageResponse } from "next/og";

import { company } from "@/data/company";
import { formatRand, membershipPlans } from "@/data/memberships";
import { brandColors, loadBrandFonts } from "@/lib/brand-image";

// Share image for WhatsApp, Facebook, X, etc. (1200 × 630), built at build time.
export const alt = `${company.fullName}, Nkowankowa. Extreme fitness starts here.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const prices = membershipPlans
    .map(plan => `${plan.name} ${formatRand(plan.price)}`)
    .join("  ·  ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px 64px",
          backgroundColor: brandColors.black,
          backgroundImage: `radial-gradient(circle at 78% 40%, rgba(218,43,25,0.85) 0%, rgba(140,26,17,0.6) 30%, transparent 60%), linear-gradient(120deg, #160807 0%, ${brandColors.deepRed} 45%, #8c1a11 100%)`,
          color: brandColors.white,
          fontFamily: "Geist",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            borderBottom: "2px solid rgba(255,255,255,0.18)",
            paddingBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
            <div style={{ fontSize: 64, fontWeight: 900, letterSpacing: -4, lineHeight: 0.8 }}>
              XFIT
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: 2.5,
                color: "rgba(255,255,255,0.75)",
              }}
            >
              <span>EXTREME</span>
              <span>FITNESS</span>
            </div>
          </div>

          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 3, color: "rgba(255,255,255,0.85)" }}>
            NKOWANKOWA · TZANEEN
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 116,
            fontWeight: 900,
            letterSpacing: -7,
            lineHeight: 0.84,
          }}
        >
          <span>EXTREME FITNESS</span>
          <span>STARTS HERE /</span>
        </div>

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontSize: 28, fontWeight: 700, color: "rgba(255,255,255,0.9)" }}>
            {prices}
          </div>

          <div
            style={{
              display: "flex",
              padding: "16px 28px",
              backgroundColor: brandColors.red,
              fontSize: 24,
              fontWeight: 900,
              letterSpacing: 2.5,
            }}
          >
            JOIN XFIT ↗
          </div>
        </div>
      </div>
    ),
    { ...size, fonts: await loadBrandFonts() }
  );
}
