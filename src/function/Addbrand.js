import api from "../axios/Axios";
import { Getallbrands } from "./Getallbrands";
import { Opentoast } from "./Opentoast";
import { showSwal } from "./SwalHelper";

export const Addbrand = async (branddata, Setallbrands, page, search) => {
    try {
        const res = await api.post("/addbrand", {
            brand_name: branddata
        });

        if (res.data.message === 'Brand created') {
            await showSwal({
                title: "Product Created!",
                text: res.data.message || "Brand Created Successfully.",
                icon: "success",
                timer: 2000
            });
            Getallbrands(Setallbrands, page, search);
        }
        else {
            await showSwal({
                title: "Warning!",
                text: res.data.message,
                icon: "error",
            });
        }
    } catch (error) {
        await showSwal({
            title: "Warning!",
            text: "Failed to add brand",
            icon: "error",
        });
    }
};
