import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  /** Small label above the title, e.g. "04 / Membership". */
  label: string;
  /** Big uppercase title. */
  title: ReactNode;
  /** Optional short text beside / under the title. */
  intro?: ReactNode;
  tone?: "dark" | "light";
  /** id for the <h2>, so the section can use aria-labelledby. */
  titleId?: string;
  className?: string;
};

/** Shared heading block: red label, big uppercase XFIT title, short intro. */
export function SectionHeader({
  label,
  title,
  intro,
  tone = "dark",
  titleId,
  className,
}: SectionHeaderProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "grid gap-6 border-t pt-7 md:grid-cols-[minmax(0,1fr)_280px] md:items-end md:gap-12",
        isDark ? "border-white/10" : "border-black/15",
        className
      )}
    >
      <div>
        <p
          className={cn(
            "mb-4 text-[11px] font-bold uppercase tracking-[0.15em]",
            isDark ? "text-[#ff3b3b]" : "text-[#b42318]"
          )}
        >
          {label}
        </p>

        <h2
          id={titleId}
          className="text-[clamp(3rem,13vw,5rem)] font-black uppercase leading-[0.82] tracking-[-0.07em] md:text-[clamp(4.5rem,7.5vw,7rem)]">
          {title}
        </h2>
      </div>

      {intro && (
        <p
          className={cn(
            "max-w-[320px] text-[14px] leading-[1.55] md:pb-2",
            isDark ? "text-white/70" : "text-black/70"
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}
