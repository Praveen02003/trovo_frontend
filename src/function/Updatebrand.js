import api from "../axios/Axios";
import { Getallbrands } from "./Getallbrands";
import { Opentoast } from "./Opentoast";

export const Updatebrand = async (editbranddata, Setallbrands, page, search, Setshowtoast, Settoastcolor, Settoastmessage) => {
    try {
        const res = await api.post(`/updatebrand`, {
            brand_name: editbranddata.brand_name,
            brand_id: editbranddata.brand_id
        });

        if (res.status === 200) {
            Settoastcolor("success");
            Settoastmessage("Brand updated successfully!");
            Opentoast(Setshowtoast)


            // Refresh list
            Getallbrands(Setallbrands, page, search);
        }
    } catch (error) {
        Settoastcolor("danger");
        Settoastmessage("Failed to update brand");
        Opentoast(Setshowtoast)
    }
};
