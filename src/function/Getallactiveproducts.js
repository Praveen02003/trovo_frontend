import api from '../axios/Axios';

// function/Getallactiveproducts.js
export const Getallactiveproducts = async (Setgetactiveproducts, category, search) => {
    try {
        const res = await api.get(`/getallactiveproducts?category=${category}&search=${search}`);
        // Log this to see exactly what the backend is sending
        console.log("Backend Response:", res.data);

        if (res.data && res.data.data) {
            Setgetactiveproducts(res.data.data);
        } else {
            Setgetactiveproducts([]); // Fallback to empty array
        }
    } catch (error) {
        Setgetactiveproducts([]);
    }
};

