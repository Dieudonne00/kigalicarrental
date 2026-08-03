import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    secret: process.env.MEDIA_SECRET || "kch-media-2026",
    uploadUrl: "https://media.kigalicarhire.rw",
  });
}
