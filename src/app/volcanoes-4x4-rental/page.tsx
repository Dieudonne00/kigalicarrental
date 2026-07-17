import type { Metadata } from "next";
import Volcanoes4x4RentalClient from "./Volcanoes4x4RentalClient";

export const metadata: Metadata = {
  title: "Volcanoes 4x4 Rental | Gorilla Trekking Vehicles Rwanda",
  description:
    "Specialized 4x4 rental in Kigali for gorilla trekking in Volcanoes National Park. Land Cruiser & Prado with high clearance for steep, muddy mountain roads.",
  alternates: {
    canonical: "/volcanoes-4x4-rental",
  },
  openGraph: {
    title: "Volcanoes 4x4 Rental | Gorilla Trekking Vehicles Rwanda",
    description:
      "Specialized 4x4 vehicles for gorilla trekking in Volcanoes National Park. Toyota Land Cruiser, Prado with high clearance, low-range gearing.",
    url: "/volcanoes-4x4-rental",
    type: "website",
  },
};

export default function Volcanoes4x4RentalPage() {
  return <Volcanoes4x4RentalClient />;
}
