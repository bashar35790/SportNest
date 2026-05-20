const GetFeaturedFacilities = async () => {
    const response = await fetch('http://localhost:5000/featured');
    const data = await response.json();
    return data;
}


export default GetFeaturedFacilities;
