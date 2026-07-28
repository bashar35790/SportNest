import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Facilities",
  description: "Browse and book premium sports facilities near you. Filter by sport type, location, and availability.",
};

export default function AllFacilityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
