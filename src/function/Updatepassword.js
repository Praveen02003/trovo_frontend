import api from '../axios/Axios'
import { Opentoast } from "./Opentoast"

export const Updatepassword = async (forgetmail, forgetpassword, forgetconfirmpassword, Setshowtoast, Settoastmessage, Settoastcolor) => {
    if (!forgetmail || !forgetpassword || !forgetconfirmpassword) {
        // console.log("please fill all the data");
        Settoastcolor('danger')
        Settoastmessage("please fill all the data")
        Opentoast(Setshowtoast)
    }
    else {
        if (forgetpassword !== forgetconfirmpassword) {
            // console.log("please fill all the data");
            Settoastcolor('danger')
            Settoastmessage("password mismatch")
            Opentoast(Setshowtoast)
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
                // console.log(error);
                Settoastcolor('danger')
                Settoastmessage('error')
                Opentoast(Setshowtoast)
            }
        }
    }
}