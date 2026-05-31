const UpdateFacilityApi = async (userId: string, updatedFacility: any) => {
    try {
        const response = await fetch(`http://localhost:5000/facilities/user/${userId}`, {
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