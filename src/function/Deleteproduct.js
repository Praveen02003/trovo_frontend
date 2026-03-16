import api from "../axios/Axios";
import { Getallproducts } from "./Getallproducts";
import { Opentoast } from "./Opentoast";

export const Deleteproduct = async (id, Settoastmessage, Setshowtoast, Settoastcolor, Setallproducts, page) => {
    try {
        const res = await api.get(`/deleteproduct/${id}`)
        Settoastcolor("success");
        Settoastmessage(res.data.message);
        Opentoast(Setshowtoast);
        Getallproducts(Setallproducts, page);
        console.log(res.data.message);

    } catch (error) {
        console.log("error");

    }
}