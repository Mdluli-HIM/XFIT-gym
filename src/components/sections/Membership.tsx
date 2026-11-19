"use client";

import { motion } from "framer-motion";
import { MessageCircle, Wallet } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  formatRand,
  joinMessage,
  membershipPlans,
  paymentNote,
} from "@/data/memberships";
import { whatsappHref } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function Membership() {
  return (
    <section
      id="membership"
      aria-labelledby="membership-title"
      className="relative overflow-hidden bg-[#111111] text-white"
    >
      {/* Red glow, same family as the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[20%] bottom-[-14rem] h-[30rem] w-[30rem] rounded-full bg-red-700/[0.12] blur-[120px] md:h-[42rem] md:w-[42rem]"
      />

      <Container className="relative py-20 md:py-28 lg:py-36">
        <SectionHeader
          titleId="membership-title"
          label="04 / Membership"
          title={
            <>
              Pick your plan.
              <br />
              Start today.
            </>
          }
          intro="Simple prices. Tap a plan to message us on WhatsApp and we'll get you started."
        />

        <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3 lg:gap-4">
          {membershipPlans.map((plan, index) => {
            const featured = Boolean(plan.highlight);

            return (
              <motion.article
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  delay: index * 0.08,
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  "relative flex flex-col border p-6 md:p-7",
                  featured
                    ? "border-[#d3131b] bg-[#1a0b0a] shadow-[0_0_40px_rgba(211,19,27,0.18)]"
                    : "border-white/12 bg-[#161616]"
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-[clamp(2rem,9vw,2.6rem)] font-black uppercase leading-[0.85] tracking-[-0.06em] md:text-[clamp(1.9rem,3vw,2.6rem)]">
                    {plan.name}
                  </h3>

                  {plan.highlight && (
                    <span className="shrink-0 bg-[#d3131b] px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-white">
                      {plan.highlight}
                    </span>
                  )}
                </div>

                <p className="mt-10 flex items-end gap-2">
                  <span className="text-[clamp(4rem,18vw,5.5rem)] font-black leading-[0.8] tracking-[-0.07em] md:text-[clamp(3.6rem,6vw,5.5rem)]">
                    {formatRand(plan.price)}
                  </span>
                  <span className="pb-1 text-[12px] font-bold uppercase tracking-[0.1em] text-white/60">
                    / {plan.period}
                  </span>
                </p>

                <p className="mt-6 max-w-[300px] flex-1 text-[14px] leading-[1.55] text-white/70">
                  {plan.description}
                </p>

                <Button
                  href={whatsappHref(joinMessage(plan))}
                  newTab
                  variant={featured ? "red" : "outline"}
                  icon={MessageCircle}
                  showArrow
                  className="mt-8 w-full justify-between"
                  ariaLabel={`Join the ${plan.name} plan (${formatRand(plan.price)}) on WhatsApp`}
                >
                  Join on WhatsApp
                </Button>
              </motion.article>
            );
          })}
        </div>

        <p className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5 text-[14px] text-white/75">
          <Wallet
            className="size-4 shrink-0 text-[#ff3b3b]"
            aria-hidden="true"
          />
          {paymentNote}
        </p>
      </Container>
    </section>
  );
}
