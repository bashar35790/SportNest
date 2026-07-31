import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  try {
    const baseURL = process.env.NEXT_PUBLIC_BETTER_AUTH_URL || request.nextUrl.origin;
    const res = await fetch(`${baseURL}/api/auth/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    });

    const session = res.ok ? await res.json().catch(() => null) : null;

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
