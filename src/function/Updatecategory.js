import api from "../axios/Axios";
import { Getallcategories } from "./Getallcategories";
import { Opentoast } from "./Opentoast";
import { showSwal } from "./SwalHelper";

export const Updatecategory = async (editcategorydata, Setallcategories, page, search) => {
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
            await showSwal({
                title: "Category Updated!",
                text: res.data.message || "Category Updated Successfully.",
                icon: "success",
                timer: 2000
            });
            // Refresh List
            Getallcategories(Setallcategories, page, search);
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
            text: "Error updating category",
            icon: "error",
        });
    }
};
