import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import SelfDriveCarRentalKigaliClient from "./SelfDriveCarRentalKigaliClient";

export const metadata: Metadata = {
  title: "Self Drive Car Rental Kigali | Rent Without Driver",
  description:
    "Self drive Kigali car rental. Rent a car without a driver and explore Rwanda freely - economy cars, SUVs, and 4x4s with unlimited mileage and free delivery.",
  alternates: {
    canonical: "/self-drive-car-rental-kigali",
  },
  openGraph: {
    title: "Self Drive Car Rental Kigali | Rent Without Driver",
    description:
      "Self drive Kigali car rental. Rent a car without a driver and explore Rwanda freely - economy cars, SUVs, and 4x4s with unlimited mileage and free delivery.",
    url: "/self-drive-car-rental-kigali",
    type: "website",
  },
};

export default async function SelfDriveCarRentalKigaliPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <SelfDriveCarRentalKigaliClient initialCars={initialCars} />;
}
