import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import CityTourDriverClient from "./CityTourDriverClient";

export const metadata: Metadata = {
  title: "City Tour Driver Kigali | Local Guide & Memorial Tours",
  description:
    "Professional city tour driver service in Kigali. Visit the Genocide Memorial, Kimironko Market, Caplaki Craft Village & Inema Arts Center with local guides.",
  alternates: {
    canonical: "/city-tour-driver",
  },
  openGraph: {
    title: "City Tour Driver Kigali | Local Guide & Memorial Tours",
    description:
      "Professional local drivers for Kigali city tours. Visit Kigali Genocide Memorial, Kimironko Market, Caplaki Craft Village, Inema Arts Center.",
    url: "/city-tour-driver",
    type: "website",
  },
};

export default async function CityTourDriverPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <CityTourDriverClient initialCars={initialCars} />;
}
