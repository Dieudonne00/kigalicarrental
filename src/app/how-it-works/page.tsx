import type { Metadata } from "next";
import HowItWorksClient from "./HowItWorksClient";

export const metadata: Metadata = {
  title: "How It Works | Kigali Car Rental",
  description:
    "See how easy it is to rent a car in Kigali, Rwanda: browse the fleet, book online, pick up your vehicle, and hit the road. Requirements and FAQs inside.",
  alternates: {
    canonical: "/how-it-works",
  },
  openGraph: {
    title: "How It Works | Kigali Car Rental",
    description:
      "See how easy it is to rent a car in Kigali, Rwanda: browse the fleet, book online, pick up your vehicle, and hit the road. Requirements and FAQs inside.",
    url: "/how-it-works",
    type: "website",
  },
};

export default function HowItWorksPage() {
  return <HowItWorksClient />;
}
