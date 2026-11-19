"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";

type SmoothScrollProviderProps = {
  children: ReactNode;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  useEffect(() => {
    const query = window.matchMedia(REDUCED_MOTION_QUERY);

    let lenis: Lenis | null = null;
    let frameId = 0;

    const raf = (time: number) => {
      lenis?.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    const start = () => {
      if (lenis) return;

      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
      });

      frameId = requestAnimationFrame(raf);
    };

    const stop = () => {
      cancelAnimationFrame(frameId);
      lenis?.destroy();
      lenis = null;
    };

    // "Reduce Motion" on: use normal browser scrolling, no smooth scroll.
    const sync = () => (query.matches ? stop() : start());

    sync();
    query.addEventListener("change", sync);

    return () => {
      query.removeEventListener("change", sync);
      stop();
    };
  }, []);

  return children;
}
