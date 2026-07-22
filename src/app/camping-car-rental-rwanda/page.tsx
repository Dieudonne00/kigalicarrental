import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import CampingCarRentalRwandaClient from "./CampingCarRentalRwandaClient";

export const metadata: Metadata = {
  title: "Camping Car Rental Rwanda | Motorhomes & Campervans",
  description:
    "Kigali car rental for camping trips - fully equipped motorhomes and campervans with kitchen, toilet, shower and fridge, sleeping 2-6. Perfect for Akagera, Lake Kivu and cross-border safaris.",
  alternates: {
    canonical: "/camping-car-rental-rwanda",
  },
  openGraph: {
    title: "Camping Car Rental Rwanda | Motorhomes & Campervans",
    description:
      "Self-contained campervans and motorhomes for safari adventures. Complete kitchen, toilet, shower, fridge. Sleep 2-6 persons.",
    url: "/camping-car-rental-rwanda",
    type: "website",
  },
};

export default async function CampingCarRentalRwandaPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <CampingCarRentalRwandaClient initialCars={initialCars} />;
}
