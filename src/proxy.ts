import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the request is for a manager route (except login)
  if (pathname.startsWith("/manager") && pathname !== "/manager/login") {
    // Check for session cookie
    const sessionCookie = request.cookies.get("manager_session");

    if (!sessionCookie) {
      // Redirect to login if no session
      const loginUrl = new URL("/manager/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If accessing login page while already authenticated, redirect to dashboard
  if (pathname === "/manager/login") {
    const sessionCookie = request.cookies.get("manager_session");

    if (sessionCookie) {
      const dashboardUrl = new URL("/manager/dashboard", request.url);
      return NextResponse.redirect(dashboardUrl);
    }
  }

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: "/manager/:path*",
};
