export type DayName =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type OpeningHours = {
  dayOfWeek: DayName[];
  /** 24-hour time, e.g. "06:00" */
  opens: string;
  /** 24-hour time, e.g. "20:00" */
  closes: string;
};

// International format; used for every "tel:" link on the site.
const PHONE = "+27679340400";

export const company = {
  name: "XFIT",
  fullName: "XFIT-Extreme Fitness Gym",

  description:
    "A local fitness gym in Nkowankowa focused on helping people train, improve, and become stronger.",

  contact: {
    phone: PHONE,
    displayPhone: "067 934 0400",
    // Always render the number as a real link (<a href={telHref}>), never as
    // plain text: Safari auto-links plain phone numbers before React
    // hydrates, which causes a hydration mismatch.
    telHref: `tel:${PHONE}`,
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
  // (Google: closes 8pm). When the full hours are confirmed: fill
  // `days` (e.g. { dayOfWeek: ["Monday", "Tuesday"], opens: "06:00",
  // closes: "20:00" }), set `confirmed: true`, and update the components
  // that read `hours` to list them. Google's structured data only
  // includes hours once `confirmed` is true.
  hours: {
    confirmed: false,
    closes: "Closes 8pm",
    placeholder: "Full hours: to be confirmed",
    days: [] as OpeningHours[],
  },

  payments: ["Cash", "Card (Yoco)", "EFT"],

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
