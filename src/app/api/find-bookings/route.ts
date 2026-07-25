import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Lets a customer self-serve locate their own review link by email instead
// of only ever getting it from the automated post-rental email - still only
// ever returns bookings that match the exact email given, and only ones
// whose rental has actually ended, so this can't be used to browse other
// customers' bookings or review a car never rented.
export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        customerEmail: { equals: email.trim(), mode: "insensitive" },
        returnDate: { lte: new Date() },
      },
      include: {
        car: { select: { name: true, brand: true, model: true } },
        review: { select: { id: true } },
      },
      orderBy: { returnDate: "desc" },
    });

    const results = bookings.map((b) => ({
      bookingId: b.id,
      carLabel: b.car.name || `${b.car.brand} ${b.car.model}`.trim(),
      pickupDate: b.pickupDate,
      returnDate: b.returnDate,
      alreadyReviewed: !!b.review,
    }));

    return NextResponse.json({ bookings: results }, { status: 200 });
  } catch (error) {
    console.error("Error finding bookings:", error);
    return NextResponse.json({ error: "Failed to look up bookings" }, { status: 500 });
  }
}
