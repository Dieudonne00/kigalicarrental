// app/safari-car-rental-rwanda/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
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

export default async function SafariCarRentalRwandaPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <SafariCarRentalRwandaClient initialCars={initialCars} />;
}
