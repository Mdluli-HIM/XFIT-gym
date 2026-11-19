import type { Metadata } from "next";

import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { GymExperience } from "@/components/sections/GymExperience";
import { TrainingApproach } from "@/components/sections/TrainingApproach";
import { WorkoutOptions } from "@/components/sections/WorkoutOptions";
import { Trainers } from "@/components/sections/Trainers";
import { Membership } from "@/components/sections/Membership";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <Hero />

        <GymExperience />

        <TrainingApproach />

        <WorkoutOptions />

        <Trainers />

        <Membership />

        <About />

        <Contact />
      </main>

      <Footer />

      {/* Keep last: sticky Join / Call bar on phones */}
      <MobileActionBar />
    </>
  );
}
