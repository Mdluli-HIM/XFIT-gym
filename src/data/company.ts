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

  // TO CONFIRM WITH OWNER: is the WhatsApp number the same as the phone
  // number? If not, change `number` (international format, no + or spaces).
  whatsapp: {
    number: "27679340400",
    toConfirm: true,
    defaultMessage: "Hi XFIT, I have a question",
  },

  social: {
    instagram: "https://www.instagram.com/xfitextremefitness/",
    instagramHandle: "@xfitextremefitness",
  },

  google: {
    // Google Business listing (temporary share link, used for "Review us").
    listing: "https://share.google/Bvk9XxXl6c0n6XHPK",
  },

  maps: {
    // Search text used for directions and the map. TO CHECK: the pin
    // lands on the gym (adjust the text if Google picks the wrong spot).
    query: "XFIT-Extreme Fitness Gym, B, 2946 Tambo St, Nkowankowa, 0870",
  },
} as const;

/** Google Maps directions to the gym (opens the Maps app on phones). */
export const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  company.maps.query
)}`;

/** Google Maps embed (no API key). Only loaded when the visitor taps "Show map". */
export const mapEmbedSrc = `https://www.google.com/maps?q=${encodeURIComponent(
  company.maps.query
)}&output=embed`;

export type Company = typeof company;
