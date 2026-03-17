import api from "../axios/Axios";
import { Getallbrands } from "./Getallbrands";
import { Opentoast } from "./Opentoast";

export const Addbrand = async (branddata, Setshowtoast, Settoastcolor, Settoastmessage, Setallbrands, page, search) => {
    try {
        const res = await api.post("/addbrand", {
            brand_name: branddata
        });

        if (res.data.message === 'Brand created') {
            Settoastmessage(res.data.message);
            Settoastcolor("success");
            Opentoast(Setshowtoast)
            Getallbrands(Setallbrands, page, search);

        }
        else {
            Settoastmessage(res.data.message);
            Settoastcolor("danger");
            Opentoast(Setshowtoast)
        }
    } catch (error) {
        Settoastmessage("Failed to add brand");
        Settoastcolor("danger");
        Opentoast(Setshowtoast)
    }
};
