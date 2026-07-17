import type { Metadata } from "next";
import FleetClient from "./FleetClient";

export const metadata: Metadata = {
  title: "Our Fleet | Kigali Car Rental",
  description:
    "Browse our full fleet of rental cars in Kigali, Rwanda. Filter by category, transmission, seats, and price to find the perfect sedan, SUV, or 4x4 for your trip.",
  alternates: {
    canonical: "/fleet",
  },
  openGraph: {
    title: "Our Fleet | Kigali Car Rental",
    description:
      "Browse our full fleet of rental cars in Kigali, Rwanda. Filter by category, transmission, seats, and price to find the perfect sedan, SUV, or 4x4 for your trip.",
    url: "/fleet",
    type: "website",
  },
};

export default function FleetPage() {
  return <FleetClient />;
}
