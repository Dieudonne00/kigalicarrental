import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const car = await prisma.car.findUnique({
      where: { id },
      include: {
        bookings: {
          where: {
            status: "confirmed",
            returnDate: {
              gte: new Date(), // Only current/future bookings
            },
          },
          select: {
            id: true,
          },
        },
      },
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Add hasActiveBooking flag
    const carWithBookingStatus = {
      ...car,
      hasActiveBooking: car.bookings.length > 0,
      bookings: undefined, // Remove bookings array from response
    };

    return NextResponse.json({ car: carWithBookingStatus }, { status: 200 });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json(
      { error: "Failed to fetch car" },
      { status: 500 }
    );
  }
}
