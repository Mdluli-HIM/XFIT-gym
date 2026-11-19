"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { gymHighlights } from "@/data/gym";

export function GymExperience() {
  return (
    <section
      id="gym"
      className="relative z-0 overflow-hidden bg-[#111111] text-white"
    >
      {/* Subtle continuation of the hero */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-15%] top-[-12rem] h-[28rem] w-[28rem] rounded-full bg-red-700/[0.07] blur-[120px] md:h-[40rem] md:w-[40rem]"
      />

      <Container className="relative z-10 pb-20 pt-44 md:pb-28 md:pt-56 lg:pb-36 lg:pt-64">
        {/* Heading */}
        <div className="grid gap-6 border-t border-white/10 pt-7 md:grid-cols-[minmax(0,1fr)_230px] md:items-end md:gap-12 lg:grid-cols-[minmax(0,850px)_260px]">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.3,
            }}
            transition={{
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.15em] text-red-500 md:text-[10px]">
              The gym
            </p>

            <h2
              className="
                max-w-[850px]
                text-[clamp(3.1rem,14vw,5.1rem)]
                font-black
                uppercase
                leading-[0.82]
                tracking-[-0.075em]

                md:text-[clamp(4.8rem,8.3vw,7rem)]
                lg:text-[clamp(5.5rem,7vw,8.2rem)]
              "
            >
              Built for real work —
              <br />
              from first rep to last.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.5,
            }}
            transition={{
              delay: 0.12,
              duration: 0.7,
            }}
            className="max-w-[290px] text-[10px] uppercase leading-[1.45] tracking-[0.08em] text-white/40 md:pb-2"
          >
            A local training space in Nkowankowa built around consistency,
            effort and progress.
          </motion.p>
        </div>

        {/* Mobile swipe cue */}
        <div className="mt-12 flex items-center justify-between border-b border-white/10 pb-3 md:hidden">
          <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/35">
            Explore XFIT
          </span>

          <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/35">
            Swipe →
          </span>
        </div>

        {/* Cards */}
        <div
          className="
            hide-scrollbar
            -mx-5
            mt-5
            flex
            snap-x
            snap-mandatory
            gap-2
            overflow-x-auto
            px-5
            pb-2

            md:mx-0
            md:mt-14
            md:grid
            md:grid-cols-3
            md:gap-3
            md:overflow-visible
            md:px-0

            lg:mt-16
            lg:gap-4
          "
        >
          {gymHighlights.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{
                opacity: 0,
                y: 35,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                delay: index * 0.09,
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                group
                relative
                h-[430px]
                min-w-[82vw]
                snap-center
                overflow-hidden
                bg-[#191919]

                sm:min-w-[64vw]

                md:h-[440px]
                md:min-w-0

                lg:h-[520px]
              "
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                sizes="(max-width: 639px) 82vw, (max-width: 767px) 64vw, 33vw"
                className="
                  object-cover
                  transition-transform
                  duration-[900ms]
                  ease-out
                  group-hover:scale-[1.035]
                "
              />

              {/* Image treatment */}
              <div className="absolute inset-0 bg-black/15" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10" />

              {/* Card title */}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 lg:p-7">
                <div className="border-t border-white/30 pt-4">
                  <h3
                    className="
                      text-[clamp(2.2rem,11vw,3.5rem)]
                      font-black
                      uppercase
                      leading-[0.82]
                      tracking-[-0.06em]

                      md:text-[clamp(2.1rem,3.3vw,3.4rem)]
                    "
                  >
                    {item.title}
                  </h3>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom detail */}
        <div className="mt-10 flex items-end justify-between border-t border-white/10 pt-4 md:mt-14">
          <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-red-500">
            Nkowankowa / Limpopo
          </p>

          <p className="max-w-[160px] text-right text-[8px] uppercase leading-[1.4] tracking-[0.1em] text-white/30 md:max-w-[230px]">
            Train with purpose.
            <br />
            Build your progress.
          </p>
        </div>
      </Container>
    </section>
  );
}
