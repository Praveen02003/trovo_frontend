import React, { useContext, useEffect } from 'react';
import '../checkout/Checkout.css';
import { Navbar } from '../navbar/Navbar';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { Getcartdata } from '../../function/Getcartdata';
import { useNavigate, Link } from 'react-router-dom';
import { Handlecheckout } from '../../function/Handlecheckout';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';

export const Checkout = () => {
    const navigate = useNavigate();

    const {
        loginuser, Setloginuser,
        cartdata,
        Setcartids, Setcartdata,
        Settoastmessage, Settoastcolor, Setshowtoast,
    } = useContext(maincontext);

    useEffect(() => {
        const loadData = async () => {
            const isUser = await Userauth();
            if (!isUser) return;
            const user = Getloginuser();
            Setloginuser(user);
            if (user?.user_id) await Getcartdata(Setcartids, Setcartdata);
        };
        loadData();
    }, []);

    /* ── Totals ── */
    const subtotal = cartdata.reduce((acc, item) => acc + Number(item.price) * (item.quantity || 1), 0);
    const tax = subtotal * 0.03;
    const total = subtotal + tax;

    const fmt = (n) => n.toLocaleString('en-IN', { minimumFractionDigits: 2 });

    return (
        <div className="checkout-page">
            <Navbar />

            <div className="container mt-4 pt-4">

                {/* ── Header ── */}
                <div className="checkout-header">
                    <div>
                        <h1 className="checkout-title">Review Order</h1>
                        <p className="checkout-sub">Confirm your items before proceeding to payment.</p>
                    </div>
                    <span className="checkout-badge">{cartdata.length} Items</span>
                </div>

                {/* ── Step indicator ── */}
                <div className="checkout-steps">
                    <div className="step done">
                        <div className="step-num"><i className="bi bi-check"></i></div>
                        Cart
                    </div>
                    <div className="step-sep"></div>
                    <div className="step active">
                        <div className="step-num">2</div>
                        Review
                    </div>
                    <div className="step-sep"></div>
                    <div className="step">
                        <div className="step-num">3</div>
                        Payment
                    </div>
                </div>

                <div className="row g-4 align-items-start">

                    {/* ══ LEFT — Items ══ */}
                    <div className="col-lg-7">
                        {cartdata.length > 0 ? (
                            cartdata.map((item, index) => (
                                <div key={index} className="item-card-separate mb-3">

                                    {/* Image */}
                                    <div className="checkout-img-box">
                                        <img
                                            src={`${IMAGES_URL}/${item.image}`}
                                            alt={item.product_name}
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow-1">
                                        <p className="item-name">{item.product_name}</p>
                                        <p className="item-brand">{item.brand_name}</p>
                                        <span className="item-qty-pill">
                                            <i className="bi bi-box-seam"></i>
                                            Qty: {item.quantity || 1}
                                        </span>
                                    </div>

                                    {/* Price */}
                                    <div className="text-end flex-shrink-0">
                                        <div className="item-price">
                                            ₹{fmt(Number(item.price) * (item.quantity || 1))}
                                        </div>
                                        <div className="item-unit-price">
                                            ₹{fmt(Number(item.price))} each
                                        </div>
                                    </div>

                                </div>
                            ))
                        ) : (
                            <div className="checkout-empty">
                                <i className="bi bi-bag-x"></i>
                                <h5>No items to checkout</h5>
                                <p>Your cart is empty.</p>
                                <Link to="/shop" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                    background: 'var(--accent)', color: '#fff', padding: '12px 24px',
                                    borderRadius: '999px', textDecoration: 'none',
                                    fontFamily: 'var(--font-d)', fontSize: '0.75rem', fontWeight: '700',
                                    letterSpacing: '0.1em', textTransform: 'uppercase'
                                }}>
                                    <i className="bi bi-arrow-left"></i> Shop Now
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* ══ RIGHT — Summary ══ */}
                    <div className="col-lg-5 col-xl-4 ms-auto">
                        <div className="summary-floating-card">

                            <h6 className="summary-title">Order Summary</h6>

                            <div className="summary-row">
                                <span>Subtotal ({cartdata.length} items)</span>
                                <span className="val">₹{fmt(subtotal)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax (3%)</span>
                                <span className="val">₹{fmt(tax)}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className="free"><i className="bi bi-check-circle-fill me-1"></i>Free</span>
                            </div>

                            {/* Promo */}
                            <div className="promo-strip">
                                <i className="bi bi-tag-fill"></i>
                                Free shipping applied on this order!
                            </div>

                            <hr className="summary-divider" />

                            <div className="summary-total-row">
                                <span className="summary-total-label">Total</span>
                                <span className="summary-total-val">₹{fmt(total)}</span>
                            </div>

                            {/* Pay button */}
                            <button
                                className="pay-btn"
                                onClick={() =>
                                    Handlecheckout(
                                        loginuser, Setloginuser, cartdata,
                                        Settoastcolor, Settoastmessage, Setshowtoast,
                                        Setcartids, Setcartdata, navigate
                                    )
                                }
                            >
                                <i className="bi bi-lock-fill"></i>
                                Confirm &amp; Pay
                                <i className="bi bi-chevron-right"></i>
                            </button>

                            {/* Trust badges */}
                            <div className="trust-micro">
                                <div className="trust-micro-item">
                                    <i className="bi bi-shield-lock-fill"></i> Secure Payment
                                </div>
                                <div className="trust-micro-item">
                                    <i className="bi bi-arrow-repeat"></i> Easy Returns
                                </div>
                                <div className="trust-micro-item">
                                    <i className="bi bi-truck"></i> Free Shipping
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};