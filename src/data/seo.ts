import { company } from "@/data/company";
import { formatRand, membershipPlans } from "@/data/memberships";

/**
 * Search / sharing text (Google, WhatsApp, Facebook, X).
 * Prices are read from data/memberships.ts so they never go stale.
 */
const prices = membershipPlans
  .map(plan => `${plan.name} ${formatRand(plan.price)}`)
  .join(", ");

export const seo = {
  title: `${company.name} Extreme Fitness Gym | Nkowankowa, Tzaneen`,
  titleTemplate: `%s | ${company.name} Extreme Fitness Gym`,
  description: `${company.fullName} in Nkowankowa near Tzaneen, Limpopo. Strength, cardio, functional and conditioning training for beginners and experienced lifters. ${prices}.`,
  shareTitle: `${company.fullName}, Nkowankowa`,
  shareDescription: `Train hard in Nkowankowa near Tzaneen. ${prices}. Pay cash, card (Yoco) or EFT.`,
  keywords: [
    "XFIT",
    "XFIT Extreme Fitness Gym",
    "gym Nkowankowa",
    "gym Tzaneen",
    "fitness Nkowankowa",
    "gym Limpopo",
    "day pass gym Tzaneen",
  ],
  themeColor: "#0a0a0a",
} as const;
