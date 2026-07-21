import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Auth is enforced centrally by the proxy for all of /api/manager/* - see src/proxy.ts.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // "pending" | "published" | "all"

    const where =
      status === "published" ? { published: true } : status === "pending" ? { published: false } : {};

    const reviews = await prisma.review.findMany({
      where,
      include: {
        car: { select: { id: true, name: true, brand: true, model: true, year: true } },
        booking: { select: { customerEmail: true, pickupDate: true, returnDate: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
