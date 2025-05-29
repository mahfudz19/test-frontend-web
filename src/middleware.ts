import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/auth/login", "/auth/register", "/auth/debug"];
const ADMIN_PATH = "/admin";
const USER_PATH = "/articles";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const isAuthPage = AUTH_PAGES.includes(pathname);
  const isAdminPage = pathname.startsWith(ADMIN_PATH);
  const isUserPage = pathname.startsWith(USER_PATH);

  // === DEV LOGGING ONLY ===
  if (process.env.NODE_ENV === "development") {
    console.log("[MIDDLEWARE]");
    console.log({ pathname, token, role, isAuthPage, isAdminPage, isUserPage });
  }

  let redirectTo: string | null = null;

  if (!token || token === "dummy-token") {
    if (isAdminPage || isUserPage || !isAuthPage) {
      redirectTo = "/auth/login";
    }
  }

  if (token && isAuthPage) {
    redirectTo =
      role === "admin"
        ? "/admin/articles"
        : role === "user"
          ? "/articles"
          : "/auth/login";
  }

  if (isAdminPage && role !== "admin") {
    redirectTo = "/articles";
  }

  const response = redirectTo
    ? NextResponse.redirect(new URL(redirectTo, request.url))
    : NextResponse.next();

  // Debug headers — always applied
  response.headers.set("x-debug-pathname", pathname);
  response.headers.set("x-debug-role", role ?? "none");
  response.headers.set("x-debug-token", token ?? "none");
  response.headers.set("x-debug-redirect", redirectTo ? "yes" : "no");
  if (redirectTo) {
    response.headers.set("x-debug-redirect-to", redirectTo);
  }

  return response;
}

export const config = {
  matcher: ["/admin/:path*", "/articles/:path*", "/auth/:path*", "/"],
  runtime: process.env.NODE_ENV === "development" ? "nodejs" : "edge",
};
