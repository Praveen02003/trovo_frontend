import api from "../axios/Axios"

export const Getfewproducts = async (Setfewproducts) => {
    try {
        const res = await api.get('/fewproducts');
        console.log(res.data.data);

        Setfewproducts(res.data.data)
    } catch (error) {
        console.log("error");

    }
}