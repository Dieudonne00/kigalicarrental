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
      include: { bookings: { where: { status: "confirmed", returnDate: { gte: new Date() } }, select: { id: true } } },
      orderBy: { createdAt: "desc" },
    });

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
      // FIX: Always return imageUrl, use ANY field that exists
      imageUrl: car.imageUrl || car.image || (car.images && car.images[0]) || "/placeholder-car.jpg",
      hasActiveBooking: car.bookings?.length > 0 || false,
    }));

    return NextResponse.json({ cars: carsWithImages }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: "Failed to fetch cars" }, { status: 500 });
  }
}
