import api from "../axios/Axios";
import { Getloginuser } from "./Getloginuser";

export const Getcartdata = async (Setcartids, Setcartdata) => {
    try {
        const loginuser = Getloginuser();

        // 1. Safety check
        if (!loginuser?.user_id) return;

        const res = await api.get(`/getcartdata/${loginuser.user_id}`);

        // 2. Extract data with fallback
        const cartdata = res.data?.data || [];
        Setcartdata(cartdata);

        // 3. Extract product IDs
        const ids = cartdata.map(item => item.product_id);

        // 4. Update state
        Setcartids(ids);

    } catch (error) {
        console.error("Error fetching cart data:", error.response?.data?.message || error.message);
    }
};
