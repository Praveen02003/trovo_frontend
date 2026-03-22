import React, { useContext, useEffect } from 'react';
import '../checkout/Checkout.css';
import { Navbar } from '../navbar/Navbar';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { Getcartdata } from '../../function/Getcartdata';
import { useNavigate } from 'react-router-dom';
import api from '../../axios/Axios';
import { Handlecheckout } from '../../function/Handlecheckout';
import { IMAGES_URL } from '../../axios/Imageurl';

export const Checkout = () => {

    const navigate = useNavigate();

    const {
        loginuser,
        Setloginuser,
        cartdata,
        Setcartids,
        Setcartdata,
        Settoastmessage,
        Settoastcolor,
        Setshowtoast
    } = useContext(maincontext);

    useEffect(() => {
        Setloginuser(Getloginuser());
        Getcartdata(Setcartids, Setcartdata);
    }, []);

    // ✅ TOTAL CALCULATION
    const subtotal = cartdata.reduce(
        (acc, item) => acc + (Number(item.price) * (item.quantity || 1)),
        0
    );

    const tax = subtotal * 0.03;
    const total = subtotal + tax;

    return (
        <div className="checkout-page">
            <Navbar />

            <div className="container mt-5 pt-5">

                {/* HEADER */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-end border-bottom pb-3">
                            <div>
                                <h1 className="fw-bold m-0">Review Order</h1>
                                <p className="text-muted small mb-0">
                                    Please confirm your items before proceeding to payment.
                                </p>
                            </div>

                            <span className="badge bg-dark rounded-pill px-3 py-2">
                                {cartdata.length} Products
                            </span>
                        </div>
                    </div>
                </div>

                <div className="row g-4">

                    {/* LEFT */}
                    <div className="col-lg-7">

                        {cartdata.length > 0 ? (
                            cartdata.map((item, index) => (
                                <div
                                    key={index}
                                    className="item-card-separate mb-3 shadow-sm d-flex align-items-center p-3"
                                >

                                    <div className="me-3">
                                        <img
                                            src={`${IMAGES_URL}/${item.image}`}
                                            alt={item.product_name}
                                            style={{ width: "60px", height: "60px", objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className="flex-grow-1">
                                        <h6 className="fw-bold mb-0">
                                            {item.product_name}
                                        </h6>
                                        <p className="text-muted small mb-0">
                                            {item.brand_name}
                                        </p>
                                    </div>

                                    <div className="text-end">
                                        <div className="fw-bold text-primary">
                                            ₹{Number(item.price).toFixed(2)}
                                        </div>
                                        <div className="text-muted small">
                                            QTY: {item.quantity || 1}
                                        </div>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5">
                                <h5>No items to checkout</h5>
                            </div>
                        )}

                    </div>

                    {/* RIGHT */}
                    <div className="col-lg-5 col-xl-4 ms-auto">

                        <div className="summary-floating-card p-4 shadow-lg border-0 sticky-top">

                            <h4 className="fw-bold mb-4">Order Summary</h4>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-2">
                                <span>Tax</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping</span>
                                <span className="text-success">FREE</span>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between mb-4">
                                <strong>Total</strong>
                                <strong className="text-primary">
                                    ₹{total.toFixed(2)}
                                </strong>
                            </div>

                            {/* ✅ BUTTON FIXED */}
                            <button
                                className="btn btn-primary w-100 py-3 rounded-pill fw-bold"
                                onClick={() => {
                                    Handlecheckout(loginuser, Setloginuser, cartdata, Settoastcolor, Settoastmessage, Setshowtoast, Setcartids, Setcartdata, navigate);
                                }}
                            >
                                CONFIRM & PAY
                                <i className="bi bi-chevron-right ms-2"></i>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};