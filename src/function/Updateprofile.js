import api from "../axios/Axios";
import { Opentoast } from "./Opentoast";

export const Updateprofile = async (userprofile, Settoastcolor, Settoastmessage, Setshowtoast) => {

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
        Settoastcolor("success");
        Settoastmessage(res.data.message);
        Opentoast(Setshowtoast);

    } catch (err) {
        Settoastcolor("danger");
        Settoastmessage("error");
        Opentoast(Setshowtoast);
    }

};