import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get("featured");

    const where: any = { available: true };
    if (featured === "true") where.featured = true;

    const cars = await prisma.car.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // TEST: Force add Cloudinary URLs to test
    const carsWithImages = cars.map((car: any) => ({
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
      // TEST: Force a working Cloudinary URL
      imageUrl: car.imageUrl || `https://res.cloudinary.com/dxn12qcje/image/upload/v1748892837/cars/test-car-${car.id}.jpg`,
      hasActiveBooking: false,
    }));

    console.log("API returning cars:", carsWithImages.length);
    if (carsWithImages[0]) {
      console.log("First car imageUrl:", carsWithImages[0].imageUrl);
    }

    return NextResponse.json({ cars: carsWithImages }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
