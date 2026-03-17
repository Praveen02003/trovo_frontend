import api from '../axios/Axios'
export const Getallproducts = async (Setallproducts, page, search, category) => {
    try {
        const res = await api.get(`/getallproducts`, {
            params: {
                page: page,
                category: category,
                search: search
            }
        })

        Setallproducts(res.data.data)
    } catch (error) {
        console.log("error");

    }
}