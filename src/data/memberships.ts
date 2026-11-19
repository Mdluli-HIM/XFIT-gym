/**
 * Membership plans and prices. EDIT HERE to change prices or wording;
 * the Membership section and the About copy read from this file.
 */
export type MembershipPlan = {
  id: "monthly" | "weekly" | "day";
  name: string;
  price: number;
  period: string;
  description: string;
  highlight?: string;
};

export const membershipPlans: MembershipPlan[] = [
  {
    id: "monthly",
    name: "Monthly",
    price: 300,
    period: "month",
    description: "Train all month. The best way to build a routine.",
    highlight: "Best value",
  },
  {
    id: "weekly",
    name: "Weekly",
    price: 150,
    period: "week",
    description: "A full week of training at XFIT.",
  },
  {
    id: "day",
    name: "Day pass",
    price: 30,
    period: "day",
    description: "One day. Come in, train hard, see what XFIT is about.",
  },
];

export const paymentNote =
  "Pay at reception: cash, card (Yoco) or EFT.";

export function formatRand(amount: number) {
  return `R${amount}`;
}

/** Ready-made WhatsApp message for a plan's "Join" button. */
export function joinMessage(plan: MembershipPlan) {
  return `Hi XFIT, I'd like to join on the ${plan.name} plan (${formatRand(plan.price)})`;
}

/** Cheapest way in, e.g. "R30 a day" (used in the About copy). */
export const cheapestPlan = membershipPlans.reduce((lowest, plan) =>
  plan.price < lowest.price ? plan : lowest
);
