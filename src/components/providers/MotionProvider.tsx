"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/**
 * When the visitor has "Reduce Motion" turned on, Framer Motion skips
 * movement (slide, scale, reveal) animations and only keeps gentle
 * opacity fades. Menus that use clip-path wipes check
 * useReducedMotion() themselves.
 */
export function MotionProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}
