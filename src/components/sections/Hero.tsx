"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { company } from "@/data/company";
import { sectionLinks } from "@/data/navigation";

const reveal = {
  hidden: {
    opacity: 0,
    y: "105%",
  },
  visible: {
    opacity: 1,
    y: "0%",
  },
};

export function Hero() {
  return (
    <section className="relative z-10 isolate min-h-[100svh] overflow-x-clip overflow-y-visible bg-[#290b09] text-white">
      {/* Original XFIT red / black hero background */}
      <div className="absolute inset-0 -z-30 bg-[#43100c]" />

      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.6,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="absolute inset-0 -z-20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_46%,rgba(218,43,25,0.75),transparent_32%),radial-gradient(circle_at_42%_100%,rgba(193,18,10,0.9),transparent_44%),linear-gradient(120deg,#160807_0%,#47120e_42%,#8c1a11_100%)]" />

        <div className="absolute -right-[22vw] top-[12%] h-[76vh] w-[72vw] rotate-[18deg] bg-gradient-to-b from-white/[0.055] to-transparent blur-3xl" />
      </motion.div>

      {/* Subtle readability layer */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/45 via-black/5 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 -z-10 h-[42%] bg-gradient-to-t from-black/35 to-transparent" />

      {/* Grain */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.15] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.65'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Large ghost X */}
      <div
        aria-hidden="true"
        className="absolute right-[-8vw] top-[19%] z-[1] select-none text-[42vw] font-black leading-none tracking-[-0.1em] text-white/[0.035] md:text-[28vw]"
      >
        X
      </div>

      {/* Transparent athlete / hero artwork.
          Visible from the first paint (no fade from 0): it's the largest
          element on screen, so waiting for JavaScript to fade it in made
          the page look slow to Lighthouse (LCP). It still eases in. */}
      <motion.div
        initial={{
          scale: 1.04,
          x: 30,
        }}
        animate={{
          scale: 1,
          x: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          pointer-events-none
          absolute
          bottom-[-4%]
          right-[-18%]
          z-[20]
          h-[58vh]
          w-[72vw]

          sm:bottom-[-6%]
          sm:right-[-8%]
          sm:h-[64vh]
          sm:w-[62vw]

          md:bottom-[-8%]
          md:right-[1%]
          md:h-[82vh]
          md:w-[50vw]

          lg:bottom-[-10%]
          lg:right-[7%]
          lg:h-[88vh]
          lg:w-[42vw]

          xl:bottom-[-12%]
          xl:right-[9%]
          xl:w-[38vw]
        "
      >
        <Image
          src="/images/hero/hero-athlete.png"
          alt=""
          fill
          loading="eager"
          fetchPriority="high"
          sizes="(max-width: 640px) 72vw, (max-width: 1024px) 50vw, 40vw"
          className="object-contain object-bottom"
        />
      </motion.div>

      <Container className="relative z-10 flex min-h-[100svh] flex-col pb-5 pt-[108px] md:pb-8 md:pt-[122px] lg:pb-9">
        {/* Top information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.25,
            duration: 0.7,
          }}
          className="flex items-start justify-between"
        >
          <p className="text-[8px] font-semibold uppercase leading-[1.35] tracking-[0.14em] text-white/60 md:text-[9px]">
            Extreme Fitness
            <br />
            Nkowankowa
          </p>

          <p className="hidden text-right text-[8px] font-semibold uppercase leading-[1.35] tracking-[0.14em] text-white/55 sm:block md:text-[9px]">
            Built for strength
            <br />
            Built for progress
          </p>
        </motion.div>

        {/* Main hero */}
        <div className="flex flex-1 flex-col justify-center py-12 md:py-16 lg:justify-end lg:pb-[12vh]">
          <div className="relative z-[4] max-w-[1100px]">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.65,
              }}
              className="mb-4 text-[9px] font-bold uppercase tracking-[0.16em] text-white/60 md:mb-6 md:text-[10px]"
            >
              XFIT / Extreme Fitness Gym
            </motion.p>

            <h1
              aria-label="Extreme Fitness Starts Here"
              className="hero-display uppercase"
            >
              {["Extreme", "Fitness", "Starts Here /"].map((line, index) => (
                <span
                  key={line}
                  className="block overflow-hidden pb-[0.04em]"
                >
                  <motion.span
                    variants={reveal}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.9,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="block"
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <div className="mt-7 flex flex-col gap-6 sm:mt-8 sm:flex-row sm:items-end sm:justify-between md:mt-10">
              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.72,
                  duration: 0.7,
                }}
                className="max-w-[280px] text-[12px] leading-[1.45] text-white/70 md:max-w-[355px] md:text-[13px]"
              >
                A place to train harder, move better and build real progress —
                right here in Nkowankowa.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.82,
                  duration: 0.7,
                }}
                className="relative z-[5] md:mr-[17%]"
              >
                <Link
                  href={sectionLinks.membership.href}
                  className="group inline-flex items-center gap-3 border-b border-white/50 pb-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors hover:border-white"
                >
                  Join XFIT

                  <ArrowUpRight
                    className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1,
            duration: 0.7,
          }}
          className="relative z-[5] flex items-end justify-between border-t border-white/15 pt-4"
        >
          <div className="text-[8px] font-semibold uppercase leading-[1.45] tracking-[0.12em] text-white/45 md:text-[9px]">
            <p>{company.hours.closes}</p>
            <p>{company.hours.placeholder}</p>
          </div>

          <Link
            href={sectionLinks.gym.href}
            aria-label="Scroll to explore XFIT"
            className="
              group
              relative
              z-[30]
              ml-auto
              flex
              translate-x-1
              items-center
              gap-2
              text-[8px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-white/60
              transition-colors
              hover:text-white
              sm:translate-x-2
              md:translate-x-4
              md:text-[9px]
              lg:translate-x-8
              xl:translate-x-10
            "
          >
            Explore

            <span className="grid size-7 place-items-center rounded-full border border-white/25 transition-colors group-hover:border-white/60">
              <ArrowDown
                className="size-3 transition-transform duration-300 group-hover:translate-y-0.5"
                strokeWidth={1.6}
              />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}
