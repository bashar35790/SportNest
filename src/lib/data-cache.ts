import { cache } from "react";
import { API_BASE_URL } from "./api-config";

export interface CachedFacility {
  _id: string;
  name: string;
  image: string;
  facility_type: string;
  location: string;
  price_per_hour: number;
  capacity: number;
  available_slots: string[];
  description: string;
}

export const getCachedFacility = cache(async (id: string): Promise<CachedFacility | null> => {
  const res = await fetch(`${API_BASE_URL}/all-facility/${id}`, {
    credentials: "include",
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return res.json() as Promise<CachedFacility>;
});
