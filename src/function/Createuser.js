import api from '../axios/Axios'
import { showSwal } from './SwalHelper';
export const Createuser = async (signupname, signupmail, signuppassword, signupconfirmpassword, signupmobilenumber, signupaddress) => {
    if (!signupname || !signupmail || !signuppassword || !signupconfirmpassword || !signupmobilenumber || !signupaddress) {
        await showSwal({
            title: "Warning!",
            text: "please fill all the data",
            icon: "error",
        });
    }
    else {
        if (signuppassword !== signupconfirmpassword) {
            await showSwal({
                title: "Warning!",
                text: "Password Mismatch",
                icon: "error",
            });
        }
        else {
            var data = {
                name: signupname,
                mail: signupmail,
                password: signuppassword,
                mobile: signupmobilenumber,
                address: signupaddress
            }
            try {

                const res = await api.post("/createuser", { data: data });
                // console.log(res.data.message);
                if (res.data.message === "User created successfully") {
                    await showSwal({
                        title: "User created!",
                        text: res.data.message || "User created successfully.",
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
