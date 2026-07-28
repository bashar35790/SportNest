import { API_BASE_URL } from "./api-config";

export async function fetchCsrfToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/csrf-token`, { credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    return data.csrfToken ?? null;
  } catch {
    return null;
  }
}

export function getCsrfTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)csrf-token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function withCsrf(init?: RequestInit): RequestInit {
  const token = getCsrfTokenFromCookie();
  if (!token) return init ?? {};
  return {
    ...init,
    headers: {
      ...init?.headers,
      "X-CSRF-Token": token,
    },
  };
}
