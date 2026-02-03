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
      select: { // ✅ CHANGED from 'include' to 'select' for specific fields
        id: true,
        name: true,
        brand: true,
        model: true,
        year: true,
        category: true,
        transmission: true,
        seats: true,
        fuelType: true,
        dailyRate: true,
        weeklyRate: true,
        monthlyRate: true,
        imageUrl: true, // ✅ ADD THIS LINE - CRITICAL
        featured: true,
        gameDrive: true,
        createdAt: true,
        // Include bookings for active booking check
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
      orderBy: {
        createdAt: "desc",
      },
    });

    // Debug log to see what's being returned
    console.log(`Fetched ${cars.length} cars`);
    if (cars.length > 0) {
      console.log("First car fields:", Object.keys(cars[0]));
      console.log("First car imageUrl:", cars[0].imageUrl);
    }

    // Add hasActiveBooking flag to each car
    const carsWithBookingStatus = cars.map((car: any) => ({
      id: car.id,
      name: car.name,
      brand: car.brand,
      model: car.model,
      year: car.year,
      category: car.category,
      transmission: car.transmission,
      seats: car.seats,
      fuelType: car.fuelType,
      dailyRate: car.dailyRate,
      weeklyRate: car.weeklyRate,
      monthlyRate: car.monthlyRate,
      imageUrl: car.imageUrl || null, // ✅ Ensure imageUrl is included
      hasActiveBooking: car.bookings.length > 0,
    }));

    return NextResponse.json({ 
      cars: carsWithBookingStatus,
      meta: {
        total: cars.length,
        featured: featured === "true",
        gameDrive: gameDrive === "true"
      }
    }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}
