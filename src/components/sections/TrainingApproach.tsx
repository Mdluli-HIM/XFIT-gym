"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { trainingPrinciples } from "@/data/training";

export function TrainingApproach() {
  return (
    <section
      id="training"
      className="relative overflow-hidden bg-[#f3f1ed] text-[#111111]"
    >
      <Container className="py-20 md:py-28 lg:py-36">
        {/* Top label */}
        <div className="flex items-center justify-between border-b border-black/15 pb-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#b42318]">
            Training
          </p>

          <ArrowDownRight
            className="size-4 text-black/35"
            strokeWidth={1.5}
          />
        </div>

        {/* Main statement */}
        <div className="grid gap-10 pt-8 md:pt-12 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-end lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
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
            <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#b42318] md:text-[10px]">
              The XFIT mindset
            </p>

            <h2
              className="
                max-w-[1050px]
                text-[clamp(3.5rem,16vw,5.7rem)]
                font-black
                uppercase
                leading-[0.78]
                tracking-[-0.078em]

                md:text-[clamp(5.8rem,10vw,8rem)]
                lg:text-[clamp(7rem,8.5vw,9.5rem)]
              "
            >
              Show up.
              <br />
              Put in the work.
              <br />
              Leave stronger.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              delay: 0.15,
              duration: 0.7,
            }}
            className="lg:pb-2"
          >
            <p className="max-w-[320px] text-[13px] leading-[1.55] text-black/55 md:text-[14px]">
              XFIT is about building a routine you can keep coming back to.
              Train with purpose, challenge yourself and let the progress
              follow.
            </p>
          </motion.div>
        </div>

        {/* Training principles */}
        <div className="mt-16 border-t border-black/15 md:mt-24 lg:mt-28">
          {trainingPrinciples.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.4,
              }}
              transition={{
                delay: index * 0.07,
                duration: 0.7,
              }}
              className="
                grid
                gap-5
                border-b
                border-black/15
                py-7

                md:grid-cols-[1fr_300px]
                md:items-center
                md:gap-10
                md:py-9
              "
            >
              <h3
                className="
                  text-[clamp(2.2rem,10vw,3.8rem)]
                  font-black
                  uppercase
                  leading-[0.85]
                  tracking-[-0.06em]

                  md:text-[clamp(2.8rem,5vw,4.8rem)]
                "
              >
                {item.title}
              </h3>

              <p className="max-w-[320px] text-[12px] leading-[1.55] text-black/45 md:text-[13px]">
                {item.description}
              </p>
            </motion.article>
          ))}
        </div>

        {/* Bottom detail */}
        <div className="mt-8 flex items-end justify-between md:mt-12">
          <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-black/35">
            XFIT / Nkowankowa
          </p>

          <p className="text-right text-[8px] font-bold uppercase leading-[1.4] tracking-[0.12em] text-[#b42318]">
            Stronger every
            <br />
            session
          </p>
        </div>
      </Container>

      {/* Large decorative text */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-[0.18em]
          -right-[0.08em]
          select-none
          text-[44vw]
          font-black
          leading-none
          tracking-[-0.1em]
          text-black/[0.025]

          md:text-[28vw]
        "
      >
        FIT
      </div>
    </section>
  );
}
