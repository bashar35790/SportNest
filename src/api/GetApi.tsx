import { API_BASE_URL } from "@/lib/api-config";

const GetFeaturedFacilities = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/featured`);
        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return { facilities: [] };
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch featured facilities:', error);
        return { facilities: [] };
    }
}

const GetAllFacilities = async (search = "", page = 1, limit = 12) => {
    try {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (search) params.set("search", search);
        const url = `${API_BASE_URL}/all-facility?${params}`;
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) return { data: [], total: 0, page: 1, totalPages: 0 };
        return await response.json() as { data: Record<string, unknown>[]; total: number; page: number; totalPages: number };
    } catch (error) {
        console.error('Failed to fetch all facilities:', error);
        return { data: [], total: 0, page: 1, totalPages: 0 };
    }
}

const GetMyBookings = async (userId: string) => {
    try {
        const url = `${API_BASE_URL}/my-bookings/${userId}`;
        const response = await fetch(url, {
            credentials: "include"
        });
        if (!response.ok) return [];
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user bookings:', error);
        return [];
    }
}

const GetOneFacility = async (id: string) => {
    try {
        const url = `${API_BASE_URL}/all-facility/${id}`;
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) return {};
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch one facility:', error);
        return {};
    }
}

const GetFacilityAvailability = async (facilityId: string, date: string) => {
    try {
        const url = `${API_BASE_URL}/all-facility/${facilityId}/availability?date=${encodeURIComponent(date)}`;
        const response = await fetch(url);
        if (!response.ok) return { availableSlots: [] as string[], bookedSlots: [] as string[] };
        const data = await response.json();
        return {
            availableSlots: (data.availableSlots as string[]) || [],
            bookedSlots: (data.bookedSlots as string[]) || [],
        };
    } catch (error) {
        console.error('Failed to fetch facility availability:', error);
        return { availableSlots: [] as string[], bookedSlots: [] as string[] };
    }
}

const GetUserAddFacilities = async (userId: string) => {
    try {
        const url = `${API_BASE_URL}/facilities/user/${userId}`;
        const response = await fetch(url, {
            credentials: "include"
        });
        if (!response.ok) return [];
        const data = await response.json();
        return data.facilities || [];
    } catch (error) {
        console.error('Failed to fetch user facilities:', error);
        return [];
    }
}

export { GetFeaturedFacilities, GetAllFacilities, GetOneFacility, GetMyBookings, GetUserAddFacilities, GetFacilityAvailability };
