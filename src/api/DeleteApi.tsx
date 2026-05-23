import toast from 'react-hot-toast';

async function DeleteBooking(bookingId: string) {
    try {
        const response = await fetch(`http://localhost:5000/my-bookings/${bookingId}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if (data.deletedCount > 0) {
            toast.success("Booking deleted successfully");
        }
        else {
            toast.error("Failed to delete booking");
        }
    } catch (error) {
        console.log(error);
    }
}

export { DeleteBooking }
