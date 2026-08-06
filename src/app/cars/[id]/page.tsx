import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CarDetailClient from "./CarDetailClient";

const SITE = "https://kigalicarrental.site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const car = await prisma.car.findUnique({ where: { id } });

  if (!car) {
    return { title: "Car Not Found | Kigali Car Rental" };
  }

  const name = car.name.trim();
  const title = `${name} for Rent in Kigali | $${car.dailyRate}/day - Kigali Car Rental`;
  const description = car.description
    ? car.description.slice(0, 155)
    : `Rent the ${name} in Kigali from $${car.dailyRate}/day. ${car.category}, ${car.seats} seats, ${car.transmission}. Fully insured, free delivery.`;
  const image = car.images[0];

  return {
    title,
    description,
    keywords: "Kigali car rental",
    alternates: { canonical: `${SITE}/cars/${car.id}` },
    openGraph: {
      title,
      description,
      url: `${SITE}/cars/${car.id}`,
      siteName: "Kigali Car Rental",
      type: "website",
      locale: "en_RW",
      images: image ? [{ url: image, width: 1200, height: 630, alt: `${name} for hire in Kigali Rwanda` }] : undefined,
    },
  };
}

export default async function CarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const carRecord = await prisma.car.findUnique({
    where: { id },
    include: {
      bookings: {
        where: {
          status: "confirmed",
          returnDate: { gte: new Date() },
        },
        select: { id: true },
      },
    },
  });

  if (!carRecord) {
    notFound();
  }

  const { bookings, ...rest } = carRecord;
  const car = { ...rest, hasActiveBooking: bookings.length > 0 };
  const name = car.name.trim();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description:
      car.description ||
      `${car.brand} ${car.model} ${car.year} available for rent in Kigali, Rwanda.`,
    image: car.images.length > 0 ? car.images : undefined,
    brand: { "@type": "Brand", name: car.brand },
    category: car.category,
    offers: {
      "@type": "Offer",
      url: `${SITE}/cars/${car.id}`,
      priceCurrency: "USD",
      price: car.dailyRate,
      availability:
        car.available && !car.hasActiveBooking
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/UsedCondition",
      seller: {
        "@type": "LocalBusiness",
        name: "Kigali Car Rental",
        url: SITE,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <CarDetailClient car={car} />
    </>
  );
}
