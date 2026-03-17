import api from "../axios/Axios"
import { Getallcustomers } from "./Getallcustomers";
import { Getcurrentcustomer } from "./Getcurrentcustomer";
import { Opentoast } from "./Opentoast";

export const Blockcustomer = async (id, Settoastmessage, Setshowtoast, Settoastcolor, Setallcustomers, page, status, search, Seteachcustomer) => {
    try {
        const res = await api.get(`/blockcustomer/${id}`)
        console.log(res.data.message);
        Settoastcolor("success");
        Settoastmessage(res.data.message);
        Opentoast(Setshowtoast);
        Getallcustomers(Setallcustomers, page, status, search);
        Getcurrentcustomer(id, Seteachcustomer);

    } catch (error) {
        console.log("error");

    }
}