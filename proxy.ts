import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected route patterns. Match on whole path segments so a route like
  // "/agents" (public marketing page) isn't caught by a "/agent" prefix.
  // Note: field agents now live in a separate app, so "/agent" is no longer
  // a protected route here.
  const protectedRoutes = ["/dashboard"];
  const isProtectedRoute = protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  if (!isProtectedRoute) {
    return NextResponse.next();
  }

  // Check for auth token in cookies or localStorage (via request headers)
  // Since middleware runs on the server, we check cookies
  const authStorage = request.cookies.get("auth-storage");

  if (!authStorage) {
    // No auth data, redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Parse the auth storage
    const authData = JSON.parse(authStorage.value);

    // Check if user has access token
    if (!authData?.state?.accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // User is authenticated, allow access
    return NextResponse.next();
  } catch (error) {
    // Failed to parse auth data, redirect to login
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|login|signup|forgot-password|reset-password).*)",
  ],
};
