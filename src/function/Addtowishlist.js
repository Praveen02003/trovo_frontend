import api from '../axios/Axios';
import { Getwishlistdata } from './Getwishlistdata';
import { Opentoast } from './Opentoast';

// Addtowishlist.js
export const Addtowishlist = async (userId, productId, Setwishlistids, Settoastmessage, Setshowtoast, Settoastcolor) => {
    try {
        const response = await api.post('/addtowishlist', { userid: userId, productid: productId });
        if (response.data.message === 'Added to wishlist') {
            Settoastcolor("success");
            Settoastmessage(response.data.message);
            Opentoast(Setshowtoast);
            // Optional: Getwishlistdata(Setwishlistids); 
            // Only use the above if you want to sync official IDs from DB after success
        }
    } catch (error) {
        // ERROR HANDLING: Revert the UI if the API fails
        Setwishlistids(prev => prev.filter(id => id !== productId));
        Settoastcolor("danger");
        Settoastmessage("Failed to add to wishlist");
        Opentoast(Setshowtoast);
    }
};
