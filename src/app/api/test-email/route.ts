import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function GET() {
  const user = process.env.GMAIL_USER || "info@kigalicarrental.site";
  const pass = process.env.GMAIL_APP_PASSWORD || "";

  if (!pass) {
    return NextResponse.json(
      { error: "GMAIL_APP_PASSWORD is not set in .env.local" },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: user,
      to: user,
      subject: "Test email from Kigali Car Rental",
      text: "Email is working correctly!",
    });
    return NextResponse.json({ success: true, message: "Test email sent! Check your inbox." });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
