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

export default function CarDetailPage() {
  return <CarDetailClient />;
}
