import api from "../axios/Axios";
import { Opentoast } from "./Opentoast";
import { showSwal } from "./SwalHelper";

export const Updateprofile = async (userprofile) => {

    const formData = new FormData();

    formData.append("user_id", userprofile.user_id);
    formData.append("name", userprofile.name);
    formData.append("email", userprofile.email);
    formData.append("mobilenumber", userprofile.mobilenumber);
    formData.append("address", userprofile.address);

    if (userprofile.newimage) {
        formData.append("image", userprofile.newimage);
    }

    try {

        const res = await api.post(
            "/updateprofile",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        );
        await showSwal({
            title: "Profile Updated!",
            text: res.data.message || "Your profile has been updated successfully.",
            icon: "success",
            timer: 2000
        });

    } catch (err) {
        await showSwal({
            title: "Error!",
            text: "Failed to update profile. Please try again.",
            icon: "error"
        });
    }

};