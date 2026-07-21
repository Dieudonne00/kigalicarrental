import { CONTACT, SITE } from "@/lib/constants";

export default function OrganizationSchema() {
  // Sitewide, static facts only - no DB calls here. This renders from the
  // root layout on every page, so anything data-dependent (real price range,
  // real aggregateRating) lives on the homepage's own schema block instead,
  // sharing this same @id so Google still treats it as one entity. Putting
  // a live Prisma query here would risk forcing the whole site out of
  // static generation, not just the homepage.
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "AutoRental"],
        "@id": `${SITE.URL}/#organization`,
        name: CONTACT.COMPANY_NAME,
        url: SITE.URL,
        telephone: CONTACT.PHONE,
        email: CONTACT.EMAIL,
        currenciesAccepted: "USD",
        logo: {
          "@type": "ImageObject",
          url: `${SITE.URL}/logo.svg`,
          caption: CONTACT.COMPANY_NAME,
        },
        image: {
          "@type": "ImageObject",
          url: `${SITE.URL}/opengraph-image`,
          width: 1200,
          height: 630,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "KG 541 St",
          addressLocality: "Kigali",
          addressCountry: "RW",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: -1.9441,
          longitude: 30.0619,
        },
        openingHoursSpecification: {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          opens: "00:00",
          closes: "23:59",
        },
        potentialAction: {
          "@type": "ReserveAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE.URL}/book-now`,
            actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
          },
          result: { "@type": "Reservation", name: "Car Rental Reservation" },
        },
        sameAs: ["https://share.google/YeNXsgPb1RAncDYvA"],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.URL}/#website`,
        url: SITE.URL,
        name: SITE.NAME,
        publisher: { "@id": `${SITE.URL}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
