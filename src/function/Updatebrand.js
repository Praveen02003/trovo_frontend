import api from "../axios/Axios";
import { Getallbrands } from "./Getallbrands";
import { Opentoast } from "./Opentoast";
import { showSwal } from "./SwalHelper";

export const Updatebrand = async (editbranddata, Setallbrands, page, search) => {
    try {
        const res = await api.post(`/updatebrand`, {
            brand_name: editbranddata.brand_name,
            brand_id: editbranddata.brand_id
        });

        if (res.data.message === "Brand Updated Successfully") {
            await showSwal({
                title: "Brand Updated!",
                text: res.data.message || "Brand Updated Successfully.",
                icon: "success",
                timer: 2000
            });
            // Refresh list
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
            text: "Failed to update brand",
            icon: "error",
        });
    }
};
