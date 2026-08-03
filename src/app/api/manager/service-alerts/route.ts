import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendServiceAlertsEmail } from "@/lib/email";

export async function POST() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const in30Days = new Date(today);
    in30Days.setDate(in30Days.getDate() + 30);

    const in7Days = new Date(today);
    in7Days.setDate(in7Days.getDate() + 7);

    const cars = await prisma.car.findMany({
      orderBy: { name: "asc" },
      select: {
        id: true,
        name: true,
        brand: true,
        licensePlate: true,
        insuranceEnd: true,
        nextOilChange: true,
      },
    });

    const insuranceExpiring = cars.filter(
      (c) => c.insuranceEnd && c.insuranceEnd <= in30Days
    );

    const oilChangeDue = cars.filter(
      (c) => c.nextOilChange && c.nextOilChange <= in7Days
    );

    // Overdue returns
    const overdueBookings = await prisma.booking.findMany({
      where: {
        status: "confirmed",
        returnDate: { lt: today },
      },
      include: {
        car: { select: { name: true, licensePlate: true } },
      },
    });

    if (insuranceExpiring.length === 0 && oilChangeDue.length === 0 && overdueBookings.length === 0) {
      return NextResponse.json({ message: "No alerts to send — everything is up to date." });
    }

    await sendServiceAlertsEmail({
      insuranceExpiring: insuranceExpiring.map((c) => ({
        name: c.name,
        brand: c.brand,
        licensePlate: c.licensePlate,
        insuranceEnd: c.insuranceEnd!,
      })),
      oilChangeDue: oilChangeDue.map((c) => ({
        name: c.name,
        brand: c.brand,
        licensePlate: c.licensePlate,
        nextOilChange: c.nextOilChange!,
      })),
      overdueBookings: overdueBookings.map((b) => ({
        carName: b.car.name,
        licensePlate: b.car.licensePlate,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        returnDate: b.returnDate,
      })),
    });

    return NextResponse.json({
      message: `Service alerts sent: ${insuranceExpiring.length} insurance, ${oilChangeDue.length} oil change, ${overdueBookings.length} overdue.`,
    });
  } catch (error) {
    console.error("Error sending service alerts:", error);
    return NextResponse.json({ error: "Failed to send service alerts" }, { status: 500 });
  }
}
