import { getSessionCookie } from "better-auth/cookies";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const token = getSessionCookie(request);
  return Response.json({ token: token ?? null });
}
