import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { sendBookingNotificationToManager } from "@/lib/email";



const prisma = new PrismaClient();

// POST - Create a new booking request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      pickupDate,
      pickupTime,
      returnDate,
      returnTime,
      pickupLocation,
      dropoffLocation,
      carType,
      transmission,
      seats,
      budget,
      purpose,
      additionalRequirements,
      fullName,
      email,
      phone,
      whatsapp,
    } = body;

    // Validate required fields
    if (!pickupDate || !pickupTime || !returnDate || !returnTime || !pickupLocation || !fullName || !email || !phone) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create booking request in database
    const bookingRequest = await prisma.bookingRequest.create({
      data: {
        pickupDate,
        pickupTime,
        returnDate,
        returnTime,
        pickupLocation,
        dropoffLocation: dropoffLocation || pickupLocation,
        carType,
        transmission,
        seats,
        budget,
        purpose,
        additionalRequirements,
        fullName,
        email,
        phone,
        whatsapp,
        status: "new",
      },
    });

  // Send email notification to manager (non-blocking)
  sendBookingNotificationToManager({
    bookingId: bookingRequest.id,
    customerName: fullName,
    customerEmail: email,
    customerPhone: phone,
    carName: carType,
    carBrand: carType?.split(" ")[0] || "Car",
    carModel: carType,
    pickupDate,
    returnDate,
    pickupLocation,
    returnLocation: dropoffLocation || pickupLocation,
    totalCost: budget || 0,
    specialRequests: additionalRequirements || "",
  }).catch((error) => {
    console.error("Failed to send email notification:", error);
  });

      } catch (error) {
    console.error("Error creating booking request:", error);
    return NextResponse.json(
      { error: "Failed to submit booking request" },
      { status: 500 }
    );
  }
}

// GET - Fetch all booking requests (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    const where = status ? { status } : {};

    const bookingRequests = await prisma.bookingRequest.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      bookingRequests,
      total: bookingRequests.length,
    });
  } catch (error) {
    console.error("Error fetching booking requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking requests" },
      { status: 500 }
    );
  }
}
