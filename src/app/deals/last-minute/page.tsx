import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import LastMinuteDealsClient from "./LastMinuteDealsClient";
import HomeLinkCTA from "@/components/HomeLinkCTA";

export const metadata: Metadata = {
  title: "Last Minute Car Rental Kigali | 30-Min Delivery Deals",
  description:
    "Need a car right now? Last-minute car rental deals in Kigali, Rwanda with 30-minute delivery anywhere in the city. Premium vehicles, professional driver included. Book instantly.",
  alternates: {
    canonical: "/deals/last-minute",
  },
  openGraph: {
    title: "Last Minute Car Rental Kigali | 30-Min Delivery Deals",
    description:
      "Last-minute car rental deals in Kigali with 30-minute delivery anywhere in the city. Premium vehicles, professional driver included.",
    url: "/deals/last-minute",
    type: "website",
  },
};

export default async function LastMinuteDealsPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return (
    <>
      <LastMinuteDealsClient initialCars={initialCars} />
      <HomeLinkCTA before="Want to see our full price range? Visit the" after="homepage for all current offers." />
    </>
  );
}
