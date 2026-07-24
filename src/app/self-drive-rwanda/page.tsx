import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import SelfDriveRwandaClient from "./SelfDriveRwandaClient";
import HomeLinkCTA from "@/components/HomeLinkCTA";

export const metadata: Metadata = {
  title: "Self Drive Car Rental Rwanda | No Chauffeur Needed",
  description:
    "Rent a self-drive car in Rwanda with unlimited mileage, free GPS, and 24/7 roadside support. Explore Kigali, Volcanoes NP, Akagera, and Lake Kivu at your own pace.",
  alternates: {
    canonical: "/self-drive-rwanda",
  },
  openGraph: {
    title: "Self Drive Car Rental Rwanda | No Chauffeur Needed",
    description:
      "Rent a self-drive car in Rwanda with unlimited mileage, free GPS, and 24/7 roadside support. Explore Kigali, Volcanoes NP, Akagera, and Lake Kivu at your own pace.",
    url: "/self-drive-rwanda",
    type: "website",
  },
};

export default async function SelfDriveRwandaPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return (
    <>
      <SelfDriveRwandaClient initialCars={initialCars} />
      <HomeLinkCTA before="Prefer a driver instead? Head to" after="to explore all rental options." />
    </>
  );
}
