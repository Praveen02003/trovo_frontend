import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import '../viewproduct/Viewproduct.css';

// Context & Functions
import { maincontext } from '../../App';
import { Getparticularproduct } from '../../function/Getparticularproduct';
import { Getcartdata } from '../../function/Getcartdata';
import { Getwishlistdata } from '../../function/Getwishlistdata';
import { Addtocart } from '../../function/Addtocart';
import { Removefromcart } from '../../function/Removefromcart';
import { Addtowishlist } from '../../function/Addtowishlist';
import { Removefromwishlist } from '../../function/Removefromwishlist';
import { Updatecartquantity } from '../../function/Updatecartquantity';

export const Viewproduct = () => {

    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const {
        particularproduct, Setparticularproduct,
        loginuser,
        cartids, Setcartids,
        cartdata, Setcartdata,
        wishlistids, Setwishlistids, Setwishlistdata,
        Settoastmessage, Setshowtoast, Settoastcolor
    } = useContext(maincontext);

    // =========================
    // FETCH DATA
    // =========================
    useEffect(() => {
        Getparticularproduct(id, Setparticularproduct);

        if (loginuser?.user_id) {
            Getcartdata(Setcartids, Setcartdata);
            Getwishlistdata(Setwishlistids, Setwishlistdata);
        }
    }, [id, loginuser?.user_id]);

    const prodId = particularproduct?.product_id;

    const isInCart = cartids.includes(prodId);
    const isInWishlist = wishlistids.includes(prodId);

    // =========================
    // AUTO SYNC QUANTITY
    // =========================
    useEffect(() => {
        if (!prodId) return;

        const existingItem = cartdata.find(
            item => item.product_id === prodId
        );

        if (existingItem) {
            setQuantity(existingItem.quantity || 1);
        } else {
            setQuantity(1);
        }

    }, [cartdata, prodId]);

    // =========================
    // CART TOGGLE
    // =========================
    const handleCartToggle = () => {

        if (!loginuser?.user_id) {
            Settoastcolor("danger");
            Settoastmessage("Please login to manage your cart");
            Setshowtoast(true);
            return;
        }

        if (!prodId) return;

        if (isInCart) {

            // REMOVE
            Setcartids(prev => prev.filter(id => id !== prodId));
            Setcartdata(prev => prev.filter(item => item.product_id !== prodId));

            Removefromcart(
                loginuser.user_id,
                prodId,
                Setcartids,
                Settoastmessage,
                Setshowtoast,
                Settoastcolor,
                Setcartdata
            );

        } else {

            // ADD WITH QUANTITY
            Setcartids(prev => [...prev, prodId]);

            Setcartdata(prev => [
                ...prev,
                { ...particularproduct, quantity }
            ]);

            Addtocart(
                loginuser.user_id,
                prodId,
                quantity,
                Setcartids,
                Setcartdata,
                Settoastmessage,
                Setshowtoast,
                Settoastcolor
            );
        }
    };

    // =========================
    // WISHLIST TOGGLE
    // =========================
    const handleWishlistToggle = () => {

        if (!loginuser?.user_id) {
            Settoastcolor("danger");
            Settoastmessage("Please login to manage your wishlist");
            Setshowtoast(true);
            return;
        }

        if (!prodId) return;

        if (isInWishlist) {

            Setwishlistids(prev => prev.filter(id => id !== prodId));
            Setwishlistdata(prev => prev.filter(item => item.product_id !== prodId));

            Removefromwishlist(
                loginuser.user_id,
                prodId,
                Setwishlistids,
                Settoastmessage,
                Setshowtoast,
                Settoastcolor
            );

        } else {

            Setwishlistids(prev => [...prev, prodId]);

            Addtowishlist(
                loginuser.user_id,
                prodId,
                Setwishlistids,
                Settoastmessage,
                Setshowtoast,
                Settoastcolor
            );
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <Navbar />

            <div className="container py-4">
                <div className="row g-4">

                    {/* LEFT */}
                    <div className="col-lg-7">
                        <div className="sticky-top" style={{ top: '100px' }}>
                            <div className="card border-0 shadow-sm rounded-4">
                                <img
                                    src={`http://localhost:5000/images/${particularproduct?.image}`}
                                    className="card-img-top rounded-4"
                                    alt={particularproduct?.product_name}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="col-lg-5">
                        <div className="ps-lg-3">

                            <h2 className="fw-bold mb-2">
                                {particularproduct?.product_name}
                            </h2>

                            <h3 className="text-primary fw-bold mb-3">
                                ₹{particularproduct?.price}
                            </h3>

                            <p className="text-muted mb-4">
                                {particularproduct?.description}
                            </p>

                            {/* ACTIONS */}
                            <div className="d-flex gap-2 mb-4">

                                {/* QUANTITY */}
                                <div className="input-group" style={{ width: "120px" }}>

                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            const newQty = Math.max(1, quantity - 1);
                                            setQuantity(newQty);

                                            if (isInCart) {
                                                Setcartdata(prev =>
                                                    prev.map(item =>
                                                        item.product_id === prodId
                                                            ? { ...item, quantity: newQty }
                                                            : item
                                                    )
                                                );

                                                Updatecartquantity(
                                                    loginuser.user_id,
                                                    prodId,
                                                    newQty,
                                                    Settoastmessage,
                                                    Setshowtoast,
                                                    Settoastcolor
                                                );
                                            }
                                        }}
                                    >-</button>

                                    <input
                                        className="form-control text-center"
                                        value={quantity}
                                        readOnly
                                    />

                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => {
                                            const newQty = quantity + 1;
                                            setQuantity(newQty);

                                            if (isInCart) {
                                                Setcartdata(prev =>
                                                    prev.map(item =>
                                                        item.product_id === prodId
                                                            ? { ...item, quantity: newQty }
                                                            : item
                                                    )
                                                );

                                                Updatecartquantity(
                                                    loginuser.user_id,
                                                    prodId,
                                                    newQty,
                                                    Settoastmessage,
                                                    Setshowtoast,
                                                    Settoastcolor
                                                );
                                            }
                                        }}
                                    >+</button>

                                </div>

                                {/* CART */}
                                <button
                                    className={`btn flex-grow-1 fw-bold ${isInCart ? 'btn-danger' : 'btn-primary'}`}
                                    onClick={handleCartToggle}
                                >
                                    {isInCart ? "Remove From Cart" : "Add to Cart"}
                                </button>

                                {/* WISHLIST */}
                                <button
                                    className={`btn ${isInWishlist ? 'btn-danger' : 'btn-outline-dark'}`}
                                    onClick={handleWishlistToggle}
                                >
                                    <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                </button>

                            </div>

                            {/* ✅ EXTRA CONTENT SECTION */}
                            <div className="mt-4">

                                {/* DELIVERY */}
                                <div className="border rounded-3 p-3 mb-3 bg-white">
                                    <h6 className="fw-bold mb-2">
                                        <i className="bi bi-truck me-2 text-primary"></i>
                                        Delivery Information
                                    </h6>
                                    <p className="text-muted small mb-1">
                                        Free delivery available
                                    </p>
                                    <p className="text-muted small mb-0">
                                        Delivery in 3-5 days
                                    </p>
                                </div>

                                {/* OFFERS */}
                                <div className="border rounded-3 p-3 mb-3 bg-white">
                                    <h6 className="fw-bold mb-2">
                                        <i className="bi bi-tag-fill me-2 text-success"></i>
                                        Offers
                                    </h6>
                                    <ul className="small text-muted mb-0 ps-3">
                                        <li>10% discount on prepaid orders</li>
                                        <li>Free shipping on all products</li>
                                    </ul>
                                </div>

                                {/* DETAILS */}
                                <div className="border rounded-3 p-3 bg-white">
                                    <h6 className="fw-bold mb-2">
                                        <i className="bi bi-info-circle me-2"></i>
                                        Product Details
                                    </h6>

                                    <p className="small mb-1">
                                        <strong>Brand:</strong> {particularproduct?.brand_name}
                                    </p>
                                    <p className="small mb-1">
                                        <strong>Category:</strong> {particularproduct?.category_name}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};