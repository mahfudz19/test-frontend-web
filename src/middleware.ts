import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { dummyUsers } from "./lib/dummy-auth";

const PUBLIC_FILE = /\.(.*)$/;
const AUTH_PAGES = ["/auth/login", "/auth/register", "/auth/debug"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const userValid = dummyUsers.some(
    (user) => user.role === role && token === "dummy-token"
  );

  if (!userValid) {
    if (
      pathname !== "/auth/login" &&
      pathname !== "/auth/register" &&
      pathname !== "/auth/debug"
    ) {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
    return NextResponse.next();
  }

  if (role === "user" && pathname.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/articles", request.url));
  }

  if (AUTH_PAGES.includes(pathname)) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/articles", request.url));
    } else {
      return NextResponse.redirect(new URL("/articles", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/articles/:path*", "/auth/:path*", "/"],
};
