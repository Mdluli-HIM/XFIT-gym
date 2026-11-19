import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

import { company } from "@/data/company";
import { sectionLinks } from "@/data/navigation";

/**
 * Always-visible "Join XFIT" + "Call" bar for phones and tablets.
 * Hidden on desktop (lg+), where the header shows the Join button.
 *
 * Place it as the LAST element of the page: it renders a spacer in
 * the normal page flow so the fixed bar never covers the end of the
 * page (including a future footer), and it pads for the iPhone
 * home-indicator safe area.
 */
export function MobileActionBar() {
  return (
    <>
      {/* Spacer: same height as the bar, so nothing ends up hidden under it */}
      <div
        aria-hidden="true"
        className="h-[calc(4.5rem+1px+env(safe-area-inset-bottom))] lg:hidden"
      />

      <nav
        aria-label="Quick actions"
        className="
          fixed
          inset-x-0
          bottom-0
          z-40
          border-t
          border-white/10
          bg-[#090909]/95
          pb-[env(safe-area-inset-bottom)]
          pl-[max(0.75rem,env(safe-area-inset-left))]
          pr-[max(0.75rem,env(safe-area-inset-right))]
          backdrop-blur-md
          lg:hidden
        "
      >
        <div className="mx-auto grid h-[4.5rem] max-w-xl grid-cols-[1.4fr_1fr] items-center gap-2">
          <Link
            href={sectionLinks.membership.href}
            className="
              flex
              h-12
              items-center
              justify-center
              gap-2
              bg-[#d3131b]
              text-xs
              font-black
              uppercase
              tracking-[0.1em]
              text-white
              shadow-[0_0_20px_rgba(211,19,27,0.28)]
              transition-colors
              active:bg-[#b01016]
            "
          >
            Join XFIT
            <ArrowUpRight
              className="size-4"
              strokeWidth={2.1}
              aria-hidden="true"
            />
          </Link>

          <a
            href={company.contact.telHref}
            aria-label={`Call XFIT on ${company.contact.displayPhone}`}
            className="
              flex
              h-12
              items-center
              justify-center
              gap-2
              border
              border-white/25
              text-xs
              font-black
              uppercase
              tracking-[0.1em]
              text-white
              transition-colors
              active:bg-white/10
            "
          >
            <Phone
              className="size-4"
              strokeWidth={2}
              aria-hidden="true"
            />
            Call
          </a>
        </div>
      </nav>
    </>
  );
}
