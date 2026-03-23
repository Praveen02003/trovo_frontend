import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import '../viewproduct/Viewproduct.css';

import { maincontext } from '../../App';
import { Getparticularproduct } from '../../function/Getparticularproduct';
import { Getcartdata } from '../../function/Getcartdata';
import { Getwishlistdata } from '../../function/Getwishlistdata';
import { Addtocart } from '../../function/Addtocart';
import { Removefromcart } from '../../function/Removefromcart';
import { Addtowishlist } from '../../function/Addtowishlist';
import { Removefromwishlist } from '../../function/Removefromwishlist';
import { Updatecartquantity } from '../../function/Updatecartquantity';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';
import { Opentoast } from '../../function/Opentoast';
import { Closetoast } from '../../function/Closetoast';

export const Viewproduct = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);

    const {
        particularproduct, Setparticularproduct,
        loginuser,
        cartids, Setcartids,
        cartdata, Setcartdata,
        wishlistids, Setwishlistids, Setwishlistdata,
        showtoast, Setshowtoast,
        toastcolor, Settoastcolor,
        toastmessage, Settoastmessage,
    } = useContext(maincontext);

    useEffect(() => {
        const loadData = async () => {
            const isUser = await Userauth();
            if (!isUser) return;
            await Getparticularproduct(id, Setparticularproduct);
            if (loginuser?.user_id) {
                await Getcartdata(Setcartids, Setcartdata);
                await Getwishlistdata(Setwishlistids, Setwishlistdata);
            }
        };
        loadData();
    }, [id, loginuser?.user_id]);

    const prodId = particularproduct?.product_id;
    const isInCart = cartids.includes(prodId);
    const isInWishlist = wishlistids.includes(prodId);

    /* sync qty from cart */
    useEffect(() => {
        if (!prodId) return;
        const existing = cartdata.find(i => i.product_id === prodId);
        setQuantity(existing ? existing.quantity || 1 : 1);
    }, [cartdata, prodId]);

    /* stock helpers */
    const stock = particularproduct?.stock ?? 0;
    const stockClass = stock === 0 ? 'out' : stock <= 5 ? 'low' : '';
    const stockLabel = stock === 0 ? 'Out of Stock' : stock <= 5 ? `Only ${stock} left` : 'In Stock';

    /* discount */
    const origPrice = Number(particularproduct?.original_price || 0);
    const curPrice = Number(particularproduct?.price || 0);
    const discount = origPrice > curPrice
        ? Math.round(((origPrice - curPrice) / origPrice) * 100)
        : 0;

    /* ── Cart toggle ── */
    const handleCartToggle = () => {
        if (!loginuser?.user_id) {
            Settoastcolor("danger"); Settoastmessage("Please login to manage your cart"); Setshowtoast(true); return;
        }
        if (!prodId) return;
        if (isInCart) {
            Setcartids(prev => prev.filter(i => i !== prodId));
            Setcartdata(prev => prev.filter(i => i.product_id !== prodId));
            Removefromcart(loginuser.user_id, prodId, Setcartids, Settoastmessage, Setshowtoast, Settoastcolor, Setcartdata);
        } else {
            Setcartids(prev => [...prev, prodId]);
            Setcartdata(prev => [...prev, { ...particularproduct, quantity }]);
            Addtocart(loginuser.user_id, prodId, quantity, Setcartids, Setcartdata, Settoastmessage, Setshowtoast, Settoastcolor);
        }
    };

    /* ── Wishlist toggle ── */
    const handleWishlistToggle = () => {
        if (!loginuser?.user_id) {
            Settoastcolor("danger"); Settoastmessage("Please login to manage your wishlist"); Setshowtoast(true); return;
        }
        if (!prodId) return;
        if (isInWishlist) {
            Setwishlistids(prev => prev.filter(i => i !== prodId));
            Setwishlistdata(prev => prev.filter(i => i.product_id !== prodId));
            Removefromwishlist(loginuser.user_id, prodId, Setwishlistids, Settoastmessage, Setshowtoast, Settoastcolor);
        } else {
            Setwishlistids(prev => [...prev, prodId]);
            Addtowishlist(loginuser.user_id, prodId, Setwishlistids, Settoastmessage, Setshowtoast, Settoastcolor);
        }
    };

    /* ── Qty change ── */
    const changeQty = (delta) => {
        const newQty = quantity + delta;
        if (newQty < 1) return;
        if (newQty > stock) {
            Settoastcolor("danger"); Settoastmessage(`Only ${stock} units available`); Opentoast(Setshowtoast); return;
        }
        setQuantity(newQty);
        if (isInCart) {
            Setcartdata(prev => prev.map(i => i.product_id === prodId ? { ...i, quantity: newQty } : i));
            Updatecartquantity(loginuser.user_id, prodId, newQty, Settoastmessage, Setshowtoast, Settoastcolor);
        }
    };

    return (
        <div className="viewproduct-page">
            <Navbar />

            <div className="container py-4 mt-2">
                <div className="row g-4 g-lg-5 align-items-start">

                    {/* ══ LEFT — Image ══ */}
                    <div className="col-lg-6 fade-left">
                        <div className="product-img-card">
                            <div className="product-img-wrap">
                                <img
                                    src={`${IMAGES_URL}/${particularproduct?.image}`}
                                    alt={particularproduct?.product_name}
                                    loading="lazy"
                                />
                            </div>
                            <div className="img-tag-strip">
                                <span className="img-tag purple">
                                    <i className="bi bi-patch-check-fill me-1"></i> Authentic
                                </span>
                                <span className="img-tag green">
                                    <i className="bi bi-truck me-1"></i> Free Delivery
                                </span>
                                {discount > 0 && (
                                    <span className="img-tag gold">
                                        <i className="bi bi-tag-fill me-1"></i> {discount}% Off
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* ══ RIGHT — Info ══ */}
                    <div className="col-lg-6 fade-right">
                        <div className="product-info-panel">

                            {/* Breadcrumb */}
                            <div className="product-breadcrumb">
                                <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
                                <i className="bi bi-chevron-right"></i>
                                <Link to="/shop" style={{ color: 'inherit', textDecoration: 'none' }}>Shop</Link>
                                <i className="bi bi-chevron-right"></i>
                                <span>{particularproduct?.category_name}</span>
                            </div>

                            {/* Category */}
                            <div className="product-cat-pill">
                                <i className="bi bi-grid-3x3-gap"></i>
                                {particularproduct?.category_name}
                            </div>

                            {/* Name */}
                            <h2 className="product-name">{particularproduct?.product_name}</h2>

                            {/* Rating */}
                            <div className="product-rating">
                                <div className="stars">
                                    {[...Array(4)].map((_, i) => <i key={i} className="bi bi-star-fill"></i>)}
                                    <i className="bi bi-star-half"></i>
                                </div>
                                <span className="rating-text">4.9 · 128 reviews</span>
                            </div>

                            {/* Price */}
                            <div className="product-price-row">
                                <span className="product-price">₹{particularproduct?.price}</span>
                                {origPrice > curPrice && (
                                    <span className="product-original-price">₹{origPrice}</span>
                                )}
                                {discount > 0 && (
                                    <span className="product-discount">{discount}% off</span>
                                )}
                            </div>

                            {/* Description */}
                            <p className="product-desc">{particularproduct?.description}</p>

                            {/* Stock */}
                            <div className="stock-row">
                                <div className={`stock-dot ${stockClass}`}></div>
                                <span className={`stock-label ${stockClass}`}>{stockLabel}</span>
                            </div>

                            {/* Actions */}
                            <div className="actions-row">
                                {/* Quantity */}
                                <div className="qty-control">
                                    <button className="qty-btn" onClick={() => changeQty(-1)} disabled={quantity <= 1}>
                                        <i className="bi bi-dash"></i>
                                    </button>
                                    <span className="qty-display">{quantity}</span>
                                    <button className="qty-btn" onClick={() => changeQty(+1)}>
                                        <i className="bi bi-plus"></i>
                                    </button>
                                </div>

                                {/* Cart */}
                                <button
                                    className={`cart-btn ${isInCart ? 'remove' : 'add'}`}
                                    onClick={handleCartToggle}
                                    disabled={stock === 0}
                                >
                                    <i className={`bi ${isInCart ? 'bi-cart-dash' : 'bi-cart-plus'}`}></i>
                                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                                </button>

                                {/* Wishlist */}
                                <button
                                    className={`wish-btn ${isInWishlist ? 'active' : ''}`}
                                    onClick={handleWishlistToggle}
                                    title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}`}></i>
                                </button>
                            </div>

                            {/* ── Info Boxes ── */}

                            {/* Delivery */}
                            <div className="info-box">
                                <div className="info-box-title">
                                    <i className="bi bi-truck" style={{ color: 'var(--accent)' }}></i>
                                    Delivery Information
                                </div>
                                <div className="info-box-body">
                                    <p><i className="bi bi-check-circle-fill me-1" style={{ color: 'var(--green)' }}></i> Free delivery on this order</p>
                                    <p><i className="bi bi-clock me-1" style={{ color: 'var(--muted)' }}></i> Estimated delivery in 3–5 business days</p>
                                </div>
                            </div>

                            {/* Offers */}
                            <div className="info-box">
                                <div className="info-box-title">
                                    <i className="bi bi-tag-fill" style={{ color: 'var(--green)' }}></i>
                                    Available Offers
                                </div>
                                <div className="info-box-body">
                                    <ul>
                                        <li>10% discount on prepaid orders</li>
                                        <li>Free shipping on all products</li>
                                        <li>Easy 30-day returns, no questions asked</li>
                                    </ul>
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="info-box">
                                <div className="info-box-title">
                                    <i className="bi bi-info-circle" style={{ color: 'var(--muted)' }}></i>
                                    Product Details
                                </div>
                                <div className="info-box-body">
                                    <div className="info-detail-row">
                                        <span>Brand</span>
                                        <span className="info-detail-val">{particularproduct?.brand_name}</span>
                                    </div>
                                    <div className="info-detail-row">
                                        <span>Category</span>
                                        <span className="info-detail-val">{particularproduct?.category_name}</span>
                                    </div>
                                    <div className="info-detail-row">
                                        <span>Stock</span>
                                        <span className="info-detail-val">{stock} units</span>
                                    </div>
                                    <div className="info-detail-row">
                                        <span>SKU</span>
                                        <span className="info-detail-val">#{particularproduct?.product_id}</span>
                                    </div>
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