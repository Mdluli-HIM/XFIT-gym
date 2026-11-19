import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { siteUrl } from "@/lib/site-url";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "XFIT Extreme Fitness Gym | Nkowankowa",
    template: "%s | XFIT",
  },

  description:
    "XFIT Extreme Fitness Gym in Nkowankowa, Limpopo. Train, improve your fitness, and become stronger at your local XFIT gym.",

  keywords: [
    "XFIT",
    "XFIT Extreme Fitness Gym",
    "Gym Nkowankowa",
    "Gym in Nkowankowa",
    "Gym Tzaneen",
    "Fitness Nkowankowa",
    "Fitness Gym Limpopo",
  ],

  openGraph: {
    title: "XFIT Extreme Fitness Gym",
    description:
      "Extreme fitness training in Nkowankowa, Limpopo.",
    type: "website",
    locale: "en_ZA",
    siteName: "XFIT Extreme Fitness Gym",
  },

  robots: {
    index: true,
    follow: true,
  },

  // Stop Safari / iOS from turning phone numbers, dates ("Closes 8pm"),
  // addresses and emails into links on their own. Those automatic links
  // change the HTML before React hydrates and cause hydration errors.
  // Phone numbers are explicit tel: links instead.
  formatDetection: {
    telephone: false,
    date: false,
    address: false,
    email: false,
  },
};

// viewport-fit=cover lets fixed elements (the phone action bar)
// read the iPhone safe-area insets via env(safe-area-inset-*).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <MotionProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
