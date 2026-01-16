import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendStatusUpdateToCustomer } from "@/lib/email";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // Build query
    const where: any = {};

    if (status && status !== "all") {
      where.status = status;
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        car: {
          select: {
            id: true,
            name: true,
            brand: true,
            model: true,
            year: true,
            images: true,
            category: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// Update booking status
export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const body = await request.json();
    const { status } = body;

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    if (!status) {
      return NextResponse.json(
        { error: "Status is required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "confirmed", "completed", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const booking = await prisma.booking.update({
      where: { id },
      data: { status },
      include: {
        car: true,
      },
    });

    // Send email notification to customer about status change
    await sendStatusUpdateToCustomer({
      bookingId: booking.id,
      customerName: booking.customerName,
      customerEmail: booking.customerEmail,
      carName: booking.car.name,
      carBrand: booking.car.brand,
      carModel: booking.car.model,
      pickupDate: booking.pickupDate.toISOString(),
      returnDate: booking.returnDate.toISOString(),
      pickupLocation: booking.pickupLocation,
      returnLocation: booking.returnLocation || booking.pickupLocation,
      totalCost: booking.totalCost,
      newStatus: status,
    });

    return NextResponse.json(
      {
        message: "Booking updated successfully",
        booking,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// Delete booking
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Booking ID is required" },
        { status: 400 }
      );
    }

    await prisma.booking.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Booking deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
