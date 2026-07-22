// app/business-driver-service/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import BusinessDriverServiceClient from "./BusinessDriverServiceClient";

export const metadata: Metadata = {
  title: "Business Driver Service Kigali | Executive Chauffeur Rwanda",
  description:
    "Professional business driver service in Kigali. Executive chauffeurs for meetings, airport transfers and conferences. Luxury cars, WiFi, flight tracking included.",
  alternates: {
    canonical: "/business-driver-service",
  },
  openGraph: {
    title: "Business Driver Service Kigali | Executive Chauffeur Rwanda",
    description:
      "Professional business driver service in Kigali. Executive chauffeurs for meetings, airport transfers and conferences. Luxury cars, WiFi, flight tracking included.",
    url: "/business-driver-service",
    type: "website",
  },
};

export default async function BusinessDriverServicePage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <BusinessDriverServiceClient initialCars={initialCars} />;
}
