// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const isAuthenticated = request.cookies.get("token")?.value;

//   const { pathname } = request.nextUrl;

//   // Allow access to sign-in page without redirect
//   if (pathname.startsWith("/signin")) {
//     return NextResponse.next();
//   }

//   // If user is not authenticated and trying to access protected routes
//   if (!isAuthenticated && pathname.startsWith("/")) {
//     // return NextResponse.redirect(new URL("/signin", request.url));
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // Read cookies
  // const token = req.cookies.get("token")?.value;
  // const wizardCompleted = req.cookies.get("wizardCompleted")?.value === "true";
  // const customizationCompleted =
  //   req.cookies.get("customizationCompleted")?.value === "true";

  // // Step 1: If not logged in, allow only /login
  // if (!token && !pathname.startsWith("/login")) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // // Step 2: If logged in but wizard not completed, force /form-wizard
  // if (token && !wizardCompleted && !pathname.startsWith("/")) {
  //   return NextResponse.redirect(new URL("/", req.url));
  // }

  // // Step 3: Wizard done but customization not completed, force /customization
  // if (
  //   token &&
  //   wizardCompleted &&
  //   !customizationCompleted &&
  //   !pathname.startsWith("/customization")
  // ) {
  //   return NextResponse.redirect(new URL("/customization", req.url));
  // }

  // Step 4: Everything done → allow anywhere
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply to all pages except static files and APIs
    "/((?!_next/static|_next/image|favicon.ico|public|api).*)",
  ],
};
