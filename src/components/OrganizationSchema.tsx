import { CONTACT, SITE } from "@/lib/constants";

export default function OrganizationSchema() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.URL}/#organization`,
        name: CONTACT.COMPANY_NAME,
        url: SITE.URL,
        telephone: CONTACT.PHONE,
        email: CONTACT.EMAIL,
        address: {
          "@type": "PostalAddress",
          streetAddress: "KG 541 St",
          addressLocality: "Kigali",
          addressCountry: "RW",
        },
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
