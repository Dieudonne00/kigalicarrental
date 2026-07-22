import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import PradoRentalKigaliClient from "./PradoRentalKigaliClient";

export const metadata: Metadata = {
  title: "Prado Rental Kigali | Toyota Land Cruiser Prado for Safari",
  description:
    "Toyota Land Cruiser Prado rental in Kigali for safari and gorilla trekking across Rwanda. 7-seater 4x4 SUV with pop-up roofs and camping gear included.",
  alternates: {
    canonical: "/prado-rental-kigali",
  },
  openGraph: {
    title: "Prado Rental Kigali | Toyota Land Cruiser Prado for Safari",
    description:
      "Toyota Land Cruiser Prado rental for safari and national park adventures. 7-seater luxury SUV with 4x4 capability. Pop-up roofs, camping gear.",
    url: "/prado-rental-kigali",
    type: "website",
  },
};

export default async function PradoRentalKigaliPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <PradoRentalKigaliClient initialCars={initialCars} />;
}
