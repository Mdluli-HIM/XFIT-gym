import { company, directionsHref } from "@/data/company";
import { formatRand, membershipPlans } from "@/data/memberships";
import { siteUrl } from "@/lib/site-url";

/**
 * schema.org "ExerciseGym" structured data for Google (business name,
 * address, phone, Instagram, map, prices). Everything comes from
 * data/company.ts and data/memberships.ts. Opening hours are only
 * included once they are confirmed there.
 */
export function LocalBusinessJsonLd() {
  const prices = membershipPlans.map(plan => plan.price);
  const { hours } = company;

  const data = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "@id": `${siteUrl}/#gym`,
    name: company.fullName,
    description: company.description,
    url: `${siteUrl}/`,
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/icon/512`,
    telephone: company.contact.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.address.street,
      addressLocality: company.address.suburb,
      addressRegion: company.address.province,
      postalCode: company.address.postalCode,
      addressCountry: "ZA",
    },
    hasMap: directionsHref,
    sameAs: [company.social.instagram],
    priceRange: `${formatRand(Math.min(...prices))}–${formatRand(Math.max(...prices))}`,
    currenciesAccepted: "ZAR",
    paymentAccepted: company.payments.join(", "),
    ...(hours.confirmed && hours.days.length > 0
      ? {
          openingHoursSpecification: hours.days.map(day => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: day.dayOfWeek,
            opens: day.opens,
            closes: day.closes,
          })),
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      // JSON from our own data files; "<" escaped so it can't close the tag.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
