import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  /**
   * red:     solid XFIT red (main actions)
   * outline: thin white border, for dark backgrounds
   * dark:    thin black border, for light backgrounds
   * white:   solid white, for dark backgrounds
   */
  variant?: "red" | "outline" | "dark" | "white";
  className?: string;
  /** Open in a new tab (WhatsApp, Maps, Instagram, Google). */
  newTab?: boolean;
  /** Icon shown before the label. */
  icon?: LucideIcon;
  /** Arrow shown after the label. */
  showArrow?: boolean;
  ariaLabel?: string;
};

const styles = {
  red: "bg-[#d3131b] text-white shadow-[0_0_20px_rgba(211,19,27,0.22)] hover:bg-[#e3161f]",
  outline:
    "border border-white/25 text-white hover:border-white hover:bg-white/5",
  dark: "border border-black/25 text-[#111111] hover:border-black hover:bg-black/5",
  white: "bg-white text-black hover:bg-white/90",
};

/** Square XFIT-style action link (internal, tel:, or external). */
export function Button({
  href,
  children,
  variant = "red",
  className,
  newTab = false,
  icon: Icon,
  showArrow = false,
  ariaLabel,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 px-5 text-[11px] font-black uppercase tracking-[0.1em] transition-colors duration-300",
    styles[variant],
    className
  );

  const content = (
    <>
      {Icon && (
        <Icon
          className="size-4 shrink-0"
          strokeWidth={2}
          aria-hidden="true"
        />
      )}

      <span>{children}</span>

      {showArrow && (
        <ArrowUpRight
          className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={2}
          aria-hidden="true"
        />
      )}
    </>
  );

  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link
        href={href}
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(newTab
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {content}
    </a>
  );
}
