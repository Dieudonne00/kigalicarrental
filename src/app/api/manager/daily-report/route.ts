import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDailyReportEmail } from "@/lib/email";

export async function GET(request: Request) {
  // Allow Vercel cron (Authorization header) or manual trigger with secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    // Also allow no-secret for manual button trigger from manager
    const url = new URL(request.url);
    if (url.searchParams.get("manual") !== "1") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  try {
    const now = new Date();
    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(now);
    todayEnd.setHours(23, 59, 59, 999);
    const in7Days = new Date(todayStart);
    in7Days.setDate(in7Days.getDate() + 7);
    const in30Days = new Date(todayStart);
    in30Days.setDate(in30Days.getDate() + 30);

    // Cars currently on hire (pickup <= today AND return >= today, status confirmed)
    const onHireBookings = await prisma.booking.findMany({
      where: {
        status: "confirmed",
        pickupDate: { lte: todayEnd },
        returnDate: { gte: todayStart },
      },
      include: { car: { select: { name: true, brand: true, licensePlate: true } } },
      orderBy: { returnDate: "asc" },
    });

    // Returning today
    const returningToday = await prisma.booking.findMany({
      where: {
        status: "confirmed",
        returnDate: { gte: todayStart, lte: todayEnd },
      },
      include: { car: { select: { name: true, brand: true, licensePlate: true } } },
    });

    // Overdue (returnDate < today, still confirmed)
    const overdueReturns = await prisma.booking.findMany({
      where: {
        status: "confirmed",
        returnDate: { lt: todayStart },
      },
      include: { car: { select: { name: true, brand: true, licensePlate: true } } },
      orderBy: { returnDate: "asc" },
    });

    // Upcoming next 7 days (pickup > today, within 7 days)
    const upcomingBookings = await prisma.booking.findMany({
      where: {
        status: { in: ["confirmed", "pending"] },
        pickupDate: { gt: todayEnd, lte: in7Days },
      },
      include: { car: { select: { name: true, brand: true, licensePlate: true } } },
      orderBy: { pickupDate: "asc" },
    });

    // New bookings created today
    const newBookingsToday = await prisma.booking.findMany({
      where: {
        createdAt: { gte: todayStart, lte: todayEnd },
      },
      include: { car: { select: { name: true, brand: true } } },
      orderBy: { createdAt: "desc" },
    });

    // All cars for service alerts
    const allCars = await prisma.car.findMany({
      select: { id: true, name: true, brand: true, licensePlate: true, insuranceEnd: true, nextOilChange: true, lastOilChange: true },
    });

    const insuranceExpiring = allCars.filter(c => c.insuranceEnd && c.insuranceEnd <= in30Days);
    const oilChangeDue = allCars.filter(c => c.nextOilChange && c.nextOilChange <= in7Days);

    // Fleet summary
    const totalCars = await prisma.car.count();
    const availableCars = totalCars - onHireBookings.length;

    await sendDailyReportEmail({
      date: now,
      totalCars,
      availableCars,
      onHireCount: onHireBookings.length,
      overdueCount: overdueReturns.length,
      onHireBookings: onHireBookings.map(b => ({
        carName: `${b.car.brand} ${b.car.name}`,
        licensePlate: b.car.licensePlate,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        pickupDate: b.pickupDate,
        returnDate: b.returnDate,
        source: b.source,
        totalCost: b.totalCost,
      })),
      returningToday: returningToday.map(b => ({
        carName: `${b.car.brand} ${b.car.name}`,
        licensePlate: b.car.licensePlate,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        returnDate: b.returnDate,
      })),
      overdueReturns: overdueReturns.map(b => ({
        carName: `${b.car.brand} ${b.car.name}`,
        licensePlate: b.car.licensePlate,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        returnDate: b.returnDate,
      })),
      upcomingBookings: upcomingBookings.map(b => ({
        carName: `${b.car.brand} ${b.car.name}`,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        pickupDate: b.pickupDate,
        returnDate: b.returnDate,
        source: b.source,
      })),
      newBookingsToday: newBookingsToday.map(b => ({
        carName: `${b.car.brand} ${b.car.name}`,
        customerName: b.customerName,
        customerPhone: b.customerPhone,
        source: b.source,
        totalCost: b.totalCost,
        pickupDate: b.pickupDate,
        returnDate: b.returnDate,
      })),
      insuranceExpiring: insuranceExpiring.map(c => ({
        carName: `${c.brand} ${c.name}`,
        licensePlate: c.licensePlate,
        insuranceEnd: c.insuranceEnd!,
      })),
      oilChangeDue: oilChangeDue.map(c => ({
        carName: `${c.brand} ${c.name}`,
        licensePlate: c.licensePlate,
        nextOilChange: c.nextOilChange!,
        lastOilChange: c.lastOilChange,
      })),
    });

    return NextResponse.json({ message: "Daily report sent successfully", date: now.toISOString() });
  } catch (error) {
    console.error("Daily report error:", error);
    return NextResponse.json({ error: "Failed to send daily report" }, { status: 500 });
  }
}
