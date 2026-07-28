import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Facility",
  description: "Create a new sports facility listing. Set pricing, availability, and details.",
};

export default function AddFacilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
