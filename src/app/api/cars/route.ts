import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");
    const gameDrive = searchParams.get("gameDrive");

    // Build query
    const where: any = {
      available: true,
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
              gte: new Date(),
            },
          },
          select: {
            id: true,
          },
        },
      },
    });

    // FIX: Always ensure imageUrl exists in response
    const carsWithBookingStatus = cars.map((car: any) => {
      // Use whatever image field exists, or create a test one
      const imageUrl = car.imageUrl || 
                      car.image || 
                      (car.images && car.images[0]) || 
                      `https://res.cloudinary.com/dxn12qcje/image/upload/cars/${car.name.replace(/\s+/g, '-')}.jpg`;

      return {
        ...car,
        imageUrl: imageUrl, // CRITICAL: Add this field
        hasActiveBooking: car.bookings.length > 0,
        bookings: undefined,
      };
    });

    return NextResponse.json({ cars: carsWithBookingStatus }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
