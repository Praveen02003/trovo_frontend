import api from "../axios/Axios";

export const Getcurrentcustomer = async (id, Seteachcustomer) => {
    try {
        const res = await api.get(`/vieweachcustomer/${id}`)
        console.log(res.data.data);
        Seteachcustomer(res.data.data)

    } catch (error) {
        console.log("error");

    }

}