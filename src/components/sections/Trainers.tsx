"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { UserRound } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { privateLessonsNote, trainers } from "@/data/trainers";

/** Neutral silhouette shown until a real trainer photo is added. */
function TrainerSilhouette() {
  return (
    <svg
      viewBox="0 0 200 260"
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 mx-auto h-[82%] w-auto text-black/[0.13]"
      fill="currentColor"
    >
      <circle cx="100" cy="72" r="42" />
      <path d="M18 260c0-62 34-104 82-104s82 42 82 104z" />
    </svg>
  );
}

export function Trainers() {
  return (
    <section
      id="trainers"
      aria-labelledby="trainers-title"
      className="bg-[#f3f1ed] text-[#111111]"
    >
      <Container className="py-20 md:py-28 lg:py-36">
        <SectionHeader
          tone="light"
          titleId="trainers-title"
          label="Trainers"
          title={
            <>
              Train with
              <br />
              the XFIT team.
            </>
          }
          intro="Our trainers are here to help you lift right, stay consistent and keep progressing."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:mt-16 lg:grid-cols-3 lg:gap-4">
          {trainers.map((trainer, index) => (
            <motion.article
              key={trainer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                delay: index * 0.08,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col border border-black/10 bg-white"
            >
              <div className="relative aspect-[5/4] overflow-hidden bg-[#e4e1db] sm:aspect-[4/5]">
                {trainer.photo ? (
                  <Image
                    src={trainer.photo}
                    alt={`${trainer.name}, XFIT trainer`}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover object-top"
                  />
                ) : (
                  <TrainerSilhouette />
                )}

                {trainer.placeholder && (
                  <span className="absolute left-4 top-4 bg-[#111111] px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-white">
                    Photo coming soon
                  </span>
                )}
              </div>

              <div className="border-t border-black/10 p-5 md:p-6">
                <h3 className="text-[clamp(1.6rem,7vw,2.1rem)] font-black uppercase leading-[0.9] tracking-[-0.05em] md:text-[1.9rem]">
                  {trainer.name}
                </h3>

                <p className="mt-3 text-[14px] text-black/70">
                  {trainer.specialty}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 flex items-center gap-3 border-t border-black/15 pt-5 text-[15px] font-semibold text-[#111111]">
          <UserRound
            className="size-4 shrink-0 text-[#b42318]"
            aria-hidden="true"
          />
          {privateLessonsNote}
        </p>
      </Container>
    </section>
  );
}
