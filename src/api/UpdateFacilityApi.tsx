import { API_BASE_URL } from "@/lib/api-config";
import { ensureCsrfToken, withCsrf } from "@/lib/csrf";
import { getSessionToken } from "@/lib/session-token";

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
        await ensureCsrfToken();
        const sessionToken = await getSessionToken();
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (sessionToken) headers['Authorization'] = `Bearer ${sessionToken}`;
        const response = await fetch(`${API_BASE_URL}/facilities/user/${userId}`, withCsrf({
            method: "PATCH",
            credentials: "include",
            headers,
            body: JSON.stringify(updatedFacility),
        }));
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to update facility:', error);
        return [];
    }
}

export { UpdateFacilityApi };
