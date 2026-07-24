import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import LongTermCarRentalRwandaClient from "./LongTermCarRentalRwandaClient";
import HomeLinkCTA from "@/components/HomeLinkCTA";

export const metadata: Metadata = {
  title: "Long Term Car Rental Rwanda | Monthly Rates from $800",
  description:
    "Monthly and quarterly car rental in Rwanda from $800/month, all-inclusive with free maintenance and insurance. Ideal for NGOs, embassies, corporates, and expats in Kigali.",
  alternates: {
    canonical: "/long-term-car-rental-rwanda",
  },
  openGraph: {
    title: "Long Term Car Rental Rwanda | Monthly Rates from $800",
    description:
      "Monthly and quarterly car rental in Rwanda from $800/month, all-inclusive with free maintenance and insurance. Ideal for NGOs, embassies, corporates, and expats in Kigali.",
    url: "/long-term-car-rental-rwanda",
    type: "website",
  },
};

export default async function LongTermCarRentalRwandaPage() {
  const cars = await prisma.car.findMany({ where: { available: true }, orderBy: { createdAt: "desc" } });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));
  return (
    <>
      <LongTermCarRentalRwandaClient initialCars={initialCars} />
      <HomeLinkCTA before="Need something shorter-term instead? Check out" after="for daily and weekly rates." />
    </>
  );
}
