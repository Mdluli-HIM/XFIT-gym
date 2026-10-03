export const company = {
  name: "XFIT",
  fullName: "XFIT Extreme Fitness Gym",

  description:
    "A local fitness gym in Nkowankowa focused on helping people train, improve, and become stronger.",

  contact: {
    phone: "+27679340400",
    displayPhone: "+27 67 934 0400",
  },

  address: {
    street: "B, 2946 Tambo St",
    suburb: "Nkowankowa",
    province: "Limpopo",
    postalCode: "0870",
    country: "South Africa",

    formatted: "B, 2946 Tambo St, Nkowankowa, 0870",
  },

  hours: {
    weekdays: {
      label: "Monday – Friday",
      value: "06:00 – 20:00",
    },

    saturday: {
      label: "Saturday",
      value: "07:00 – 14:00",
    },

    sunday: {
      label: "Sunday",
      value: "Closed",
    },
  },

  social: {
    instagram: "https://www.instagram.com/xfitextremefitness/",
  },

  maps: {
    directions: "https://share.google/f0ZkCOcqfIY1ggSR1",
  },
} as const;

export type Company = typeof company;
