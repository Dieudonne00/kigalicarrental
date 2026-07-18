import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { path } = await request.json();

    await prisma.pageVisit.create({
      data: {
        path: typeof path === "string" && path.length > 0 ? path.slice(0, 255) : "/",
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    // Visit tracking must never break the page it's called from.
    console.error("Error tracking visit:", error);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}
