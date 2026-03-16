import api from "../axios/Axios";

export const Getallcategories = async (Setallcategories)=>{
    try {
        const res = await api.get('/getallcategories')
        console.log(res.data.data);
        
        Setallcategories(res.data.data)
    } catch (error) {
        console.log("error");
    }
}