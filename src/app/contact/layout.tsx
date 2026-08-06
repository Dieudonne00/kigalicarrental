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

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
