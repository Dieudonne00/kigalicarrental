import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET - Get a single booking request
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const bookingRequest = await prisma.bookingRequest.findUnique({
      where: { id },
    });

    if (!bookingRequest) {
      return NextResponse.json(
        { error: "Booking request not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, bookingRequest });
  } catch (error) {
    console.error("Error fetching booking request:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking request" },
      { status: 500 }
    );
  }
}

// PATCH - Update booking request (status, notes, assigned car)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { status, notes, assignedCarId } = body;

    const bookingRequest = await prisma.bookingRequest.update({
      where: { id },
      data: {
        ...(status && { status }),
        ...(notes !== undefined && { notes }),
        ...(assignedCarId !== undefined && { assignedCarId }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Booking request updated successfully",
      bookingRequest,
    });
  } catch (error) {
    console.error("Error updating booking request:", error);
    return NextResponse.json(
      { error: "Failed to update booking request" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a booking request
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.bookingRequest.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Booking request deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting booking request:", error);
    return NextResponse.json(
      { error: "Failed to delete booking request" },
      { status: 500 }
    );
  }
}
