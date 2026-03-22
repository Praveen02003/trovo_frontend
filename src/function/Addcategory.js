import api from "../axios/Axios";
import { Getallcategories } from "./Getallcategories";
import { showSwal } from "./SwalHelper";

export const Addcategory = async (categoryName, categoryImage, Setallcategories, page, search) => {
    try {
        const formData = new FormData();
        formData.append("category_name", categoryName);
        formData.append("category_image", categoryImage);

        const res = await api.post("addcategory", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.data.message === 'Category Created') {
            await showSwal({
                title: "Category Created!",
                text: res.data.message || "Category Created Successfully.",
                icon: "success",
                timer: 2000
            });
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
            text: "Error adding category",
            icon: "error",
        });
    }
};
