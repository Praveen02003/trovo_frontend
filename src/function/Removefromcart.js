import api from '../axios/Axios';
import { Getcartdata } from './Getcartdata';
import { Opentoast } from './Opentoast';

export const Removefromcart = async (
    userId,
    productId,
    Setcartids,
    Settoastmessage,
    Setshowtoast,
    Settoastcolor,
    Setcartdata
) => {
    try {
        const response = await api.post('/removefromcart', {
            userid: userId,
            productid: productId
        });

        if (response.data.message === 'Removed from cart') {
            Settoastcolor("danger");
            Settoastmessage("Item removed from cart");
            Opentoast(Setshowtoast);

            // Sync the UI by removing the ID locally or re-fetching
            Setcartids(prev => prev.filter(id => id !== productId));
            Getcartdata(Setcartids, Setcartdata);
        }
    } catch (error) {
        console.error("Error removing from cart", error);

        // ERROR RECOVERY: Re-fetch to ensure UI matches DB state
        Getcartdata(Setcartids, Setcartdata);

        Settoastcolor("warning");
        Settoastmessage("Failed to remove item. Please try again.");
        Opentoast(Setshowtoast);
    }
};
