export async function getSessionToken(): Promise<string | null> {
  try {
    const res = await fetch("/api/session-token", { credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.token ?? null;
  } catch {
    return null;
  }
}
