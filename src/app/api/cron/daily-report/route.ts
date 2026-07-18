import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDailyDigest } from "@/lib/email";

// Triggered once a day by an external cron (Vercel Cron and/or a VPS crontab
// hitting this URL). Protected by a shared secret so it can't be spammed by
// anyone who finds the URL - a request without the right secret is a no-op.
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret") || request.headers.get("x-cron-secret");

  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfYesterday.getDate() - 1);

    const dateLabel = startOfYesterday.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    const [visitCount, bookingCount, bookingRequestCount, contactMessageCount] = await Promise.all([
      prisma.pageVisit.count({
        where: { createdAt: { gte: startOfYesterday, lt: startOfToday } },
      }),
      prisma.booking.count({
        where: { createdAt: { gte: startOfYesterday, lt: startOfToday } },
      }),
      prisma.bookingRequest.count({
        where: { createdAt: { gte: startOfYesterday, lt: startOfToday } },
      }),
      prisma.contactMessage.count({
        where: { createdAt: { gte: startOfYesterday, lt: startOfToday } },
      }),
    ]);

    await sendDailyDigest({
      date: dateLabel,
      visitCount,
      bookingCount,
      bookingRequestCount,
      contactMessageCount,
    });

    return NextResponse.json({
      success: true,
      date: dateLabel,
      visitCount,
      bookingCount,
      bookingRequestCount,
      contactMessageCount,
    });
  } catch (error) {
    console.error("Error generating daily report:", error);
    return NextResponse.json({ error: "Failed to generate daily report" }, { status: 500 });
  }
}
