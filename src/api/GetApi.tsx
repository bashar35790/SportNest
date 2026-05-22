const GetFeaturedFacilities = async () => {
    try {
        const response = await fetch('http://localhost:5000/featured');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch featured facilities:', error);
        return [];
    }
}

const GetAllFacilities = async (search = "") => {
    try {
        const url = search ? `http://localhost:5000/all-facility?search=${search}` : 'http://localhost:5000/all-facility';
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch all facilities:', error);
        return [];
    }
}

const GetMyBookings = async (userId: string) => {
    try {
        const url = `http://localhost:5000/my-bookings/${userId}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch user bookings:', error);
        return [];
    }
}

const GetOneFacility = async (id: string) => {
    try {
        const url = `http://localhost:5000/all-facility/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to fetch one facility:', error);
        return {};
    }
}

export { GetFeaturedFacilities, GetAllFacilities, GetOneFacility, GetMyBookings };
