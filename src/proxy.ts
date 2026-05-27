import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./lib/auth";

export async function proxy(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      return NextResponse.redirect(
        new URL("/auth/login", request.url)
      );
    }

    return NextResponse.next();
  } catch (error) {
    console.log("Proxy Error:", error);

    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/all-facility/:path"],
};
