"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";
import { about } from "@/data/about";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative isolate overflow-hidden bg-[#43100c] text-white"
    >
      {/* XFIT red / black background, same family as the hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_20%,rgba(218,43,25,0.55),transparent_40%),linear-gradient(120deg,#160807_0%,#47120e_50%,#7a170f_100%)]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[0.2em] -right-[0.06em] -z-10 select-none text-[52vw] font-black leading-none tracking-[-0.1em] text-white/[0.04] md:text-[30vw]"
      >
        X
      </div>

      <Container className="py-20 md:py-28 lg:py-36">
        <div className="border-t border-white/15 pt-7">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-white/80">
            {about.label}
          </p>

          <motion.h2
            id="about-title"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(3.4rem,15vw,5.6rem)] font-black uppercase leading-[0.8] tracking-[-0.075em] md:text-[clamp(5.5rem,10vw,9rem)]"
          >
            {about.title[0]}
            <br />
            {about.title[1]}
          </motion.h2>
        </div>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="max-w-[520px]">
            <p className="text-[18px] font-semibold leading-[1.45] md:text-[21px]">
              {about.intro}
            </p>

            <p className="mt-5 text-[15px] leading-[1.6] text-white/80">
              {about.body}
            </p>
          </div>

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-white/80">
              {about.trainingLabel}
            </p>

            <ul className="mt-4 border-t border-white/15">
              {about.trainingTypes.map(type => (
                <li
                  key={type}
                  className="border-b border-white/15 py-3 text-[clamp(2rem,9vw,3rem)] font-black uppercase leading-[0.9] tracking-[-0.06em]"
                >
                  {type}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <dl className="mt-14 grid gap-3 sm:grid-cols-3 md:mt-20">
          {about.facts.map(fact => (
            <div
              key={fact.title}
              className="border border-white/15 bg-black/20 p-5"
            >
              <dt className="text-[11px] font-bold uppercase tracking-[0.13em] text-white/75">
                {fact.title}
              </dt>
              <dd className="mt-3 text-[clamp(1.4rem,6vw,1.8rem)] font-black uppercase leading-[0.95] tracking-[-0.045em] md:text-[1.6rem]">
                {fact.text}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
