import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendBookingNotificationToManager } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      carId,
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
      returnDate,
      pickupLocation,
      returnLocation,
      totalCost,
      specialRequests,
    } = body;

    // Validation
    if (
      !carId ||
      !customerName ||
      !customerEmail ||
      !customerPhone ||
      !pickupDate ||
      !returnDate ||
      !pickupLocation ||
      !totalCost
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate dates
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);
    const now = new Date();

    if (pickup < now) {
      return NextResponse.json(
        { error: "Pickup date cannot be in the past" },
        { status: 400 }
      );
    }

    if (returnD <= pickup) {
      return NextResponse.json(
        { error: "Return date must be after pickup date" },
        { status: 400 }
      );
    }

    // Check if car exists and is available
    const car = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return NextResponse.json({ error: "Car not found" }, { status: 404 });
    }

    if (!car.available) {
      return NextResponse.json(
        { error: "Car is not available for booking" },
        { status: 400 }
      );
    }

    // Check for overlapping bookings - only block if confirmed
    const overlappingBookings = await prisma.booking.findMany({
      where: {
        carId,
        status: "confirmed",
        OR: [
          {
            AND: [
              { pickupDate: { lte: pickup } },
              { returnDate: { gte: pickup } },
            ],
          },
          {
            AND: [
              { pickupDate: { lte: returnD } },
              { returnDate: { gte: returnD } },
            ],
          },
          {
            AND: [
              { pickupDate: { gte: pickup } },
              { returnDate: { lte: returnD } },
            ],
          },
        ],
      },
    });

    if (overlappingBookings.length > 0) {
      return NextResponse.json(
        { error: "Car is already booked for the selected dates" },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        carId,
        customerName,
        customerEmail,
        customerPhone,
        pickupDate: pickup,
        returnDate: returnD,
        pickupLocation,
        returnLocation: returnLocation || pickupLocation,
        totalCost: parseFloat(totalCost),
        specialRequests: specialRequests || null,
        status: "pending",
      },
      include: {
        car: true,
      },
    });

    // Send email notification to manager
    await sendBookingNotificationToManager({
      bookingId: booking.id,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      customerPhone: booking.customerPhone,
      carName: booking.car.name,
      carBrand: booking.car.brand,
      carModel: booking.car.model,
      pickupDate: booking.pickupDate.toISOString(),
      returnDate: booking.returnDate.toISOString(),
      pickupLocation: booking.pickupLocation,
      returnLocation: booking.returnLocation || booking.pickupLocation,
      totalCost: booking.totalCost,
      specialRequests: booking.specialRequests || undefined,
    });

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating booking:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
