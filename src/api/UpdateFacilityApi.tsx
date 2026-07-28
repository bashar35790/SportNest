import { API_BASE_URL } from "@/lib/api-config";

export interface FacilityUpdateData {
  name?: string;
  facility_type?: string;
  image?: string;
  location?: string;
  price_per_hour?: number;
  capacity?: number;
  available_slots?: string[];
  description?: string;
}

const UpdateFacilityApi = async (userId: string, updatedFacility: FacilityUpdateData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/facilities/user/${userId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedFacility),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to update facility:', error);
        return [];
    }
}

export { UpdateFacilityApi };
