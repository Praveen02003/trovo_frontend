import api from "../axios/Axios"

export const Getmyprofile = async (id, Setuserprofile) => {
    try {
        const res = await api.get(`/getuserprofile/${id}`)
        console.log(res.data.data);
        Setuserprofile(res.data.data)

    } catch (error) {
        console.log("error");

    }
}