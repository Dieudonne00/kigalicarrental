import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import FleetClient from "./FleetClient";

// Revalidate hourly rather than fully static - the ItemList schema below
// reflects the live fleet, and cars are added/removed from the manager
// panel without a redeploy.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Fleet | Kigali Car Rental",
  description:
    "Browse our full fleet of rental cars in Kigali, Rwanda. Filter by category, transmission, seats, and price to find the perfect sedan, SUV, or 4x4 for your trip.",
  alternates: {
    canonical: "/fleet",
  },
  openGraph: {
    title: "Our Fleet | Kigali Car Rental",
    description:
      "Browse our full fleet of rental cars in Kigali, Rwanda. Filter by category, transmission, seats, and price to find the perfect sedan, SUV, or 4x4 for your trip.",
    url: "/fleet",
    type: "website",
  },
};

export default async function FleetPage() {
  let cars: { id: string; brand: string; model: string; year: number }[] = [];
  try {
    cars = await prisma.car.findMany({
      where: { available: true },
      select: { id: true, brand: true, model: true, year: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Fleet page: failed to fetch cars for structured data", error);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: cars.map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.kigalicarrental.site/cars/${car.id}`,
      name: `${car.brand} ${car.model} ${car.year}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Suspense fallback={null}>
        <FleetClient />
      </Suspense>
    </>
  );
}
