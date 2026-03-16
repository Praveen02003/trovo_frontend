import api from "../axios/Axios"

export const Getcurrentproduct = async (id, Seteachproduct) => {
    try {
        const res = await api.get(`/getcurrentproduct/${id}`);
        console.log(res.data.data);
        Seteachproduct(res.data.data)
    } catch (error) {
        console.log("error");
    }
}