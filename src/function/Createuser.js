import api from '../axios/Axios'
import { Opentoast } from './Opentoast';
export const Createuser = async (signupname, signupmail, signuppassword, signupconfirmpassword, signupmobilenumber, signupaddress, Setshowtoast, Settoastcolor, Settoastmessage) => {
    if (!signupname || !signupmail || !signuppassword || !signupconfirmpassword || !signupmobilenumber || !signupaddress) {
        // console.log("please fill all the data");
        Settoastcolor('danger')
        Settoastmessage("please fill all the data")
        Opentoast(Setshowtoast)
    }
    else {
        console.log("all ok");
        if (signuppassword !== signupconfirmpassword) {
            // console.log("Password Mismatch");
            Settoastcolor('danger')
            Settoastmessage("Password Mismatch")
            Opentoast(Setshowtoast)
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
                    Settoastcolor('success')
                    Settoastmessage(res.data.message)
                    Opentoast(Setshowtoast)
                }
                else{
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
