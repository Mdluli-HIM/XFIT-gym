import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${company.fullName} handles your information on this website.`,
  alternates: { canonical: "/privacy" },
};

// TO REVIEW WITH OWNER: plain-English notice, not legal advice.
// Update `lastUpdated` whenever the text changes, and before the real
// member system (database on a South African server) goes live.
const lastUpdated = "19 November 2026";

function Block({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="border-t border-white/10 py-8">
      <h2 className="text-[clamp(1.6rem,6vw,2.2rem)] font-black uppercase leading-[0.95] tracking-[-0.045em]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-[16px] leading-[1.65] text-white/85 [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_ul]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <main className="bg-[#111111] text-white">
        <Container className="pb-16 pt-[120px] md:pb-24 md:pt-[150px]">
          <div className="max-w-[760px]">
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#ff3b3b]">
              Privacy notice
            </p>

            <h1 className="mt-4 text-[clamp(3.2rem,14vw,6rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]">
              Your privacy
              <br />
              at XFIT.
            </h1>

            <p className="mb-8 mt-6 text-[16px] leading-[1.65] text-white/85">
              This notice explains, in plain English, what happens to your
              information when you use this website. Last updated:{" "}
              {lastUpdated}.
            </p>

            <Block title="Who we are">
              <p>
                {company.fullName} is the &quot;responsible party&quot; for
                this website under South Africa&apos;s Protection of Personal
                Information Act (POPIA).
              </p>
              <p>
                {company.address.formatted}
                <br />
                Phone:{" "}
                <a href={company.contact.telHref}>
                  {company.contact.displayPhone}
                </a>
                <br />
                Instagram:{" "}
                <a
                  href={company.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {company.social.instagramHandle}
                </a>
              </p>
            </Block>

            <Block title="The short version">
              <ul>
                <li>You don&apos;t need an account to use this website.</li>
                <li>We don&apos;t use advertising or tracking cookies.</li>
                <li>
                  The contact form doesn&apos;t store anything. It only opens
                  WhatsApp with your message filled in.
                </li>
                <li>We never sell your information.</li>
              </ul>
            </Block>

            <Block title="Contact form, WhatsApp and calls">
              <p>
                When you use the contact form or a &quot;Join&quot; or
                &quot;WhatsApp&quot; button, your browser opens WhatsApp with
                a ready message. Nothing is sent to us until you press send in
                WhatsApp yourself, and this website doesn&apos;t keep a copy.
              </p>
              <p>
                If you send the message, or phone us, we receive your name,
                number and message. We use them only to reply to you and help
                you join or visit. WhatsApp is run by Meta, and its own privacy
                policy applies to messages sent through it. You can ask us to
                delete your messages at any time.
              </p>
            </Block>

            <Block title="Maps and other websites">
              <p>
                The Google Map in the Contact section only loads when you tap
                &quot;Show map&quot;. After that, Google may collect
                information (such as your IP address) under Google&apos;s
                privacy policy. Links to Google Maps, our Google listing and
                Instagram take you to those services, and their privacy
                policies apply there.
              </p>
            </Block>

            <Block title="Website hosting">
              <p>
                This website is hosted by Vercel. Like most websites, its
                servers may automatically record basic technical details, such
                as your IP address, browser type and the pages you visit, to
                keep the site running and secure. These servers may be outside
                South Africa. We don&apos;t use these records to identify you.
              </p>
            </Block>

            <Block title="Member login (demo)">
              <p>
                The member login, digital gym card and reception scanner are
                currently a <strong>demo</strong> using made-up sample members.
                Please don&apos;t enter real personal information.
              </p>
              <ul>
                <li>
                  Logging in to the demo saves a small &quot;logged in&quot;
                  marker in your own browser (local storage). It never leaves
                  your device, and logging out removes it.
                </li>
                <li>
                  The demo scanner uses the camera on the device it runs on to
                  read the QR code. The camera picture is processed on that
                  device only and is not saved or sent anywhere.
                </li>
              </ul>
              <p>
                Before the real member system launches, we&apos;ll update this
                notice to explain exactly what member information is kept,
                where (on a server in South Africa), for how long and why.
              </p>
            </Block>

            <Block title="Your rights">
              <p>
                Under POPIA you can ask us what personal information we hold
                about you, and ask us to correct or delete it. You can also
                object to us using it. To do any of this, contact us using the
                details above.
              </p>
              <p>
                If you&apos;re unhappy with how we handle your information, you
                can complain to the Information Regulator (South Africa):{" "}
                <a
                  href="https://inforegulator.org.za"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  inforegulator.org.za
                </a>
                .
              </p>
            </Block>

            <div className="border-t border-white/10 pt-8">
              <Link
                href="/"
                className="inline-flex min-h-12 items-center border border-white/25 px-5 text-[11px] font-black uppercase tracking-[0.1em] transition-colors hover:border-white hover:bg-white/5"
              >
                ← Back to the website
              </Link>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
