import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import DriverCarHireKigaliClient from "./DriverCarHireKigaliClient";

export const metadata: Metadata = {
  title: "Driver Car Hire Kigali | Professional Chauffeur Rwanda",
  description:
    "Driver car hire in Kigali with professional English & French-speaking chauffeurs. Airport transfers, city tours, safari drives, and business travel in Rwanda.",
  alternates: {
    canonical: "/driver-car-hire-kigali",
  },
  openGraph: {
    title: "Driver Car Hire Kigali | Professional Chauffeur Rwanda",
    description:
      "Driver car hire in Kigali with professional English & French-speaking chauffeurs. Airport transfers, city tours, safari drives, and business travel in Rwanda.",
    url: "/driver-car-hire-kigali",
    type: "website",
  },
};

export default async function DriverCarHireKigaliPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <DriverCarHireKigaliClient initialCars={initialCars} />;
}
