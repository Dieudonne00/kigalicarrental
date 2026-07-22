// app/car-hire-rwanda/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import CarHireRwandaClient from "./CarHireRwandaClient";

export const metadata: Metadata = {
  title: "Car Hire Rwanda | Nationwide Vehicle Rental Fleet",
  description:
    "Hire a car anywhere in Rwanda from Kigali. Wide fleet of SUVs, 4x4s, sedans, and minibuses with free delivery and 24/7 support. Book your Rwanda car hire today.",
  alternates: {
    canonical: "/car-hire-rwanda",
  },
  openGraph: {
    title: "Car Hire Rwanda | Nationwide Vehicle Rental Fleet",
    description:
      "Hire a car anywhere in Rwanda from Kigali. Wide fleet of SUVs, 4x4s, sedans, and minibuses with free delivery and 24/7 support. Book your Rwanda car hire today.",
    url: "/car-hire-rwanda",
    type: "website",
  },
};

export default async function CarHireRwandaPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <CarHireRwandaClient initialCars={initialCars} />;
}
