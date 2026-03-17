import api from "../axios/Axios";
import { Getallbrands } from "./Getallbrands";
import { Opentoast } from "./Opentoast";

export const Deletebrand = async (id, Setallbrands, page, search, Setshowtoast, Settoastcolor, Settoastmessage) => {
    try {
        const res = await api.delete(`/deletebrand/${id}`);

        if (res.status === 200) {
            Settoastcolor("success");
            Settoastmessage("Brand deleted successfully!");
            Opentoast(Setshowtoast)

            // Refresh the list immediately
            Getallbrands(Setallbrands, page, search);
        }
    } catch (error) {
        console.error("Error deleting brand:", error);
        Settoastcolor("danger");
        Settoastmessage(error.response?.data?.message || "Failed to delete brand");
        Opentoast(Setshowtoast)

    }
};
