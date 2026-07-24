// app/cheap-car-rental-kigali/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import CheapCarRentalKigaliClient from "./CheapCarRentalKigaliClient";
import HomeLinkCTA from "@/components/HomeLinkCTA";

export const metadata: Metadata = {
  title: "Cheap Car Rental Kigali | Budget Cars From $25/Day",
  description:
    "Affordable Kigali car rental from $25/day. Budget-friendly economy cars, free delivery, no hidden fees, and full insurance included. Book cheap today.",
  alternates: {
    canonical: "/cheap-car-rental-kigali",
  },
  openGraph: {
    title: "Cheap Car Rental Kigali | Budget Cars From $25/Day",
    description:
      "Affordable Kigali car rental from $25/day. Budget-friendly economy cars, free delivery, no hidden fees, and full insurance included. Book cheap today.",
    url: "/cheap-car-rental-kigali",
    type: "website",
  },
};

export default async function CheapCarRentalKigaliPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return (
    <>
      <CheapCarRentalKigaliClient initialCars={initialCars} />
      <HomeLinkCTA before="Want to compare rates across our whole fleet? Visit the" after="homepage." />
    </>
  );
}
