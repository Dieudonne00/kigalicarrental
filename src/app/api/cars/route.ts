import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const gameDrive = searchParams.get("gameDrive");

    // Build query
    const where: any = {
      available: true, // Only show available cars publicly
    };

    if (featured === "true") {
      where.featured = true;
    }

    if (gameDrive === "true") {
      where.gameDrive = true;
    }

    const cars = await prisma.car.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
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

    // Add hasActiveBooking flag to each car
    const carsWithBookingStatus = cars.map((car: any) => ({
      ...car,
      hasActiveBooking: car.bookings.length > 0,
      bookings: undefined, // Remove bookings array from response
    }));

    return NextResponse.json({ cars: carsWithBookingStatus }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
