import { API_BASE_URL } from "./api-config";

let cachedCsrfToken: string | null = null;

export async function fetchCsrfToken(): Promise<string | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/csrf-token`, { credentials: "include" });
    if (!res.ok) return null;
    const data = await res.json();
    cachedCsrfToken = data.csrfToken ?? null;
    return cachedCsrfToken;
  } catch {
    return null;
  }
}

export async function ensureCsrfToken(): Promise<string | null> {
  if (cachedCsrfToken) return cachedCsrfToken;
  return fetchCsrfToken();
}

export function getCsrfTokenFromCookie(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)csrf-token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
}

export function withCsrf(init?: RequestInit): RequestInit {
  const token = cachedCsrfToken ?? getCsrfTokenFromCookie();
  if (!token) return init ?? {};
  return {
    ...init,
    headers: {
      ...init?.headers,
      "X-CSRF-Token": token,
    },
  };
}
