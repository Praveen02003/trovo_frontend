import api from '../axios/Axios'
import { Opentoast } from './Opentoast';
import { showSwal } from './SwalHelper';
export const Verifyuser = async (loginmail, loginpassword, navigate) => {

    if (!loginmail || !loginpassword) {
        await showSwal({
            title: "Warning!",
            text: "please fill all the data",
            icon: "error",
        });
    }
    else {
        var data = {
            mail: loginmail,
            password: loginpassword
        }
        try {
            const res = await api.post('/verifyuser', { data: data })
            if (res.data.message === "Login Successfull") {
                // console.log(res.data.token);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("loginuser", JSON.stringify(res.data.data));
                await showSwal({
                    title: "User Verified!",
                    text: res.data.message || "Login Successfull.",
                    icon: "success",
                    timer: 2000
                });
                navigate('/');
            }
            else {
                await showSwal({
                    title: "Warning!",
                    text: res.data.message,
                    icon: "error",
                });
            }

        } catch (error) {
            // console.log("error");
            await showSwal({
                title: "Warning!",
                text: "error",
                icon: "error",
            });
        }
    }
}