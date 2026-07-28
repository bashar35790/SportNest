"use client";

import { useEffect, useRef } from "react";
import { fetchCsrfToken } from "@/lib/csrf";

export function CsrfProvider({ children }: { children: React.ReactNode }) {
  const fetched = useRef(false);

  useEffect(() => {
    if (fetched.current) return;
    fetched.current = true;
    fetchCsrfToken();
  }, []);

  return <>{children}</>;
}
