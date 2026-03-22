import api from '../axios/Axios'
import { Opentoast } from "./Opentoast"
import { showSwal } from './SwalHelper';

export const Updatepassword = async (forgetmail, forgetpassword, forgetconfirmpassword) => {
    if (!forgetmail || !forgetpassword || !forgetconfirmpassword) {
        await showSwal({
            title: "Warning!",
            text: "please fill all the data",
            icon: "error",
        });
    }
    else {
        if (forgetpassword !== forgetconfirmpassword) {
            await showSwal({
                title: "Warning!",
                text: "Password Mismatch",
                icon: "error",
            });
        }
        else {
            var data = {
                mail: forgetmail,
                password: forgetpassword,
            }
            try {
                const res = await api.post("/updatepassword", { data: data });
                // console.log(res.data.message);
                if (res.data.message === "Password updated successfully") {
                    await showSwal({
                        title: "Password updated!",
                        text: res.data.message || "Password updated successfully.",
                        icon: "success",
                        timer: 2000
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
                    text: "error",
                    icon: "error",
                });
            }
        }
    }
}