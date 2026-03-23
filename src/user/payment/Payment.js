import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import '../payment/Payment.css';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { useParams, useLocation } from 'react-router-dom';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';

export const Payment = () => {
    const { id } = useParams();
    const location = useLocation();

    const { loginuser, Setloginuser } = useContext(maincontext);
    const [orderedItems, setOrderedItems] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const isUser = await Userauth();
            if (!isUser) return;
            const user = Getloginuser();
            Setloginuser(user);
            if (location.state?.orderedItems) setOrderedItems(location.state.orderedItems);
        };
        loadData();
    }, [location.state]);

    /* ── Totals ── */
    const subtotal = orderedItems.reduce((acc, item) => acc + Number(item.price) * (item.quantity || 1), 0);
    const tax = subtotal * 0.03;
    const total = subtotal + tax;
    const fmt = (n) => n.toLocaleString('en-IN', { minimumFractionDigits: 2 });

    return (
        <div className="payment-page">
            <Navbar />

            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-9 col-lg-6 col-xl-5">

                        <div className="payment-card">

                            {/* ── Top Dark Banner ── */}
                            <div className="payment-banner">
                                <div className="banner-orb banner-orb-1"></div>
                                <div className="banner-orb banner-orb-2"></div>

                                <div className="success-orb">
                                    <i className="bi bi-check-lg"></i>
                                </div>

                                <h2 className="payment-title">Payment Successful!</h2>
                                <p className="payment-subtitle">
                                    Order confirmed for <strong>{loginuser?.email}</strong>
                                </p>
                            </div>

                            {/* ── Body ── */}
                            <div className="payment-body">

                                {/* Order details */}
                                <div className="order-details-box">
                                    <div className="order-detail-row">
                                        <span className="detail-label">Order ID</span>
                                        <span className="order-id-pill">
                                            <i className="bi bi-hash"></i>{id}
                                        </span>
                                    </div>
                                    <div className="order-detail-row">
                                        <span className="detail-label">Payment Method</span>
                                        <span className="cod-pill">
                                            <i className="bi bi-cash-coin"></i> Cash on Delivery
                                        </span>
                                    </div>
                                    <div className="order-detail-row">
                                        <span className="detail-label">Shipping</span>
                                        <span className="detail-val" style={{ color: 'var(--green)' }}>
                                            <i className="bi bi-check-circle-fill me-1"></i>Free
                                        </span>
                                    </div>
                                    <div className="order-detail-row">
                                        <span className="detail-label">Total Paid</span>
                                        <span className="detail-val accent">₹{fmt(total)}</span>
                                    </div>
                                </div>

                                {/* Ordered items */}
                                <span className="items-label">
                                    <i className="bi bi-bag-check me-1"></i>
                                    Ordered Items ({orderedItems.length})
                                </span>

                                {orderedItems.length > 0 ? (
                                    orderedItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="payment-item-row"
                                            style={{ animationDelay: `${0.3 + index * 0.06}s` }}
                                        >
                                            <div className="pay-img-box">
                                                <img
                                                    src={`${IMAGES_URL}/${item.image}`}
                                                    alt={item.product_name}
                                                    loading="lazy"
                                                />
                                            </div>

                                            <div className="flex-grow-1">
                                                <p className="pay-item-name">{item.product_name}</p>
                                                <span className="pay-item-qty">
                                                    <i className="bi bi-box-seam"></i>
                                                    Qty: {item.quantity || 1}
                                                </span>
                                            </div>

                                            <span className="pay-item-price">
                                                ₹{fmt(Number(item.price) * (item.quantity || 1))}
                                            </span>
                                        </div>
                                    ))
                                ) : (
                                    <p style={{ fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center', padding: '20px 0' }}>
                                        No items found.
                                    </p>
                                )}

                                {/* Action buttons */}
                                <div className="payment-actions">
                                    <a
                                        href={`/trackorder/${loginuser?.user_id}`}
                                        className="btn-track"
                                    >
                                        <i className="bi bi-geo-alt-fill"></i>
                                        Track My Order
                                    </a>
                                    <a href="/" className="btn-back">
                                        <i className="bi bi-arrow-left"></i>
                                        Back to Shop
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};