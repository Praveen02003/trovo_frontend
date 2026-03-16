import api from "../axios/Axios";
import { Opentoast } from "./Opentoast";

export const Createproduct = async (
    addproduct,
    Settoastcolor,
    Settoastmessage,
    Setshowtoast
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
        Settoastcolor("danger");
        Settoastmessage("Please fill all the fields");
        Opentoast(Setshowtoast);
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
            Settoastcolor("success");
            Settoastmessage(res.data.message);
            Opentoast(Setshowtoast);
        }
        else if (res.data.message === "Product Name Already Exists") {
            Settoastcolor("danger");
            Settoastmessage(res.data.message);
            Opentoast(Setshowtoast);
        }
        else {
            Settoastcolor("success");
            Settoastmessage(res.data.message);
            Opentoast(Setshowtoast);
        }
    } catch (error) {
        Settoastcolor("danger");
        Settoastmessage("Something went wrong");
        Opentoast(Setshowtoast);
        console.log(error);
    }
};