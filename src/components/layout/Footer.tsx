import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { company, directionsHref } from "@/data/company";
import {
  footerLinks,
  memberLoginLink,
  privacyLink,
} from "@/data/navigation";
import { whatsappHref } from "@/lib/whatsapp";

// Server component: the year is worked out on the server only (never
// re-rendered in the browser), so it can't cause a hydration mismatch.
const copyrightYear = new Date().getFullYear();

const headingClasses =
  "text-[11px] font-bold uppercase tracking-[0.14em] text-[#ff3b3b]";

const linkClasses =
  "text-[15px] text-white/85 underline-offset-4 transition-colors hover:text-white hover:underline";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#090909] text-white">
      <Container className="pb-8 pt-16 md:pt-20">
        {/* Wordmark */}
        <Link
          href="/"
          aria-label="XFIT home"
          className="inline-flex items-end gap-3"
        >
          <span className="text-[clamp(4.5rem,24vw,9rem)] font-black leading-[0.8] tracking-[-0.08em]">
            XFIT
          </span>
          <span className="pb-2 text-[11px] font-semibold uppercase leading-[1.25] tracking-[0.13em] text-white/70">
            Extreme
            <br />
            Fitness
          </span>
        </Link>

        <div className="mt-12 grid gap-10 border-t border-white/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <nav aria-label="Footer">
            <p className={headingClasses}>Explore</p>
            <ul className="mt-4 space-y-2.5">
              {footerLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClasses}>
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href={memberLoginLink.href}
                  className={linkClasses}
                >
                  {memberLoginLink.label}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className={headingClasses}>Visit</p>
            <address className="mt-4 text-[15px] not-italic leading-[1.6] text-white/85">
              {company.address.street}
              <br />
              {company.address.suburb}, {company.address.postalCode}
              <br />
              {company.address.province}
            </address>
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClasses} mt-3 inline-block`}
            >
              Get directions ↗
            </a>
          </div>

          <div>
            <p className={headingClasses}>Contact</p>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={company.contact.telHref}
                  className={linkClasses}
                >
                  {company.contact.displayPhone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  WhatsApp ↗
                </a>
              </li>
              <li>
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClasses}
                >
                  Instagram {company.social.instagramHandle} ↗
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className={headingClasses}>Hours</p>
            <p className="mt-4 text-[15px] font-semibold text-white/90">
              {company.hours.closes}
            </p>
            {!company.hours.confirmed && (
              <p className="mt-1.5 text-[14px] text-white/70">
                {company.hours.placeholder}
              </p>
            )}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-[13px] text-white/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {copyrightYear} {company.fullName}
          </p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link
              href={privacyLink.href}
              className="underline-offset-4 hover:text-white hover:underline"
            >
              {privacyLink.label}
            </Link>
            <Link
              href={memberLoginLink.href}
              className="underline-offset-4 hover:text-white hover:underline"
            >
              {memberLoginLink.label}
            </Link>
            <span>Built by Marcus</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
