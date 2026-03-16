import api from '../axios/Axios'
import { Opentoast } from './Opentoast';
export const Verifyuser = async (loginmail, loginpassword, Setshowtoast, Settoastmessage, Settoastcolor) => {
    if (!loginmail || !loginpassword) {
        // console.log("please fill all the data");
        Settoastcolor('danger')
        Settoastmessage("please fill all the data")
        Opentoast(Setshowtoast)
    }
    else {
        var data = {
            mail: loginmail,
            password: loginpassword
        }
        try {
            const res = await api.post('/verifyuser', { data: data })
            if (res.data.message === "Login Successfull") {
                console.log(res.data.token);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("loginuser", JSON.stringify(res.data.data));
                Settoastcolor('success')
                Settoastmessage(res.data.message)
                Opentoast(Setshowtoast)
            }
            else {
                Settoastcolor('danger')
                Settoastmessage(res.data.message)
                Opentoast(Setshowtoast)
            }

        } catch (error) {
            // console.log("error");
            Settoastcolor('danger')
            Settoastmessage("error")
            Opentoast(Setshowtoast)

        }
    }
}