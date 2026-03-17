import api from "../axios/Axios"

export const Getallcustomers = async (Setallcustomers, page, status, search) => {
    try {
        const res = await api.get(`/getallcustomers`, {
            params: {
                page: page,
                status: status,
                search: search
            }
        })
        console.log(res.data.data);
        Setallcustomers(res.data.data)

    } catch (error) {
        console.log('error');

    }
}