import api from "../axios/Axios";

export const Updatecartquantity = async (
    userId,
    productId,
    quantity,
    Settoastmessage,
    Setshowtoast,
    Settoastcolor
) => {
    try {
        await api.post('/updatecartquantity', {
            userid: userId,
            productid: productId,
            quantity
        });
    } catch (error) {
        console.error("Quantity update failed", error);

        Settoastcolor("warning");
        Settoastmessage("Failed to update quantity");
        Setshowtoast(true);
    }
};