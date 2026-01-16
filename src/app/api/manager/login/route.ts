import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    console.log("Login attempt for:", email);
    console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find manager by email
    console.log("Querying database for manager...");
    const manager = await prisma.manager.findUnique({
      where: { email },
    });
    console.log("Manager found:", !!manager);

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

    // Create session token (simple approach - in production use JWT or next-auth)
    const sessionToken = Buffer.from(
      `${manager.id}:${Date.now()}`
    ).toString("base64");

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
