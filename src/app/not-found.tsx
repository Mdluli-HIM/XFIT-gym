import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { sectionLinks } from "@/data/navigation";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <>
      <Header />

      <main className="relative isolate overflow-hidden bg-[#290b09] text-white">
        {/* Same red / black treatment as the home page hero */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_74%_46%,rgba(218,43,25,0.7),transparent_34%),linear-gradient(120deg,#160807_0%,#47120e_45%,#8c1a11_100%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-[0.08em] top-[12%] -z-10 select-none text-[48vw] font-black leading-none tracking-[-0.1em] text-white/[0.04] md:text-[30vw]"
        >
          X
        </div>

        <Container className="flex min-h-[100svh] flex-col justify-center pb-16 pt-[120px]">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/80">
            Page not found
          </p>

          <h1 className="mt-5 text-[clamp(4rem,19vw,10rem)] font-black uppercase leading-[0.78] tracking-[-0.08em]">
            Wrong
            <br />
            turn.
          </h1>

          <p className="mt-8 max-w-[420px] text-[16px] leading-[1.6] text-white/85">
            This page doesn&apos;t exist or has moved. Let&apos;s get you back
            to training.
          </p>

          <div className="mt-10 flex flex-col gap-2 sm:flex-row">
            <Button href="/" icon={ArrowLeft}>
              Back home
            </Button>
            <Button href={sectionLinks.membership.href} variant="outline">
              Membership
            </Button>
            <Button href={sectionLinks.contact.href} variant="outline">
              Contact
            </Button>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}
