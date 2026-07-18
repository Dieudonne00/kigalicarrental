import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSessionToken } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find manager by email
    const manager = await prisma.manager.findUnique({
      where: { email },
    });

    if (!manager) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Check if manager is active
    if (!manager.active) {
      return NextResponse.json(
        { error: "Account is inactive" },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, manager.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Signed, tamper-proof session token (see src/lib/session.ts)
    const sessionToken = await createSessionToken(manager.id);

    // Create response with session cookie
    const response = NextResponse.json(
      {
        success: true,
        manager: {
          id: manager.id,
          email: manager.email,
          name: manager.name,
          role: manager.role,
        },
      },
      { status: 200 }
    );

    // Set HTTP-only cookie
    response.cookies.set("manager_session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
