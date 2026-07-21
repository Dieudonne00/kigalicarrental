import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendReviewRequestEmail } from "@/lib/email";

// Triggered once a day by the VPS crontab (same pattern as the other /api/cron/*
// routes). Finds bookings whose rental ended exactly 2 days ago and emails the
// customer a link to leave a real review - this is the only source of review
// data on the site, so it's what makes the Product/AggregateRating structured
// data (see cars/[id]/page.tsx and the homepage) genuine rather than invented.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret") || request.headers.get("x-cron-secret");

  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const windowStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2);
    const windowEnd = new Date(windowStart);
    windowEnd.setDate(windowEnd.getDate() + 1);

    const bookings = await prisma.booking.findMany({
      where: {
        returnDate: { gte: windowStart, lt: windowEnd },
        status: { in: ["confirmed", "completed"] },
        review: null,
      },
      include: { car: { select: { name: true, brand: true, model: true } } },
    });

    let sent = 0;
    let failed = 0;
    for (const booking of bookings) {
      try {
        await sendReviewRequestEmail({
          bookingId: booking.id,
          customerName: booking.customerName,
          customerEmail: booking.customerEmail,
          carName: booking.car.name || `${booking.car.brand} ${booking.car.model}`,
        });
        sent++;
      } catch (err) {
        console.error(`Failed to send review request for booking ${booking.id}:`, err);
        failed++;
      }
    }

    return NextResponse.json({ success: true, sent, failed, eligible: bookings.length });
  } catch (error) {
    console.error("Error running review request cron:", error);
    return NextResponse.json({ error: "Failed to send review requests" }, { status: 500 });
  }
}
