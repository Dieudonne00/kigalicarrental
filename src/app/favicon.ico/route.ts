import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.redirect("https://kigalicarhire.rw/icon.jpg", 308);
}
