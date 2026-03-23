import api from "../axios/Axios";

export const Getcategories = async (Setgetcategories) => {
    try {
        const res = await api.get('/getcategories');
        // Check if data exists before setting state
        if (res.data && res.data.data) {
            console.log(res.data.data);
            
            Setgetcategories(res.data.data);
        }
    } catch (error) {
        console.error("Error fetching categories:", error);
    }
};
