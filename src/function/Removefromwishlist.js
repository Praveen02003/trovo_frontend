import api from '../axios/Axios';
import { Getwishlistdata } from './Getwishlistdata';
import { Opentoast } from './Opentoast';

export const Removefromwishlist = async (userId, productId, Setwishlistids, Settoastmessage, Setshowtoast, Settoastcolor, Setwishlistdata) => {
    try {
        const response = await api.post('/removefromwishlist', {
            userid: userId,
            productid: productId
        });

        if (response.data.message === 'Removed from wishlist') {
            Settoastcolor("danger");
            Settoastmessage("Item removed from wishlist");
            Opentoast(Setshowtoast);

            // Optional: Re-fetch only if you want to ensure total sync with DB
            // Getwishlistdata(Setwishlistids, Setwishlistdata); 
        }
    } catch (error) {
        console.error("Error removing from wishlist");
        // ERROR RECOVERY: If API fails, re-fetch to bring the item back to the UI
        Getwishlistdata(Setwishlistids, Setwishlistdata);

        Settoastcolor("warning");
        Settoastmessage("Failed to remove item. Please try again.");
        Opentoast(Setshowtoast);
    }
};
