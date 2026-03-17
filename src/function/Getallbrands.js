import api from '../axios/Axios';

export const Getallbrands = async (Setallbrands, page, search) => {
    try {
        const res = await api.get(`/getallbrands`, {
            params: {
                page: page,
                search: search
            }
        });

        // Ensure you set res.data.data (the array) to state
        Setallbrands(res.data.data || []);
    } catch (error) {
        console.log("Error fetching brands", error);
        Setallbrands([]);
    }
};
