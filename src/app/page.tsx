import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/sections/Hero";
import { GymExperience } from "@/components/sections/GymExperience";
import { TrainingApproach } from "@/components/sections/TrainingApproach";
import { WorkoutOptions } from "@/components/sections/WorkoutOptions";
import { MobileActionBar } from "@/components/layout/MobileActionBar";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />

      {/* Upcoming sections */}
      <GymExperience />

      <TrainingApproach />

      <WorkoutOptions />

      <section
        id="membership"
        className="min-h-screen bg-[#111111]"
        aria-label="Membership"
      />

      <section
        id="about"
        className="min-h-screen bg-white"
        aria-label="About XFIT"
      />

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
