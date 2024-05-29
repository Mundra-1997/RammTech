// middleware.js
import { NextRequest, NextResponse } from "next/server";

export default function middleware(req) {
  const authToken = req.cookies.get("token")?.value;

  if (
    req.nextUrl.pathname === "/login" ||
    req.nextUrl.pathname === "/register"
  ) {
    if (authToken) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  } else {
    if (!authToken) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Allow the request to proceed if none of the conditions above matched
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/create-category"], // Adjust routes as needed
};
