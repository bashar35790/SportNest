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

const GetAllFacilities = async (search = "") => {
    try {
        const url = search ? `${API_BASE_URL}/all-facility?search=${search}` : `${API_BASE_URL}/all-facility`;
        const response = await fetch(url, { credentials: "include" });
        if (!response.ok) return [];
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch all facilities:', error);
        return [];
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

export { GetFeaturedFacilities, GetAllFacilities, GetOneFacility, GetMyBookings, GetUserAddFacilities };
