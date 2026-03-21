import api from "../axios/Axios";
import { Getloginuser } from "./Getloginuser";
import { Opentoast } from "./Opentoast";

export const Handlecheckout = async (loginuser, Setloginuser, cartdata, Settoastcolor, Settoastmessage, Setshowtoast, Setcartids, Setcartdata, navigate) => {
    Setloginuser(Getloginuser());

    if (!loginuser?.user_id) {
        Settoastcolor("danger");
        Settoastmessage("Please login first");
        Opentoast(Setshowtoast)
        return;
    }

    if (cartdata.length === 0) {
        Settoastcolor("warning");
        Settoastmessage("Cart is empty");
        Opentoast(Setshowtoast)
        return;
    }

    try {
        const res = await api.post("/createorder", {
            user_id: loginuser.user_id
        });

        if (res.data.message === "Order placed successfully") {

            const orderId = res.data.order_id;

            // ✅ STORE ITEMS BEFORE CLEAR
            const orderedItems = [...cartdata];

            // ✅ CLEAR CART UI
            Setcartids([]);
            Setcartdata([]);

            // ✅ PASS DATA TO PAYMENT PAGE
            navigate(`/payment/${orderId}`, {
                state: {
                    orderedItems: orderedItems
                }
            });
        }

    } catch (err) {
        console.error(err);

        Settoastcolor("danger");
        Settoastmessage("Something went wrong");
        Opentoast(Setshowtoast)
    }
};