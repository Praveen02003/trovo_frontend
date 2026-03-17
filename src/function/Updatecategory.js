import api from "../axios/Axios";
import { Getallcategories } from "./Getallcategories";
import { Opentoast } from "./Opentoast";

export const Updatecategory = async (editcategorydata, Setallcategories, page, search, Setshowtoast, Settoastcolor, Settoastmessage) => {
    try {
        const formData = new FormData();
        formData.append("category_id", editcategorydata.category_id);
        formData.append("category_name", editcategorydata.category_name);

        // Only append image if a new one was selected
        if (editcategorydata.new_image) {
            formData.append("category_image", editcategorydata.new_image);
        }

        const res = await api.post("/updatecategory", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.data.message === "Category Updated") {
            Settoastcolor("success");
            Settoastmessage(res.data.message);
            Opentoast(Setshowtoast);

            // Refresh List
            Getallcategories(Setallcategories, page, search);
        }
    } catch (error) {
        Settoastcolor("danger");
        Settoastmessage("Error updating category");
        Opentoast(Setshowtoast);
    }
};
