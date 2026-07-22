import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import NyungweForestSafariClient from "./NyungweForestSafariClient";

export const metadata: Metadata = {
  title: "Nyungwe Forest Safari | Chimpanzee Tracking & Canopy Walk Vehicles",
  description:
    "Rent safari vehicles for Nyungwe Forest National Park, Rwanda. Toyota Land Cruiser & Prado for chimpanzee tracking, canopy walk, bird watching. 5-hour drive from Kigali. Book today.",
  alternates: {
    canonical: "/nyungwe-forest-safari",
  },
  openGraph: {
    title: "Nyungwe Forest Safari | Chimpanzee Tracking & Canopy Walk Vehicles",
    description:
      "Rent vehicles for chimpanzee tracking and canopy walk in Nyungwe National Park. Toyota Land Cruiser with high clearance for forest terrain.",
    url: "/nyungwe-forest-safari",
    type: "website",
    images: ["https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200"],
  },
};

export default async function NyungweForestSafariPage() {
  const cars = await prisma.car.findMany({ where: { available: true }, orderBy: { createdAt: "desc" } });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));
  return <NyungweForestSafariClient initialCars={initialCars} />;
}
