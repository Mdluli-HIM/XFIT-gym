import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  showArrow?: boolean;
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external = false,
  showArrow = false,
}: ButtonProps) {
  const styles = {
    primary:
      "bg-white text-black hover:bg-white/90",
    secondary:
      "border border-white/20 bg-white/5 text-white hover:bg-white/10",
    ghost:
      "bg-transparent text-white hover:bg-white/5",
  };

  const classes = cn(
    "group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-medium transition-all duration-300",
    styles[variant],
    className
  );

  const content = (
    <>
      <span>{children}</span>

      {showArrow && (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          strokeWidth={1.8}
        />
      )}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
