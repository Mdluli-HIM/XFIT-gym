import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { GymExperience } from "@/components/sections/GymExperience";
import { TrainingApproach } from "@/components/sections/TrainingApproach";
import { WorkoutOptions } from "@/components/sections/WorkoutOptions";
import { Trainers } from "@/components/sections/Trainers";
import { Membership } from "@/components/sections/Membership";
import { About } from "@/components/sections/About";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />

      <GymExperience />

      <TrainingApproach />

      <WorkoutOptions />

      <Trainers />

      <Membership />

      <About />

      <section
        id="contact"
        className="min-h-screen bg-[#111111]"
        aria-label="Contact XFIT"
      />

      {/* Keep last: sticky Join / Call bar on phones */}
      <MobileActionBar />
    </main>
  );
}
