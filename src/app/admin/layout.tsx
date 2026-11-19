import type { Metadata } from "next";
import type { ReactNode } from "react";

// Demo portal: keep it out of search results.
export const metadata: Metadata = {
  title: "Staff area",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
