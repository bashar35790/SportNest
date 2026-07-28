import { API_BASE_URL } from "@/lib/api-config";

const UpdateFacilityApi = async (userId: string, updatedFacility: any) => {
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