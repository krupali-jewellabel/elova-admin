import { NextResponse } from "next/server";

export function middleware(request) {
  const isAuthenticated = request.cookies.get("token")?.value;

  const { pathname } = request.nextUrl;

  // Allow access to sign-in page without redirect
  if (pathname.startsWith("/signin")) {
    return NextResponse.next();
  }

  // If user is not authenticated and trying to access protected routes
  if (!isAuthenticated && pathname.startsWith("/")) {
    // return NextResponse.redirect(new URL("/signin", request.url));
    return NextResponse.next();
  }

  return NextResponse.next();
}
