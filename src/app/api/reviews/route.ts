import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Public review submission - validated against a REAL completed booking so
// this can't be used to post reviews for bookings that aren't the caller's.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bookingId, customerEmail, rating, comment } = body;

    if (!bookingId || !customerEmail || !rating || !comment) {
      return NextResponse.json(
        { error: "Booking ID, email, rating, and comment are all required" },
        { status: 400 }
      );
    }

    const ratingNum = Number(rating);
    if (!Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return NextResponse.json({ error: "Rating must be an integer from 1 to 5" }, { status: 400 });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { review: true },
    });

    if (!booking) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    if (booking.customerEmail.trim().toLowerCase() !== String(customerEmail).trim().toLowerCase()) {
      return NextResponse.json({ error: "Email does not match this booking" }, { status: 403 });
    }

    if (booking.returnDate > new Date()) {
      return NextResponse.json(
        { error: "You can leave a review once your rental period has ended" },
        { status: 403 }
      );
    }

    if (booking.review) {
      return NextResponse.json({ error: "A review has already been submitted for this booking" }, { status: 409 });
    }

    const review = await prisma.review.create({
      data: {
        bookingId: booking.id,
        carId: booking.carId,
        customerName: booking.customerName,
        rating: ratingNum,
        comment: String(comment).slice(0, 2000),
        published: false,
      },
    });

    return NextResponse.json(
      { message: "Thank you! Your review has been submitted and will appear once it's been checked.", review },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}

// Public read - returns published reviews only, optionally scoped to one car.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const carId = searchParams.get("carId");

    const where: { published: boolean; carId?: string } = { published: true };
    if (carId) where.carId = carId;

    const reviews = await prisma.review.findMany({
      where,
      select: {
        id: true,
        carId: true,
        customerName: true,
        rating: true,
        comment: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const count = reviews.length;
    const average = count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

    return NextResponse.json(
      { reviews, aggregate: { count, average: Math.round(average * 10) / 10 } },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
