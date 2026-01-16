import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all cars
export async function GET() {
  try {
    const cars = await prisma.car.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ cars }, { status: 200 });
  } catch (error) {
    console.error("Error fetching cars:", error);
    return NextResponse.json(
      { error: "Failed to fetch cars" },
      { status: 500 }
    );
  }
}

// POST - Create new car
export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "category",
      "brand",
      "model",
      "year",
      "fuelType",
      "transmission",
      "seats",
      "hourlyRate",
      "dailyRate",
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create car
    const car = await prisma.car.create({
      data: {
        name: data.name,
        description: data.description || null,
        category: data.category,
        brand: data.brand,
        model: data.model,
        year: parseInt(data.year),
        fuelType: data.fuelType,
        transmission: data.transmission,
        seats: parseInt(data.seats),
        mileage: data.mileage || null,
        hourlyRate: parseFloat(data.hourlyRate),
        dailyRate: parseFloat(data.dailyRate),
        weeklyRate: data.weeklyRate ? parseFloat(data.weeklyRate) : null,
        monthlyRate: data.monthlyRate ? parseFloat(data.monthlyRate) : null,
        images: data.images || [],
        available: data.available !== undefined ? data.available : true,
        featured: data.featured !== undefined ? data.featured : false,
        gameDrive: data.gameDrive !== undefined ? data.gameDrive : false,
        specifications: data.specifications || null,
      },
    });

    return NextResponse.json(
      { message: "Car created successfully", car },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating car:", error);
    return NextResponse.json(
      { error: "Failed to create car" },
      { status: 500 }
    );
  }
}
