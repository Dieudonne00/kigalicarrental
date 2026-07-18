import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CarDetailClient from "./CarDetailClient";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });

  if (!car) {
    return { title: "Car Not Found | Kigali Car Rental" };
  }

  const title = `${car.brand} ${car.model} ${car.year} Rental Kigali | Kigali Car Rental`;
  const description = `Rent the ${car.brand} ${car.model} (${car.year}) in Kigali, Rwanda from $${car.dailyRate}/day. ${car.transmission}, ${car.seats} seats. Book online with free airport delivery.`;

  return {
    title,
    description,
    alternates: { canonical: `/cars/${id}` },
    openGraph: { title, description, url: `/cars/${id}`, type: "website" },
  };
}

export default async function CarDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });

  if (!car) {
    return <CarDetailClient />;
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${car.brand} ${car.model} ${car.year}`,
    description:
      car.description || `Rent the ${car.brand} ${car.model} in Kigali, Rwanda.`,
    image: car.images,
    brand: { "@type": "Brand", name: car.brand },
    category: "Car Rental",
    offers: {
      "@type": "Offer",
      url: `https://www.kigalicarrental.site/cars/${car.id}`,
      priceCurrency: "USD",
      price: car.dailyRate,
      availability: car.available
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      areaServed: "Kigali, Rwanda",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CarDetailClient />
    </>
  );
}
