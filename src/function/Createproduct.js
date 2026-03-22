import api from "../axios/Axios";
import { showSwal } from "./SwalHelper";

export const Createproduct = async (
    addproduct
) => {
    if (
        !addproduct.name ||
        !addproduct.description ||
        !addproduct.original_price ||
        !addproduct.offer ||
        !addproduct.stock ||
        !addproduct.image ||
        !addproduct.category_id ||
        !addproduct.brand_id
    ) {
        await showSwal({
            title: "Warning!",
            text: "Please fill all the fields.",
            icon: "error",
        });
        return;
    }

    try {
        const formData = new FormData();
        formData.append("name", addproduct.name);
        formData.append("description", addproduct.description);
        formData.append("original_price", Number(addproduct.original_price));
        formData.append("price", Number(addproduct.price));
        formData.append("offer", Number(addproduct.offer));
        formData.append("stock", Number(addproduct.stock));
        formData.append("category_id", addproduct.category_id);
        formData.append("brand_id", addproduct.brand_id);
        formData.append("status", addproduct.status || "active");
        formData.append("image", addproduct.image);

        const res = await api.post("/createproduct", formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });

        if (res.data.message === "Product Created Successfully") {
            await showSwal({
                title: "Product Created!",
                text: res.data.message || "Product Created Successfully.",
                icon: "success",
                timer: 2000
            });
        }
        else if (res.data.message === "Product Name Already Exists") {
            await showSwal({
                title: "Warning!",
                text: res.data.message || "Product Name Already Exists.",
                icon: "error",
            });
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
            text: "Something went wrong",
            icon: "error",
        });
    }
};