import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySessionToken } from "@/lib/session";

// Login/logout must stay reachable without a valid session - everything
// else under /api/manager/* mutates or reads admin data and previously had
// no auth check of its own (the old proxy only guarded /manager/* pages,
// not /api/manager/* routes).
const PUBLIC_API_PATHS = new Set(["/api/manager/login", "/api/manager/logout"]);

const CANONICAL_HOST = "www.kigalicarrental.site";

export default async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Both the apex and www domains were serving identical content with no
  // redirect between them - Google sees that as two duplicate URLs and can
  // stall indexing while it tries to resolve which one is canonical.
  const hostname = request.headers.get("host") || "";
  if (hostname === "kigalicarrental.site") {
    const url = new URL(request.url);
    url.hostname = CANONICAL_HOST;
    return NextResponse.redirect(url, 308);
  }

  const sessionCookie = request.cookies.get("manager_session")?.value;

  const isProtectedPage = pathname.startsWith("/manager") && pathname !== "/manager/login";
  const isProtectedApi = pathname.startsWith("/api/manager") && !PUBLIC_API_PATHS.has(pathname);

  if (isProtectedPage || isProtectedApi) {
    const session = await verifySessionToken(sessionCookie);
    if (!session) {
      if (isProtectedApi) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/manager/login", request.url));
    }
  }

  // Already authenticated and hitting the login page - skip straight to the dashboard.
  if (pathname === "/manager/login") {
    const session = await verifySessionToken(sessionCookie);
    if (session) {
      return NextResponse.redirect(new URL("/manager/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Configure which routes the proxy should run on - now everything except
// static assets, since the host-canonicalization redirect above must apply
// sitewide, not just to /manager and /api/manager.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.svg).*)"],
};
