import type { Metadata } from "next";
import RooftopTentCarRentalRwandaClient from "./RooftopTentCarRentalRwandaClient";

export const metadata: Metadata = {
  title: "Rooftop Tent Car Rental Rwanda | 4x4 Camping Vehicles",
  description:
    "Rooftop tent car rental in Kigali, Rwanda. Toyota Land Cruiser, Hilux and Land Rover with roof tents, awnings, fridges and solar panels. Perfect for Akagera, Lake Kivu and cross-border camping safaris.",
  alternates: {
    canonical: "/rooftop-tent-car-rental-rwanda",
  },
  openGraph: {
    title: "Rooftop Tent Car Rental Rwanda | 4x4 Camping Vehicles",
    description:
      "Complete overland camping vehicles with roof tents for safari adventures. Land Cruiser, Hilux with awnings, fridges, solar panels.",
    url: "/rooftop-tent-car-rental-rwanda",
    type: "website",
  },
};

export default function RooftopTentCarRentalRwandaPage() {
  return <RooftopTentCarRentalRwandaClient />;
}
