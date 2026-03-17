import api from "../axios/Axios";
import { Getallcategories } from "./Getallcategories";
import { Opentoast } from "./Opentoast";

export const Addcategory = async (categoryName, categoryImage, Setshowtoast, Settoastcolor, Settoastmessage, Setallcategories, page, search) => {
    try {
        const formData = new FormData();
        formData.append("category_name", categoryName);
        formData.append("category_image", categoryImage);

        const res = await api.post("addcategory", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.data.message === 'Category Created') {
            Settoastmessage(res.data.message);
            Settoastcolor("success");
            Opentoast(Setshowtoast);
            Getallcategories(Setallcategories, page, search);
        }
        else {
            Settoastmessage(res.data.message);
            Settoastcolor("danger");
            Opentoast(Setshowtoast);
        }
    } catch (error) {
        Settoastmessage("Error adding category");
        Settoastcolor("danger");
        Opentoast(Setshowtoast);
    }
};
