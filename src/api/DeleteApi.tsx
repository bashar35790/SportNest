import { API_BASE_URL } from "@/lib/api-config";
import { ensureCsrfToken, withCsrf } from "@/lib/csrf";
import toast from 'react-hot-toast';

async function DeleteBooking(bookingId: string) {
    try {
        await ensureCsrfToken();
        const response = await fetch(`${API_BASE_URL}/my-bookings/${bookingId}`, withCsrf({
            method: "DELETE",
            credentials: "include",
        }));
        const data = await response.json();
        if (data.success) {
            toast.success("Booking cancelled successfully");
        }
        else {
            toast.error("Failed to cancel booking");
        }
    } catch (error) {
        toast.error("Failed to cancel booking");
    }
}

async function DeleteFacility(facilityId: string) {
    try {
        await ensureCsrfToken();
        const response = await fetch(`${API_BASE_URL}/facilities/user/${facilityId}`, withCsrf({
            method: "DELETE",
            credentials: "include",
        }));
        const data = await response.json();
        if (data.success && data.data) {
            toast.success("Facility deleted successfully");
            return true;
        } else {
            toast.error("Failed to delete facility");
            return false;
        }
    } catch (error) {
        console.log(error);
        toast.error("Failed to delete facility");
        return false;
    }
}

export { DeleteBooking, DeleteFacility }
