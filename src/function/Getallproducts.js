import api from '../axios/Axios'
export const Getallproducts = async (Setallproducts, page) => {
    try {
        const res = await api.get(`/getallproducts?page=${page}`)
        console.log(res.data.data);
        
        Setallproducts(res.data.data)
    } catch (error) {
        console.log("error");

    }
}