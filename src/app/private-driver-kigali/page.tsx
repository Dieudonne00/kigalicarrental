import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import PrivateDriverKigaliClient from "./PrivateDriverKigaliClient";
import HomeLinkCTA from "@/components/HomeLinkCTA";

export const metadata: Metadata = {
  title: "Private Driver Kigali | Personal Chauffeur Hire Rwanda",
  description:
    "Book a private personal driver in Kigali. Executive-class chauffeur service, professional and punctual, for airport transfers, business travel, and city tours across Rwanda.",
  alternates: {
    canonical: "/private-driver-kigali",
  },
  openGraph: {
    title: "Private Driver Kigali | Personal Chauffeur Hire Rwanda",
    description:
      "Book a private personal driver in Kigali. Executive-class chauffeur service, professional and punctual, for airport transfers, business travel, and city tours across Rwanda.",
    url: "/private-driver-kigali",
    type: "website",
  },
};

export default async function PrivateDriverKigaliPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return (
    <>
      <PrivateDriverKigaliClient initialCars={initialCars} />
      <HomeLinkCTA before="Prefer self-drive instead? Head back to" after="to see every option." />
    </>
  );
}
