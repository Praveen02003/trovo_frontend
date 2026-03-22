import React, { useContext, useEffect } from 'react';
import '../cart/Cart.css';
import { Navbar } from '../navbar/Navbar';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { Getcartdata } from '../../function/Getcartdata';
import { Removefromcart } from '../../function/Removefromcart';
import { Updatecartquantity } from '../../function/Updatecartquantity';
import { Link } from 'react-router-dom';
import { IMAGES_URL } from '../../axios/Imageurl';

export const Cart = () => {

    const {
        loginuser,
        Setloginuser,
        cartids,
        Setcartids,
        cartdata,
        Setcartdata,
        Setshowtoast,
        Settoastcolor,
        Settoastmessage
    } = useContext(maincontext);

    useEffect(() => {
        Setloginuser(Getloginuser());
        Getcartdata(Setcartids, Setcartdata);
    }, []);

    // ✅ TOTAL CALCULATION (WITH QUANTITY)
    const subtotal = cartdata.reduce(
        (acc, item) => acc + (item.price * (item.quantity || 1)),
        0
    );

    const tax = subtotal * 0.03;
    const total = subtotal + tax;

    return (
        <div className="cart-bg py-5">
            <Navbar />

            <div className="container mt-5">
                <div className="row g-4">

                    {/* LEFT */}
                    <div className="col-lg-8">
                        <div className="bg-white rounded-4 shadow-sm p-4">
                            <h4 className="fw-bold mb-4">Shopping Cart</h4>

                            {/* HEADER */}
                            <div className="row text-muted small fw-bold mb-3 px-2">
                                <div className="col-6">Product</div>
                                <div className="col-3 text-center">Quantity</div>
                                <div className="col-3 text-end">Price</div>
                            </div>

                            {cartdata.length > 0 ? (
                                cartdata.map((item, index) => (
                                    <div key={index} className="row align-items-center py-3 border-top">

                                        {/* PRODUCT */}
                                        <div className="col-6 d-flex align-items-center">
                                            <div className="cart-img-box me-3">
                                                <img
                                                    src={` ${IMAGES_URL}/${item.image}`}
                                                    alt={item.product_name}
                                                />
                                            </div>
                                            <div>
                                                <h6 className="mb-0 fw-bold">{item.product_name}</h6>
                                                <p className="text-muted small">{item.brand_name}</p>
                                            </div>
                                        </div>

                                        {/* ✅ QUANTITY CONTROL */}
                                        <div className="col-3 d-flex justify-content-center">
                                            <div className="qty-box border rounded-pill px-2 py-1 d-flex align-items-center">

                                                {/* DECREASE */}
                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() => {
                                                        if ((item.quantity || 1) <= 1) return;

                                                        const newQty = (item.quantity || 1) - 1;

                                                        // ✅ instant UI update
                                                        Setcartdata(prev =>
                                                            prev.map(p =>
                                                                p.product_id === item.product_id
                                                                    ? { ...p, quantity: newQty }
                                                                    : p
                                                            )
                                                        );

                                                        // ✅ backend sync
                                                        Updatecartquantity(
                                                            loginuser.user_id,
                                                            item.product_id,
                                                            newQty,
                                                            Settoastmessage,
                                                            Setshowtoast,
                                                            Settoastcolor
                                                        );
                                                    }}
                                                >
                                                    <i className="bi bi-dash"></i>
                                                </button>

                                                {/* VALUE */}
                                                <span className="mx-2 fw-bold">
                                                    {item.quantity || 1}
                                                </span>

                                                {/* INCREASE */}
                                                <button
                                                    className="btn btn-sm"
                                                    onClick={() => {
                                                        const newQty = (item.quantity || 1) + 1;

                                                        // ✅ instant UI update
                                                        Setcartdata(prev =>
                                                            prev.map(p =>
                                                                p.product_id === item.product_id
                                                                    ? { ...p, quantity: newQty }
                                                                    : p
                                                            )
                                                        );

                                                        // ✅ backend sync
                                                        Updatecartquantity(
                                                            loginuser.user_id,
                                                            item.product_id,
                                                            newQty,
                                                            Settoastmessage,
                                                            Setshowtoast,
                                                            Settoastcolor
                                                        );
                                                    }}
                                                >
                                                    <i className="bi bi-plus"></i>
                                                </button>

                                            </div>
                                        </div>

                                        {/* PRICE + DELETE */}
                                        <div className="col-3 text-end">
                                            <span className="fw-bold">
                                                ₹{item.price * (item.quantity || 1)}
                                            </span>

                                            <button
                                                className="btn btn-sm text-danger ms-2"
                                                onClick={() => {

                                                    // ✅ instant UI remove
                                                    Setcartids(prev =>
                                                        prev.filter(id => id !== item.product_id)
                                                    );

                                                    Setcartdata(prev =>
                                                        prev.filter(p => p.product_id !== item.product_id)
                                                    );

                                                    // ✅ backend
                                                    Removefromcart(
                                                        loginuser.user_id,
                                                        item.product_id,
                                                        Setcartids,
                                                        Settoastmessage,
                                                        Setshowtoast,
                                                        Settoastcolor,
                                                        Setcartdata
                                                    );
                                                }}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-5">
                                    <h5>No items in cart</h5>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="col-lg-4">

                        {/* SUMMARY */}
                        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                            <h6 className="fw-bold mb-4">Order Summary</h6>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Shipping</span>
                                <span className="text-success">Free</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Tax</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between">
                                <strong>Total</strong>
                                <strong className="text-primary">₹{total.toFixed(2)}</strong>
                            </div>
                        </div>

                        {/* CHECKOUT */}
                        <div className="bg-white rounded-4 shadow-sm p-4">
                            <Link className="btn btn-primary w-100 rounded-pill fw-bold" to={`/checkout/${loginuser.user_id}`}>
                                Checkout
                            </Link>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
};