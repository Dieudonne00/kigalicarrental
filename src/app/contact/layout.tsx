import { Metadata } from "next";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "Contact Us | Kigali Car Rental",
  description:
    "Contact Kigali Car Rental — call, WhatsApp, or email us. Based in Kigali, Rwanda, available 24/7 for bookings and support.",
  keywords: "Kigali car rental",
  alternates: { canonical: `${SITE}/contact` },
  openGraph: {
    title: "Contact Us | Kigali Car Rental",
    description: "Contact Kigali Car Rental — call, WhatsApp, or email. Based in Kigali, Rwanda, available 24/7.",
    url: `${SITE}/contact`,
    siteName: "Kigali Car Rental",
    type: "website",
    locale: "en_RW",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE}/contact` },
  ],
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
