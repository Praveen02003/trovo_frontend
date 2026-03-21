import api from '../axios/Axios';

export const Getparticularproduct = async (id, Setparticularproduct) => {
    try {
        // Replace with your actual backend URL
        const response = await api.get(`getparticularproduct/${id}`);

        // Axios stores the JSON response in the .data property
        if (response.data) {
            Setparticularproduct(response.data.data);
            console.log(response.data.data);

        }
    } catch (error) {
        console.error("Error fetching product details:", error.response?.data?.message || error.message);
        // Optional: Set an error state or null if not found
        Setparticularproduct(null);
    }
};
