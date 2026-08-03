import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const cars = await prisma.car.findMany({
      orderBy: [{ name: "asc" }],
      include: {
        bookings: {
          where: {
            status: { in: ["confirmed", "pending"] },
            returnDate: { gte: today },
          },
          orderBy: { pickupDate: "asc" },
          take: 1,
          select: {
            id: true,
            customerName: true,
            customerPhone: true,
            customerEmail: true,
            pickupDate: true,
            returnDate: true,
            source: true,
            notes: true,
            status: true,
            totalCost: true,
          },
        },
      },
    });

    const carsWithStatus = cars.map((car) => {
      const booking = car.bookings[0] || null;
      let hiringStatus: "available" | "onhire" | "upcoming" | "overdue" = "available";

      if (booking) {
        const pickup = new Date(booking.pickupDate);
        const ret = new Date(booking.returnDate);
        pickup.setHours(0, 0, 0, 0);
        ret.setHours(0, 0, 0, 0);
        const now = new Date();
        now.setHours(0, 0, 0, 0);

        if (pickup <= now && ret >= now) {
          hiringStatus = "onhire";
        } else if (pickup > now) {
          hiringStatus = "upcoming";
        }
      }

      // Check for overdue — confirmed bookings past return date
      return { ...car, activeBooking: booking, hiringStatus };
    });

    // Also fetch any confirmed bookings that are overdue (returnDate < today, status still confirmed)
    const overdueBookings = await prisma.booking.findMany({
      where: {
        status: "confirmed",
        returnDate: { lt: today },
      },
      select: {
        id: true,
        carId: true,
        customerName: true,
        customerPhone: true,
        returnDate: true,
      },
    });

    const overdueByCarId = new Map(overdueBookings.map((b) => [b.carId, b]));

    const result = carsWithStatus.map((car) => {
      const overdue = overdueByCarId.get(car.id);
      if (overdue && car.hiringStatus === "available") {
        return { ...car, overdueBooking: overdue, hiringStatus: "overdue" as const };
      }
      return { ...car, overdueBooking: null };
    });

    return NextResponse.json({ cars: result });
  } catch (error) {
    console.error("Error fetching fleet status:", error);
    return NextResponse.json({ error: "Failed to fetch fleet status" }, { status: 500 });
  }
}
