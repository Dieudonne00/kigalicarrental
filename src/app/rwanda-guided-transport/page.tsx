import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { CAR_IMAGE_FALLBACK } from "@/lib/constants";
import RwandaGuidedTransportClient from "./RwandaGuidedTransportClient";

export const metadata: Metadata = {
  title: "Rwanda Guided Transport | Gorilla Trekking & Safari Tours",
  description:
    "Professional tour guide plus vehicle packages for Rwanda. Gorilla trekking in Volcanoes NP, safari in Akagera, chimpanzee tracking in Nyungwe with local guides.",
  alternates: {
    canonical: "/rwanda-guided-transport",
  },
  openGraph: {
    title: "Rwanda Guided Transport | Gorilla Trekking & Safari Tours",
    description:
      "Professional tour guide + vehicle packages for gorilla trekking, safari, cultural tours. English/French guides, 4x4 vehicles.",
    url: "/rwanda-guided-transport",
    type: "website",
  },
};

export default async function RwandaGuidedTransportPage() {
  const cars = await prisma.car.findMany({
    where: { available: true },
    orderBy: { createdAt: "desc" },
  });
  const initialCars = cars.map((c) => ({ ...c, imageUrl: c.images?.[0] || CAR_IMAGE_FALLBACK }));

  return <RwandaGuidedTransportClient initialCars={initialCars} />;
}
