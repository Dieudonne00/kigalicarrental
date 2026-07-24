import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import MonthlyRentalClient from "./MonthlyRentalClient";
import HomeLinkCTA from "@/components/HomeLinkCTA";

export const metadata: Metadata = {
  title: "Monthly Car Rental Kigali | Flexible Rwanda Rental Plans",
  description:
    "Monthly Kigali car rental with flexible 1-12 month terms. All-inclusive rates with maintenance and insurance, save 15-30% vs daily rates. Corporate & NGO rates available.",
  alternates: {
    canonical: "/long-term/monthly",
  },
  openGraph: {
    title: "Monthly Car Rental Kigali | Flexible Rwanda Rental Plans",
    description:
      "Flexible monthly car rental subscriptions in Kigali, Rwanda. No long-term commitment. All-inclusive rates with maintenance and insurance.",
    url: "/long-term/monthly",
    type: "website",
  },
};

export default async function MonthlyRentalPage() {
  const cars = await prisma.car.findMany({ where: { available: true }, orderBy: { createdAt: "desc" } });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));
  return (
    <>
      <MonthlyRentalClient initialCars={initialCars} />
      <HomeLinkCTA before="Looking for shorter rentals too? Visit" after="for daily and weekly options." />
    </>
  );
}
