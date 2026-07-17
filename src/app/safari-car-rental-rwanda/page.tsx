// app/safari-car-rental-rwanda/page.tsx
import type { Metadata } from "next";
import SafariCarRentalRwandaClient from "./SafariCarRentalRwandaClient";

export const metadata: Metadata = {
  title: "Safari Car Rental Rwanda | Land Cruiser Game Drive Vehicles",
  description:
    "Safari car rental in Rwanda for Akagera, Volcanoes and Nyungwe parks. Land Cruiser with pop-up roof, game viewing seats. Gorilla trekking and Big Five safari vehicles.",
  alternates: {
    canonical: "/safari-car-rental-rwanda",
  },
  openGraph: {
    title: "Safari Car Rental Rwanda | Land Cruiser Game Drive Vehicles",
    description:
      "Safari car rental in Rwanda for Akagera, Volcanoes and Nyungwe parks. Land Cruiser with pop-up roof, game viewing seats. Gorilla trekking and Big Five safari vehicles.",
    url: "/safari-car-rental-rwanda",
    type: "website",
  },
};

export default function SafariCarRentalRwandaPage() {
  return <SafariCarRentalRwandaClient />;
}
