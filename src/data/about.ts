import { cheapestPlan, formatRand } from "@/data/memberships";

/**
 * ABOUT SECTION COPY: OWNER CAN EDIT.
 * Keep it honest: no invented history, years or member numbers.
 * The price line is worked out from data/memberships.ts automatically.
 */
export const about = {
  label: "About XFIT",
  title: ["Become your", "best self."],
  intro:
    "XFIT-Extreme Fitness Gym is a local gym in Nkowankowa for anyone ready to put in the work.",
  body: "Whether you're picking up your first dumbbell or you've been lifting for years, XFIT is a place to train hard, stay consistent and keep getting stronger.",
  trainingLabel: "Train for",
  trainingTypes: ["Strength", "Cardio", "Functional", "Conditioning"],
  facts: [
    {
      title: "For everyone",
      text: "Beginners and experienced lifters",
    },
    {
      title: "Affordable",
      text: `From ${formatRand(cheapestPlan.price)} a ${cheapestPlan.period}`,
    },
    {
      title: "Local",
      text: "Right here in Nkowankowa",
    },
  ],
};
