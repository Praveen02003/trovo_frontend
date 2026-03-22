import api from "../axios/Axios";
import { Opentoast } from "./Opentoast";
import { showSwal } from "./SwalHelper";

export const Updateproduct = async (eachproduct) => {
    try {
        const formData = new FormData();
        formData.append("product_id", eachproduct.product_id);
        formData.append("name", eachproduct.product_name);
        formData.append("description", eachproduct.description);
        formData.append("original_price", Number(eachproduct.original_price));
        formData.append("price", Number(eachproduct.price));
        formData.append("offer", Number(eachproduct.offer));
        formData.append("stock", Number(eachproduct.stock));
        formData.append("category_id", eachproduct.category_id);
        formData.append("brand_id", eachproduct.brand_id);
        formData.append("status", eachproduct.status);
        formData.append("image", eachproduct.image); // existing image filename

        // Correctly append the new image if it exists
        if (eachproduct.newimage) {
            formData.append("newimage", eachproduct.newimage);
        }

        const res = await api.post("/updateproduct", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.data.message === "Product Updated Successfully") {
            await showSwal({
                title: "Product Updated!",
                text: res.data.message || "Product Updated Successfully.",
                icon: "success",
                timer: 2000
            });
        } else {
            await showSwal({
                title: "Product Error!",
                text: res.data.message,
                icon: "error",
            });
        }
    } catch (error) {
        await showSwal({
            title: "Product Error!",
            text: "Network Error",
            icon: "error",
        });
    }
};
