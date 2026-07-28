import { API_BASE_URL } from "@/lib/api-config";

interface BookingData {
    facilityName: string;
    date: string;
    timeSlot: string;
    duration: number;
    totalPrice: number;
}

const PostBooking = async (bookingData: BookingData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/booking`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });
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