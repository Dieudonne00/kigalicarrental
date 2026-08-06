import { Metadata } from "next";

const SITE = "https://kigalicarrental.site";

export const metadata: Metadata = {
  title: "How It Works | Kigali Car Rental",
  description:
    "How Kigali Car Rental works — browse the fleet, confirm your booking, and we deliver the car to your hotel or Kigali Airport, free of charge.",
  keywords: "Kigali car rental",
  alternates: { canonical: `${SITE}/how-it-works` },
  openGraph: {
    title: "How It Works | Kigali Car Rental",
    description: "How Kigali Car Rental works — browse, confirm, and get your car delivered free in Kigali.",
    url: `${SITE}/how-it-works`,
    siteName: "Kigali Car Rental",
    type: "website",
    locale: "en_RW",
  },
};

export default function HowItWorksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
