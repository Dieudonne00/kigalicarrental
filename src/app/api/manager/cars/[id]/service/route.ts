import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      licensePlate,
      insuranceStart,
      insuranceEnd,
      lastOilChange,
      nextOilChange,
    } = body;

    const data: Record<string, unknown> = {};
    data.licensePlate = licensePlate || null;
    data.insuranceStart = insuranceStart ? new Date(insuranceStart) : null;
    data.insuranceEnd = insuranceEnd ? new Date(insuranceEnd) : null;
    data.lastOilChange = lastOilChange ? new Date(lastOilChange) : null;
    data.nextOilChange = nextOilChange ? new Date(nextOilChange) : null;

    const car = await prisma.car.update({
      where: { id },
      data,
    });

    return NextResponse.json({ car });
  } catch (error) {
    console.error("Error updating car service info:", error);
    return NextResponse.json({ error: "Failed to update service info" }, { status: 500 });
  }
}
