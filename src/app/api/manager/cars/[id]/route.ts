import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET single car
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    return NextResponse.json({ car }, { status: 200 });
  } catch (error) {
    console.error("Error fetching car:", error);
    return NextResponse.json(
      { error: "Failed to fetch car" },
      { status: 500 }
    );
  }
}

// PUT - Update car
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Check if car exists
    const existingCar = await prisma.car.findUnique({
      where: { id },
    });

    if (!existingCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Update car
    const car = await prisma.car.update({
      where: { id },
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
      { message: "Car updated successfully", car },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating car:", error);
    return NextResponse.json(
      { error: "Failed to update car" },
      { status: 500 }
    );
  }
}

// DELETE car
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Check if car exists
    const existingCar = await prisma.car.findUnique({
      where: { id },
    });

    if (!existingCar) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    // Delete car
    await prisma.car.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Car deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting car:", error);
    return NextResponse.json(
      { error: "Failed to delete car" },
      { status: 500 }
    );
  }
}
