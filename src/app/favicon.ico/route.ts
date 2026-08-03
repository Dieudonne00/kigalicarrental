import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.redirect("https://kigalicarrental.site/icon.jpg", 308);
}
