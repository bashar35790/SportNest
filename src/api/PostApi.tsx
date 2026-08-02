import { API_BASE_URL } from "@/lib/api-config";
import { ensureCsrfToken, withCsrf } from "@/lib/csrf";
import { getSessionToken } from "@/lib/session-token";

interface BookingData {
    facilityId: string;
    facilityName: string;
    date: string;
    timeSlot: string;
    duration: number;
    idempotencyKey: string;
}

const PostBooking = async (bookingData: BookingData) => {
    try {
        await ensureCsrfToken();
        const sessionToken = await getSessionToken();
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };
        if (sessionToken) headers['x-session-token'] = sessionToken;
        const response = await fetch(`${API_BASE_URL}/booking`, withCsrf({
            method: 'POST',
            credentials: 'include',
            headers,
            body: JSON.stringify(bookingData),
        }));
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Failed to book facility');
        }
        return data;
    } catch (error) {
        throw error;
    }
}

export { PostBooking };
