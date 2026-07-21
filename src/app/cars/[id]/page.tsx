import type { Metadata } from "next";
import { cache } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import CarDetailClient from "./CarDetailClient";

const getCar = cache((id: string) =>
  prisma.car.findUnique({
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
  })
);

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const car = await getCar(id);

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
  const car = await getCar(id);

  if (!car) {
    notFound();
  }

  const { bookings, ...carFields } = car;
  const carWithBookingStatus = { ...carFields, hasActiveBooking: bookings.length > 0 };

  const reviews = await prisma.review.findMany({
    where: { carId: id, published: true },
    select: { id: true, customerName: true, rating: true, comment: true, createdAt: true },
    orderBy: { createdAt: "desc" },
  });
  const reviewCount = reviews.length;
  const averageRating =
    reviewCount > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount : 0;

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
    // Only include rating/review markup when real, published customer
    // reviews exist - Google requires this to be genuine, and a Product
    // block with no aggregateRating/review simply won't show a star snippet.
    ...(reviewCount > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: Math.round(averageRating * 10) / 10,
        reviewCount,
      },
      review: reviews.slice(0, 10).map((r) => ({
        "@type": "Review",
        author: { "@type": "Person", name: r.customerName },
        datePublished: r.createdAt.toISOString(),
        reviewBody: r.comment,
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <CarDetailClient
        initialCar={carWithBookingStatus}
        reviews={reviews.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))}
        reviewCount={reviewCount}
        averageRating={Math.round(averageRating * 10) / 10}
      />
    </>
  );
}
