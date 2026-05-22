interface BookingData {
    facilityName: string;
    date: string;
    timeSlot: string;
    duration: number;
    totalPrice: number;
}

const PostBooking = async (bookingData: BookingData) => {
    const response = await fetch('http://localhost:5000/booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
    });
    const data = await response.json();
    return data;
}

export { PostBooking };