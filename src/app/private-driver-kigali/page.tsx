import type { Metadata } from "next";
import PrivateDriverKigaliClient from "./PrivateDriverKigaliClient";

export const metadata: Metadata = {
  title: "Private Driver Kigali | Personal Chauffeur Hire Rwanda",
  description:
    "Book a private personal driver in Kigali. Executive-class chauffeur service, professional and punctual, for airport transfers, business travel, and city tours across Rwanda.",
  alternates: {
    canonical: "/private-driver-kigali",
  },
  openGraph: {
    title: "Private Driver Kigali | Personal Chauffeur Hire Rwanda",
    description:
      "Book a private personal driver in Kigali. Executive-class chauffeur service, professional and punctual, for airport transfers, business travel, and city tours across Rwanda.",
    url: "/private-driver-kigali",
    type: "website",
  },
};

export default function PrivateDriverKigaliPage() {
  return <PrivateDriverKigaliClient />;
}
