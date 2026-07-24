// app/kigali-airport-car-rental/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import KigaliAirportCarRentalClient from "./KigaliAirportCarRentalClient";
import HomeLinkCTA from "@/components/HomeLinkCTA";

export const metadata: Metadata = {
  title: "Kigali Airport Car Rental | KGL Meet & Greet Pickup",
  description:
    "Rent a car at Kigali International Airport (KGL) with free meet & greet pickup. Your vehicle ready when you land, 24/7 airport service. Book now.",
  alternates: {
    canonical: "/kigali-airport-car-rental",
  },
  openGraph: {
    title: "Kigali Airport Car Rental | KGL Meet & Greet Pickup",
    description:
      "Rent a car at Kigali International Airport (KGL) with free meet & greet pickup. Your vehicle ready when you land, 24/7 airport service. Book now.",
    url: "/kigali-airport-car-rental",
    type: "website",
  },
};

export default async function KigaliAirportCarRentalPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return (
    <>
      <KigaliAirportCarRentalClient initialCars={initialCars} />
      <HomeLinkCTA before="Need more than an airport transfer? Explore the full" after="fleet and services." />
    </>
  );
}
