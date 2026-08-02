import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });
    return Response.json({ token: token ?? null });
  } catch {
    return Response.json({ token: null });
  }
}
