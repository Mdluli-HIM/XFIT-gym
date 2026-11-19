export const company = {
  name: "XFIT",
  fullName: "XFIT Extreme Fitness Gym",

  description:
    "A local fitness gym in Nkowankowa focused on helping people train, improve, and become stronger.",

  contact: {
    phone: "+27679340400",
    displayPhone: "067 934 0400",
    telHref: "tel:0679340400",
  },

  address: {
    street: "B, 2946 Tambo St",
    suburb: "Nkowankowa",
    province: "Limpopo",
    postalCode: "0870",
    country: "South Africa",

    formatted: "B, 2946 Tambo St, Nkowankowa, 0870",
  },

  // ONE place for opening hours. Only the closing time is confirmed
  // (Google: closes 8pm). When the full hours are confirmed, set
  // `confirmed: true` and fill `days`, and update the components that
  // read `hours` to list them.
  hours: {
    confirmed: false,
    closes: "Closes 8pm",
    placeholder: "Full hours: to be confirmed",
    days: [] as { label: string; value: string }[],
  },

  social: {
    instagram: "https://www.instagram.com/xfitextremefitness/",
  },

  maps: {
    directions: "https://share.google/f0ZkCOcqfIY1ggSR1",
  },
} as const;

export type Company = typeof company;
