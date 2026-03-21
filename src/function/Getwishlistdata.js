import api from "../axios/Axios";
import { Getloginuser } from "./Getloginuser";

export const Getwishlistdata = async (Setwishlistids, Setwishlistdata) => {
    try {
        const loginuser = Getloginuser();

        // 1. Safety check: Exit if no user is logged in
        if (!loginuser?.user_id) return;

        const res = await api.get(`/getwishlistdata/${loginuser.user_id}`);

        // 2. Extract data with fallback
        const wishlistdata = res.data?.data || [];
        Setwishlistdata(wishlistdata);

        // 3. One-liner to extract IDs
        const ids = wishlistdata.map(item => item.product_id);

        // 4. Update IDs state
        Setwishlistids(ids);

    } catch (error) {
        console.error("Error fetching wishlist data:", error.response?.data?.message || error.message);
    }
};
