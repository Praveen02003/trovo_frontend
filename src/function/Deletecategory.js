import api from "../axios/Axios";
import { Getallcategories } from "./Getallcategories";
import { Opentoast } from "./Opentoast";

export const Deletecategory = async (id, Setallcategories, page, search, Setshowtoast, Settoastcolor, Settoastmessage) => {
    try {
        const res = await api.delete(`/deletecategory/${id}`);

        if (res.status === 200) {
            Settoastcolor("success");
            Settoastmessage("Category deleted successfully!");
            Opentoast(Setshowtoast)

            // Refresh the list immediately
            Getallcategories(Setallcategories, page, search);
        }
    } catch (error) {
        Settoastcolor("danger");
        Settoastmessage("Failed to delete category");
        Opentoast(Setshowtoast)
    }
};
