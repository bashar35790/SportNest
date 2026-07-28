import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication",
  description: "Sign in or create an account on SportNest to book premium sports facilities.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
