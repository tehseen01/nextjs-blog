import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value || "";

  if (
    !token &&
    (path === "/new" ||
      path.startsWith("/dashboard") ||
      path.startsWith("/setting"))
  ) {
    return NextResponse.redirect(new URL("/signin", request.nextUrl));
  }
}

export const config = {
  matcher: [
    "/",
    "/signin",
    "/signup",
    "/new",
    "/dashboard/:path*",
    "/setting/:path*",
  ],
};
