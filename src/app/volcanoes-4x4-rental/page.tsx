import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
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

export default async function Volcanoes4x4RentalPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <Volcanoes4x4RentalClient initialCars={initialCars} />;
}
