import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import ChauffeurServiceRwandaClient from "./ChauffeurServiceRwandaClient";

export const metadata: Metadata = {
  title: "Chauffeur Service Rwanda | Professional Driver Hire",
  description:
    "Premium chauffeur service across Rwanda. Professional English-speaking drivers for airport transfers, corporate travel, weddings, city tours, and safaris.",
  alternates: {
    canonical: "/chauffeur-service-rwanda",
  },
  openGraph: {
    title: "Chauffeur Service Rwanda | Professional Driver Hire",
    description:
      "Premium chauffeur service across Rwanda. Professional English-speaking drivers for airport transfers, corporate travel, weddings, city tours, and safaris.",
    url: "/chauffeur-service-rwanda",
    type: "website",
  },
};

export default async function ChauffeurServiceRwandaPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <ChauffeurServiceRwandaClient initialCars={initialCars} />;
}
