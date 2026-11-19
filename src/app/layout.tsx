import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";

import { company } from "@/data/company";
import { seo } from "@/data/seo";
import { siteUrl } from "@/lib/site-url";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: seo.title,
    template: seo.titleTemplate,
  },

  description: seo.description,
  keywords: [...seo.keywords],
  applicationName: company.fullName,

  // Share image comes from app/opengraph-image.tsx and twitter-image.tsx.
  openGraph: {
    title: seo.shareTitle,
    description: seo.shareDescription,
    url: "/",
    type: "website",
    locale: "en_ZA",
    siteName: company.fullName,
  },

  twitter: {
    card: "summary_large_image",
    title: seo.shareTitle,
    description: seo.shareDescription,
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
  themeColor: seo.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={GeistSans.variable}
    >
      <body>
        <MotionProvider>
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
