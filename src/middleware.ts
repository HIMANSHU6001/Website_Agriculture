import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isPublic = path === "/" || path === "/login" || path === "/signup";

  const token = req.cookies.get("token")?.value || "";

  if (!isPublic && token) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/profile", "/login", "/signup"],
};
