// app/event-transport-driver/page.tsx
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import EventTransportDriverClient from "./EventTransportDriverClient";

export const metadata: Metadata = {
  title: "Event Transport Driver Kigali | Wedding & Conference Cars",
  description:
    "Professional event transport drivers in Kigali for weddings, conferences, corporate events and parties. Luxury cars, formal attire, decoration allowed. Book today.",
  alternates: {
    canonical: "/event-transport-driver",
  },
  openGraph: {
    title: "Event Transport Driver Kigali | Wedding & Conference Cars",
    description:
      "Professional event transport drivers in Kigali for weddings, conferences, corporate events and parties. Luxury cars, formal attire, decoration allowed. Book today.",
    url: "/event-transport-driver",
    type: "website",
  },
};

export default async function EventTransportDriverPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <EventTransportDriverClient initialCars={initialCars} />;
}
