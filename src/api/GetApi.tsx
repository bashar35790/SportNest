const GetFeaturedFacilities = async () => {
    const response = await fetch('http://localhost:5000/featured');
    const data = await response.json();
    return data;
}

const GetAllFacilities = async (search = "") => {
    const url = search ? `http://localhost:5000/all-facility?search=${search}` : 'http://localhost:5000/all-facility';
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const GetOneFacility = async (id: string) => {
    console.log(id);
    const url = `http://localhost:5000/all-facility/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

export { GetFeaturedFacilities, GetAllFacilities, GetOneFacility };
