import api from "../axios/Axios";
import { Getallproducts } from "./Getallproducts";
import { showSwal } from "./SwalHelper";

export const Deleteproduct = async (id, Setallproducts, page) => {
    const result = await showSwal({
        title: "Are you sure?",
        text: "Do you want to Delete?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Delete",
        cancelButtonText: "Cancel",
    });
    if (result.isConfirmed) {
        try {
            const res = await api.get(`/deleteproduct/${id}`)
            if (res.data.message === "Product Deleted Successfully") {
                await showSwal({
                    title: "Product Deleted!",
                    text: res.data.message || "Product Deleted Successfully.",
                    icon: "success",
                    timer: 2000
                });
                Getallproducts(Setallproducts, page);
            }
            else {
                await showSwal({
                    title: "Product Error!",
                    text: res.data.message || "Product Deleted Failed.",
                    icon: "error",
                });
            }
        } catch (error) {
            await showSwal({
                title: "Product Error!",
                text: "Product Deleted Failed.",
                icon: "error",
            });

        }
    }
}