import api from "../axios/Axios"
import { Getallcustomers } from "./Getallcustomers";
import { Getcurrentcustomer } from "./Getcurrentcustomer";
import { Opentoast } from "./Opentoast";
import { showSwal } from "./SwalHelper";

export const Blockcustomer = async (id, Setallcustomers, page, status, search, Seteachcustomer) => {
    try {
        const res = await api.get(`/blockcustomer/${id}`)
        if (res.data.message === "User Blocked Successfully") {
            await showSwal({
                title: "User Blocked!",
                text: res.data.message || "User Blocked Successfully.",
                icon: "success",
                timer: 2000
            });
        }
        else if (res.data.message === "User UnBlocked Successfully") {
            await showSwal({
                title: "User UnBlocked!",
                text: res.data.message || "User UnBlocked Successfully.",
                icon: "success",
                timer: 2000
            });
        }
        else {
            await showSwal({
                title: "Warning!",
                text: res.data.message,
                icon: "error",
            });
        }
        Getallcustomers(Setallcustomers, page, status, search);
        Getcurrentcustomer(id, Seteachcustomer);

    } catch (error) {
        await showSwal({
            title: "Warning!",
            text: "Failed to blocked user.",
            icon: "error",
        });
    }
}