import api from "../axios/Axios";

export const Getallcategories = async (Setallcategories, page, search) => {
    try {
        const res = await api.get('/getallcategories', {
            params: {
                page: page,
                search: search
            }
        });
        // Always ensure we are setting an array to prevent .map() errors
        Setallcategories(res.data.data || []);
    } catch (error) {
        console.log("Error fetching categories:", error);
        Setallcategories([]);
    }
};
