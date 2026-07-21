import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LeaveReviewClient from "./LeaveReviewClient";

export const metadata: Metadata = {
  title: "Leave a Review | Kigali Car Rental",
  robots: { index: false, follow: false },
};

export default async function LeaveReviewPage({ params }: { params: Promise<{ bookingId: string }> }) {
  const { bookingId } = await params;

  const booking = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { car: { select: { brand: true, model: true, year: true } }, review: true },
  });

  if (!booking) {
    notFound();
  }

  return (
    <LeaveReviewClient
      bookingId={booking.id}
      carLabel={`${booking.car.brand} ${booking.car.model} ${booking.car.year}`}
      pickupDate={booking.pickupDate.toISOString()}
      returnDate={booking.returnDate.toISOString()}
      rentalEnded={booking.returnDate <= new Date()}
      alreadyReviewed={!!booking.review}
    />
  );
}
