import api from "../axios/Axios";
import { Getallbrands } from "./Getallbrands";
import { showSwal } from "./SwalHelper";

export const Deletebrand = async (id, Setallbrands, page, search) => {
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
            const res = await api.delete(`/deletebrand/${id}`);

            if (res.data.message === "Brand Deleted Successfully") {
                await showSwal({
                    title: "Product Deleted!",
                    text: res.data.message || "Brand Deleted Successfully.",
                    icon: "success",
                    timer: 2000
                });

                // Refresh the list immediately
                Getallbrands(Setallbrands, page, search);
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
                text: error.response?.data?.message || "Failed to delete brand",
                icon: "error",
            });

        }
    }
};
