import type { Metadata } from "next";
import LandCruiserRentalRwandaClient from "./LandCruiserRentalRwandaClient";

export const metadata: Metadata = {
  title: "Land Cruiser Rental Rwanda | Prado, V8 & 300 Series",
  description:
    "Toyota Land Cruiser rental in Kigali, Rwanda for safari, gorilla trekking and off-road adventures. Prado, V8, 300 & 200 Series with pop-up roofs, camping gear and snorkel. Perfect for Akagera, Volcanoes & Nyungwe.",
  alternates: {
    canonical: "/land-cruiser-rental-rwanda",
  },
  openGraph: {
    title: "Land Cruiser Rental Rwanda | Prado, V8 & 300 Series",
    description:
      "Toyota Land Cruiser rental for safari and off-road adventures. Pop-up roofs, camping gear, snorkel equipped. Perfect for national parks.",
    url: "/land-cruiser-rental-rwanda",
    type: "website",
  },
};

export default function LandCruiserRentalRwandaPage() {
  return <LandCruiserRentalRwandaClient />;
}
