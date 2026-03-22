import api from "../axios/Axios";
import { Getallcategories } from "./Getallcategories";
import { Opentoast } from "./Opentoast";
import { showSwal } from "./SwalHelper";

export const Deletecategory = async (id, Setallcategories, page, search) => {
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
            const res = await api.delete(`/deletecategory/${id}`);

            if (res.data.message === "Category Deleted Successfully") {
                await showSwal({
                    title: "Category Deleted!",
                    text: res.data.message || "Category Deleted Successfully.",
                    icon: "success",
                    timer: 2000
                });

                // Refresh the list immediately
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
                text: "Failed to delete category",
                icon: "error",
            });
        }
    }
};
