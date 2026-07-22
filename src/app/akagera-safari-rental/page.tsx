// app/akagera-safari-rental/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import AkageraSafariRentalClient from "./AkageraSafariRentalClient";

export const metadata: Metadata = {
  title: "Akagera Safari Rental | 4x4 Vehicles for Game Drives",
  description:
    "Rent 4x4 safari vehicles for Akagera National Park, Rwanda. Land Cruiser with pop-up roof, game viewing seats. Self-drive or guided Big Five safaris available.",
  alternates: {
    canonical: "/akagera-safari-rental",
  },
  openGraph: {
    title: "Akagera Safari Rental | 4x4 Vehicles for Game Drives",
    description:
      "Rent 4x4 safari vehicles for Akagera National Park, Rwanda. Land Cruiser with pop-up roof, game viewing seats. Self-drive or guided Big Five safaris available.",
    url: "/akagera-safari-rental",
    type: "website",
  },
};

export default async function AkageraSafariRentalPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <AkageraSafariRentalClient initialCars={initialCars} />;
}
