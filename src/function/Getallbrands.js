import api from "../axios/Axios";

export const Getallbrands = async (Setallbrands)=>{
    try {
        const res = await api.get('/getallbrands')
        Setallbrands(res.data.data)
    } catch (error) {
        console.log("error");
    }
}
