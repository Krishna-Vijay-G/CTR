import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * Optimistic edge check: verifies a Better Auth session cookie exists
 * before letting a request reach /admin/dashboard/*. This is a fast
 * gate only — real authorization (admin role) is enforced server-side
 * in every Server Action and RSC via requireAdmin()/getAdminSession().
 */
export function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);

  if (!sessionCookie) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/dashboard/:path*"],
};
