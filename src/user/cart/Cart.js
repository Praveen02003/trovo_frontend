import React, { useContext, useEffect } from 'react';
import '../cart/Cart.css';
import { Navbar } from '../navbar/Navbar';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { Getcartdata } from '../../function/Getcartdata';
import { Removefromcart } from '../../function/Removefromcart';
import { Updatecartquantity } from '../../function/Updatecartquantity';
import { Link, useNavigate } from 'react-router-dom';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';
import { Opentoast } from '../../function/Opentoast';
import { Closetoast } from '../../function/Closetoast';

export const Cart = () => {
    const {
        loginuser, Setloginuser,
        cartids, Setcartids,
        cartdata, Setcartdata,
        showtoast, Setshowtoast,
        toastcolor, Settoastcolor,
        toastmessage, Settoastmessage,
    } = useContext(maincontext);

    const navigate = useNavigate();

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
    const subtotal = cartdata.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
    const tax = subtotal * 0.03;
    const total = subtotal + tax;

    /* ── Quantity helpers ── */
    const changeQty = (item, delta) => {
        const newQty = (item.quantity || 1) + delta;
        if (newQty < 1) return;
        if (newQty > item.stock) {
            Settoastcolor("danger");
            Settoastmessage(`Only ${item.stock} units available`);
            Opentoast(Setshowtoast);
            return;
        }
        Setcartdata(prev =>
            prev.map(p => p.product_id === item.product_id ? { ...p, quantity: newQty } : p)
        );
        Updatecartquantity(loginuser.user_id, item.product_id, newQty, Settoastmessage, Setshowtoast, Settoastcolor);
    };

    const removeItem = (item) => {
        Setcartids(prev => prev.filter(id => id !== item.product_id));
        Setcartdata(prev => prev.filter(p => p.product_id !== item.product_id));
        Removefromcart(loginuser.user_id, item.product_id, Setcartids, Settoastmessage, Setshowtoast, Settoastcolor, Setcartdata);
    };

    return (
        <div className="cart-bg">
            <Navbar />

            <div className="container mt-5 pt-3">
                <div className="row g-4 align-items-start">

                    {/* ══ LEFT — Cart Items ══ */}
                    <div className="col-lg-8">
                        <div className="cart-card">

                            {/* Heading */}
                            <h4 className="cart-heading">
                                <i className="bi bi-bag" style={{ color: 'var(--accent)', fontSize: '1.2rem' }}></i>
                                Shopping Cart
                                <span className="cart-count-badge">{cartdata.length} items</span>
                            </h4>

                            {cartdata.length > 0 ? (
                                <>
                                    {/* Column header */}
                                    <div className="cart-col-header">
                                        <span>Product</span>
                                        <span>Quantity</span>
                                        <span>Price</span>
                                    </div>

                                    {/* Items */}
                                    {cartdata.map((item, index) => (
                                        <div key={index} className="cart-item-row">

                                            {/* Product */}
                                            <div className="cart-product-cell">
                                                <div className="cart-img-box">
                                                    <img
                                                        src={`${IMAGES_URL}/${item.image}`}
                                                        alt={item.product_name}
                                                        loading="lazy"
                                                        onClick={() => {
                                                            navigate(`/viewproduct/${item.product_id}`);
                                                        }}
                                                    />
                                                </div>
                                                <div>
                                                    <p className="cart-product-name">{item.product_name}</p>
                                                    <p className="cart-product-brand">{item.brand_name}</p>
                                                </div>
                                            </div>

                                            {/* Quantity */}
                                            <div className="cart-qty-cell">
                                                <div className="qty-box border">
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() => changeQty(item, -1)}
                                                        disabled={(item.quantity || 1) <= 1}
                                                    >
                                                        <i className="bi bi-dash"></i>
                                                    </button>
                                                    <span className="qty-value">{item.quantity || 1}</span>
                                                    <button
                                                        className="qty-btn"
                                                        onClick={() => changeQty(item, +1)}
                                                    >
                                                        <i className="bi bi-plus"></i>
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Price + Remove */}
                                            <div className="cart-price-cell">
                                                <span className="cart-item-price">
                                                    ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                                                </span>
                                                <button
                                                    className="cart-remove-btn"
                                                    onClick={() => removeItem(item)}
                                                    title="Remove"
                                                >
                                                    <i className="bi bi-trash3"></i>
                                                </button>
                                            </div>

                                        </div>
                                    ))}
                                </>
                            ) : (
                                <div className="cart-empty">
                                    <i className="bi bi-bag-x cart-empty-icon"></i>
                                    <h5>Your cart is empty</h5>
                                    <p>Looks like you haven't added anything yet.</p>
                                    <Link to="/shop" className="cart-empty-btn">
                                        <i className="bi bi-arrow-left"></i> Start Shopping
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ══ RIGHT — Summary ══ */}
                    <div className="col-lg-4">
                        <div className="cart-card" style={{ animationDelay: '0.08s' }}>

                            <h6 className="summary-heading">Order Summary</h6>

                            <div className="summary-row">
                                <span>Subtotal ({cartdata.length} items)</span>
                                <span>₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            </div>
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span className="free-ship"><i className="bi bi-check-circle-fill me-1"></i>Free</span>
                            </div>
                            <div className="summary-row">
                                <span>Tax (3%)</span>
                                <span>₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                            </div>

                            {/* Promo hint */}
                            <div className="promo-strip">
                                <i className="bi bi-tag-fill"></i>
                                <span>Free shipping applied on this order!</span>
                            </div>

                            <hr className="summary-divider" />

                            <div className="summary-total-row">
                                <span className="summary-total-label">Total</span>
                                <span className="summary-total-val">
                                    ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            <hr className="summary-divider" />

                            {/* Checkout */}
                            {loginuser?.user_id ? (
                                <Link
                                    className="checkout-btn"
                                    to={`/checkout/${loginuser.user_id}`}
                                >
                                    <i className="bi bi-lock-fill"></i>
                                    Proceed to Checkout
                                </Link>
                            ) : (
                                <Link className="checkout-btn" to="/login">
                                    <i className="bi bi-person-fill"></i>
                                    Login to Checkout
                                </Link>
                            )}

                            <Link to="/shop" className="continue-link">
                                <i className="bi bi-arrow-left"></i> Continue Shopping
                            </Link>

                            {/* Trust badges */}
                            <div className="trust-micro">
                                <div className="trust-micro-item">
                                    <i className="bi bi-shield-lock-fill"></i> Secure Checkout
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

            {/* Toast */}
            {showtoast && (
                <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
                    <div className={`trovo-toast toast show align-items-center text-white bg-${toastcolor} border-0`}>
                        <div className="d-flex">
                            <div className="toast-body fw-bold">
                                {toastcolor === "success"
                                    ? <i className="bi bi-check-circle-fill me-2"></i>
                                    : <i className="bi bi-exclamation-triangle-fill me-2"></i>}
                                {toastmessage}
                            </div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => Closetoast(Setshowtoast)}
                            ></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};