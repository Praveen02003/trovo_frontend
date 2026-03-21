import api from '../axios/Axios';
import { Getcartdata } from './Getcartdata';
import { Opentoast } from './Opentoast';

export const Addtocart = async (
    userId,
    productId,
    quantity, // ✅ NEW
    Setcartids,
    Setcartdata,
    Settoastmessage,
    Setshowtoast,
    Settoastcolor
) => {
    try {
        const response = await api.post('/addtocart', {
            userid: userId,
            productid: productId,
            quantity: quantity // ✅ SEND THIS
        });

        if (
            response.data.message === 'Added to cart' ||
            response.data.message === 'Quantity updated'
        ) {
            Settoastcolor("success");
            Settoastmessage(response.data.message);
            Opentoast(Setshowtoast);

            // ✅ REFRESH CART
            Getcartdata(Setcartids, Setcartdata);
        }

    } catch (error) {

        // rollback
        Setcartids(prev => prev.filter(id => id !== productId));

        Settoastcolor("danger");
        Settoastmessage("Failed to add to cart");
        Opentoast(Setshowtoast);

        console.error("Cart Error:", error);
    }
};