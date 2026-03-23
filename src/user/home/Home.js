import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../home/Home.css';
import { Footer } from "../footer/Footer";
import { Navbar } from "../navbar/Navbar";
import { maincontext } from "../../App";
import { Getfewproducts } from "../../function/Getfewproducts";
import { Link } from "react-router-dom";
import { Addtowishlist } from "../../function/Addtowishlist";
import { Getloginuser } from "../../function/Getloginuser";
import { Getwishlistdata } from "../../function/Getwishlistdata";
import { Removefromwishlist } from "../../function/Removefromwishlist";
import { Closetoast } from "../../function/Closetoast";
import { Opentoast } from "../../function/Opentoast";
import { IMAGES_URL } from "../../axios/Imageurl";
import { Getcategories } from "../../function/Getcategories";

/* ─── Category data ─────────────────────────────────────── */
const CATEGORIES = [
    { icon: "bi-smartwatch", label: "Wearables", color: "#6c63ff", bg: "#eeedfe" },
    { icon: "bi-headphones", label: "Audio", color: "#00b4d8", bg: "#e0f7fc" },
    { icon: "bi-phone", label: "Mobiles", color: "#06d6a0", bg: "#e0faf3" },
    { icon: "bi-laptop", label: "Laptops", color: "#f4a261", bg: "#fff3e8" },
    { icon: "bi-bag-heart", label: "Fashion", color: "#ff4d7d", bg: "#fff0f4" },
    { icon: "bi-controller", label: "Gaming", color: "#f5c842", bg: "#fffae0" },
    { icon: "bi-house-heart", label: "Home", color: "#43aa8b", bg: "#e4f5ef" },
    { icon: "bi-bicycle", label: "Sports", color: "#e63946", bg: "#fdecea" },
];

/* ─── Testimonials ──────────────────────────────────────── */
const TESTIMONIALS = [
    { name: "Priya M.", role: "Verified Buyer", stars: 5, text: "Absolutely love the quality! Shipped in 2 days and packaging was premium. Will definitely order again." },
    { name: "Rahul S.", role: "Gold Member", stars: 5, text: "TROVO has completely changed how I shop online. Every product feels hand-picked." },
    { name: "Ayesha K.", role: "Verified Buyer", stars: 5, text: "The wishlist feature is so useful. Grabbed 3 items from my list during the flash sale!" },
];

export const Home = () => {
    const {
        fewproducts, Setfewproducts,
        loginuser, Setloginuser,
        wishlistids, Setwishlistids,
        wishlistdata, Setwishlistdata,
        showtoast, Setshowtoast,
        toastcolor, Settoastcolor,
        toastmessage, Settoastmessage,
        getcategories, Setgetcategories
    } = useContext(maincontext);

    useEffect(() => {
        Setloginuser(Getloginuser());
        Getfewproducts(Setfewproducts);
        Getcategories(Setgetcategories)
        Getwishlistdata(Setwishlistids, Setwishlistdata);
    }, []);

    return (
        <div className="trovo-home min-vh-100 overflow-hidden">
            <Navbar />

            {/* ══════════════════════════════════════════════
                HERO CAROUSEL
            ══════════════════════════════════════════════ */}
            <div id="heroCarousel" className="carousel slide carousel-fade trovo-cinema" data-bs-ride="carousel" data-bs-interval="5000">
                <div className="carousel-indicators dynamic-indicators">
                    {["01", "02", "03", "04"].map((n, i) => (
                        <button key={i} type="button" data-bs-target="#heroCarousel" data-bs-slide-to={i} className={i === 0 ? "active" : ""}>
                            <span>{n}</span><div className="ind-bar"></div>
                        </button>
                    ))}
                </div>

                <div className="carousel-inner">
                    {/* Slide 1: Tech */}
                    <div className="carousel-item active slide-dark-blue">
                        <div className="slide-noise"></div>
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-lg-6 entry-animate">
                                    <p className="kicker">NEXT-GEN TECHNOLOGY</p>
                                    <h1 className="main-heading">Future on<br /><span className="glow-text">Your Wrist.</span></h1>
                                    <p className="description">The Series 9 Pro Max. More battery, more power, more you.</p>
                                    <div className="cta-group">
                                        <button className="btn-neo-primary">Explore Series</button>
                                        <span className="price-tag">Starting at $299</span>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
                                    <div className="hero-float-img">
                                        <img src="https://media.giphy.com/media/26BRL3pw98MWPgxqU/giphy.gif" alt="Tech" className="img-fluid rounded-4 opacity-80" style={{ maxHeight: "340px", objectFit: "cover" }} />
                                        <div className="float-badge">
                                            <i className="bi bi-lightning-charge-fill me-1"></i> Series 9 Pro
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 2: Fashion */}
                    <div className="carousel-item slide-vibrant-pink">
                        <div className="slide-noise"></div>
                        <div className="container h-100">
                            <div className="row h-100 align-items-center justify-content-center">
                                <div className="col-lg-7 text-center entry-animate">
                                    <p className="kicker white">CURATED FASHION</p>
                                    <h1 className="main-heading white">The Summer<br />Redefinition.</h1>
                                    <p className="description" style={{ color: "rgba(255,255,255,0.6)", margin: "0 auto 32px" }}>Bold prints. Effortless cuts. Up to 70% off for a limited time.</p>
                                    <button className="btn-neo-white">Grab the 70% Off</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3: Audio */}
                    <div className="carousel-item slide-deep-black">
                        <div className="slide-noise"></div>
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-lg-6 entry-animate">
                                    <p className="kicker blue">AUDIO PERFORMANCE</p>
                                    <h1 className="main-heading white">Pure Sound.<br />Zero Noise.</h1>
                                    <p className="description light">Lossless audio meets industry-leading noise cancellation.</p>
                                    <button className="btn-neo-outline-blue">Pre-Order Now</button>
                                </div>
                                <div className="col-lg-6 d-none d-lg-flex justify-content-center align-items-center">
                                    <div className="hero-float-img">
                                        <img src="https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif" alt="Audio" className="img-fluid rounded-4 opacity-80" style={{ maxHeight: "320px", objectFit: "cover" }} />
                                        <div className="float-badge" style={{ background: "var(--cyan)", color: "#000" }}>
                                            <i className="bi bi-music-note-beamed me-1"></i> Lossless
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 4: Gaming */}
                    <div className="carousel-item slide-gaming-yellow">
                        <div className="slide-noise"></div>
                        <div className="container h-100">
                            <div className="row h-100 align-items-center justify-content-end text-end">
                                <div className="col-lg-6 entry-animate">
                                    <p className="kicker dark">ULTIMATE PERFORMANCE</p>
                                    <h1 className="main-heading white">Level Up<br /><span className="text-gold">Your Play.</span></h1>
                                    <p className="description white">The only limit is your imagination. Enter the gear lab.</p>
                                    <button className="btn-neo-dark">Shop Gear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Prev / Next arrows */}
                <button className="carousel-control-prev hero-ctrl" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                    <i className="bi bi-chevron-left"></i>
                </button>
                <button className="carousel-control-next hero-ctrl" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>


            {/* ══════════════════════════════════════════════
                TRUST BAR
            ══════════════════════════════════════════════ */}
            <section className="trust-bar-wrapper">
                <div className="container">
                    <div className="trust-inner-card">
                        <div className="row g-0">
                            {[
                                { icon: "bi-truck", title: "Free Shipping", desc: "On all global orders" },
                                { icon: "bi-arrow-repeat", title: "Easy Returns", desc: "30-day money back" },
                                { icon: "bi-shield-lock", title: "Secure Pay", desc: "100% SSL protected" },
                                { icon: "bi-headset", title: "24/7 Support", desc: "Live expert assistance" },
                            ].map((t, i) => (
                                <div key={i} className={`col-6 col-md-3 trust-item ${i < 3 ? "border-end-trust" : ""}`}>
                                    <div className="trust-inner">
                                        <div className="icon-circle"><i className={`bi ${t.icon}`}></i></div>
                                        <div>
                                            <span className="trust-title">{t.title}</span>
                                            <p className="trust-desc m-0">{t.desc}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════
                CATEGORIES CAROUSEL
            ══════════════════════════════════════════════ */}
            <section className="categories-section">
                <div className="container">
                    <div className="section-header text-center mb-5">
                        <p className="kicker-text">BROWSE BY CATEGORY</p>
                        <h2 className="section-title">
                            Shop What You <span className="text-accent">Love.</span>
                        </h2>
                    </div>

                    <div id="catCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3500">
                        <div className="carousel-inner">

                            {/* Slide 1 */}
                            <div className="carousel-item active">
                                <div className="row g-3 justify-content-center">
                                    {getcategories.slice(0, 4).map((c, i) => (
                                        <div key={i} className="col-6 col-sm-3">
                                            <div
                                                className="cat-card"
                                                style={{
                                                    "--cat-color": c.color || "#6c63ff",
                                                    "--cat-bg": c.bg || "#eeedfe"
                                                }}
                                            >
                                                <div className="cat-icon-wrap">
                                                    <i className={`bi ${c.icon || "bi-grid"}`}></i>
                                                </div>
                                                <span className="cat-label">
                                                    {c.category_name}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Slide 2 */}
                            <div className="carousel-item">
                                <div className="row g-3 justify-content-center">
                                    {getcategories.slice(4, 8).map((c, i) => (
                                        <div key={i} className="col-6 col-sm-3">
                                            <div
                                                className="cat-card"
                                                style={{
                                                    "--cat-color": c.color || "#6c63ff",
                                                    "--cat-bg": c.bg || "#eeedfe"
                                                }}
                                            >
                                                <div className="cat-icon-wrap">
                                                    <i className={`bi ${c.icon || "bi-grid"}`}></i>
                                                </div>
                                                <span className="cat-label">
                                                    {c.category_name}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        <div className="cat-indicators">
                            <button data-bs-target="#catCarousel" data-bs-slide-to="0" className="active"></button>
                            <button data-bs-target="#catCarousel" data-bs-slide-to="1"></button>
                        </div>
                    </div>

                    {/* Desktop Grid (Fully Dynamic) */}
                    <div className="cat-grid-desktop d-none d-md-grid">
                        {getcategories.map((c, i) => (
                            <div
                                key={i}
                                className="cat-card"
                                style={{
                                    "--cat-color": c.color || "#6c63ff",
                                    "--cat-bg": c.bg || "#eeedfe"
                                }}
                            >
                                <div className="cat-icon-wrap">
                                    <i className={`bi ${c.icon || "bi-grid"}`}></i>
                                </div>
                                <span className="cat-label">
                                    {c.category_name}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>
            </section>


            {/* ══════════════════════════════════════════════
                PROMO BANNER STRIP
            ══════════════════════════════════════════════ */}
            <section className="promo-banner-strip">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="promo-card promo-card--purple">
                                <div className="promo-content">
                                    <span className="promo-tag">LIMITED OFFER</span>
                                    <h3 className="promo-title">New Tech Arrivals.<br />Up to <span>50% Off.</span></h3>
                                    <button className="promo-btn">Shop Now <i className="bi bi-arrow-right ms-1"></i></button>
                                </div>
                                <div className="promo-deco">
                                    <i className="bi bi-cpu-fill"></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="promo-card promo-card--pink">
                                <div className="promo-content">
                                    <span className="promo-tag">STYLE DROP</span>
                                    <h3 className="promo-title">Summer Fashion.<br />Bold <span>New Looks.</span></h3>
                                    <button className="promo-btn promo-btn--dark">Explore <i className="bi bi-arrow-right ms-1"></i></button>
                                </div>
                                <div className="promo-deco">
                                    <i className="bi bi-bag-heart-fill"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════
                ABOUT SECTION (with GIF)
            ══════════════════════════════════════════════ */}
            <section className="about-section">
                <div className="container">
                    <div className="row align-items-center g-5">
                        {/* Visual Side */}
                        <div className="col-lg-6">
                            <div className="about-visual-wrap">
                                {/* Main GIF */}
                                <div className="about-gif-frame">
                                    <img
                                        src="https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif"
                                        alt="TROVO Shopping Experience"
                                        className="about-gif"
                                    />
                                    <div className="about-gif-overlay"></div>
                                </div>
                                {/* Accent shape */}
                                <div className="about-accent-blob"></div>
                                {/* Floating stats card */}
                                <div className="about-stat-card animate-float">
                                    <div className="stat-row">
                                        <div className="stat-item">
                                            <span className="stat-num">10+</span>
                                            <span className="stat-label">Years</span>
                                        </div>
                                        <div className="stat-divider"></div>
                                        <div className="stat-item">
                                            <span className="stat-num">50k+</span>
                                            <span className="stat-label">Customers</span>
                                        </div>
                                        <div className="stat-divider"></div>
                                        <div className="stat-item">
                                            <span className="stat-num">98%</span>
                                            <span className="stat-label">Satisfaction</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Small floating tag */}
                                <div className="about-tag-badge animate-float-slow">
                                    <i className="bi bi-patch-check-fill me-2"></i> Premium Quality Assured
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="col-lg-6">
                            <div className="about-content">
                                <span className="section-subtitle">OUR PHILOSOPHY</span>
                                <h2 className="about-heading">
                                    Redefining the<br />
                                    <span className="text-gradient">Shopping Experience.</span>
                                </h2>
                                <p className="about-body">
                                    At <strong>TROVO</strong>, we don't just sell products — we curate lifestyles.
                                    Founded in 2024, our mission is to bridge the gap between premium quality
                                    and accessible pricing, bringing you the world's best right to your doorstep.
                                </p>
                                <div className="about-features">
                                    {[
                                        { icon: "bi-patch-check-fill", color: "var(--accent)", title: "Rigorous Quality", desc: "12-point quality check on every item." },
                                        { icon: "bi-people-fill", color: "#06d6a0", title: "50k+ Community", desc: "Globally happy, locally loved." },
                                        { icon: "bi-award-fill", color: "#f5c842", title: "Award-Winning", desc: "Best e-commerce platform 2024." },
                                        { icon: "bi-lightning-charge-fill", color: "#ff4d7d", title: "Fast Delivery", desc: "Same-day dispatch guaranteed." },
                                    ].map((f, i) => (
                                        <div key={i} className="about-feature-item">
                                            <div className="af-icon" style={{ color: f.color }}><i className={`bi ${f.icon}`}></i></div>
                                            <div>
                                                <h6 className="af-title">{f.title}</h6>
                                                <p className="af-desc">{f.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn-neo-outline">
                                    <span>Read Our Story</span>
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════
                MARQUEE TICKER
            ══════════════════════════════════════════════ */}
            <div className="marquee-strip">
                <div className="marquee-track">
                    {[...Array(3)].map((_, ri) => (
                        <div key={ri} className="marquee-inner">
                            {["FREE SHIPPING WORLDWIDE", "NEW DROP EVERY WEEK", "70% OFF SUMMER SALE", "PREMIUM QUALITY GUARANTEED", "50K+ HAPPY CUSTOMERS", "24/7 EXPERT SUPPORT"].map((t, i) => (
                                <span key={i} className="marquee-item">
                                    <i className="bi bi-lightning-charge-fill me-2"></i>{t}
                                </span>
                            ))}
                        </div>
                    ))}
                </div>
            </div>


            {/* ══════════════════════════════════════════════
                LATEST ARRIVALS (PRODUCTS)
            ══════════════════════════════════════════════ */}
            <section className="latest-arrivals">
                <div className="container">
                    <div className="section-header-row">
                        <div>
                            <p className="kicker-text">CURATED SELECTION</p>
                            <h2 className="section-title">The New <span className="text-accent">Standard.</span></h2>
                        </div>
                        <a href="/shop" className="explore-link">
                            View All <i className="bi bi-arrow-right ms-1"></i>
                        </a>
                    </div>

                    <div className="row g-4">
                        {fewproducts.map((product, index) => {
                            const isWishlisted = wishlistids?.includes(product.product_id);
                            const outOfStock = product.stock <= 0;
                            return (
                                <div key={index} className="col-6 col-lg-3">
                                    <div className="premium-product-card">
                                        <div className="image-frame">
                                            {outOfStock
                                                ? <div className="stock-badge out">OUT OF STOCK</div>
                                                : <div className="stock-badge new">NEW DROP</div>
                                            }
                                            <button
                                                className={`wish-btn ${isWishlisted ? "active" : ""}`}
                                                onClick={() => {
                                                    if (!loginuser?.user_id) {
                                                        Settoastmessage("Please login first");
                                                        Settoastcolor("danger");
                                                        Opentoast(Setshowtoast);
                                                        return;
                                                    }
                                                    if (isWishlisted) {
                                                        Setwishlistids(prev => prev.filter(id => id !== product.product_id));
                                                        Removefromwishlist(loginuser.user_id, product.product_id, Setwishlistids, Settoastmessage, Setshowtoast, Settoastcolor);
                                                    } else {
                                                        Setwishlistids(prev => [...prev, product.product_id]);
                                                        Addtowishlist(loginuser.user_id, product.product_id, Setwishlistids, Settoastmessage, Setshowtoast, Settoastcolor);
                                                    }
                                                }}
                                            >
                                                <i className={`bi ${isWishlisted ? "bi-heart-fill" : "bi-heart"}`}></i>
                                            </button>
                                            <div className="product-visual">
                                                <img src={`${IMAGES_URL}/${product.image}`} alt={product.product_name} />
                                            </div>
                                            <div className="cart-slider">
                                                <Link
                                                    to={`/viewproduct/${product.product_id}`}
                                                    className={`btn-cart-add ${outOfStock ? "disabled" : ""}`}
                                                    style={{ pointerEvents: outOfStock ? "none" : "auto" }}
                                                >
                                                    <i className="bi bi-eye me-1"></i>
                                                    {outOfStock ? "Unavailable" : "Quick View"}
                                                </Link>
                                            </div>
                                        </div>
                                        <div className="product-details">
                                            <div className="product-meta">
                                                <span className="brand-label">TROVO ESSENTIALS</span>
                                                <span className="rating-tag"><i className="bi bi-star-fill"></i> 4.9</span>
                                            </div>
                                            <h5 className="item-title">{product.product_name}</h5>
                                            <div className="price-stack">
                                                <span className="new-price">${product.price}</span>
                                                <span className="old-price">${product.original_price}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════
                WIDE PROMO BANNER
            ══════════════════════════════════════════════ */}
            <section className="wide-banner-section">
                <div className="container">
                    <div className="wide-banner">
                        <div className="wide-banner-content">
                            <p className="kicker white">EXCLUSIVE MEMBERSHIP</p>
                            <h2 className="wide-banner-title">Join Gold. Shop Smarter.</h2>
                            <p className="wide-banner-sub">Free shipping, early access to sales, priority support and exclusive member-only pricing.</p>
                            <button className="wide-banner-btn">Become a Gold Member <i className="bi bi-arrow-right ms-2"></i></button>
                        </div>
                        <div className="wide-banner-deco">
                            <div className="orb orb-1"></div>
                            <div className="orb orb-2"></div>
                            <i className="bi bi-award-fill wide-banner-icon"></i>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════
                FEATURES / WHY US
            ══════════════════════════════════════════════ */}
            <section className="features-neo">
                <div className="container">
                    <div className="section-header text-center mb-5">
                        <p className="kicker-text">WHY TROVO</p>
                        <h2 className="section-title">Built Around <span className="text-accent">You.</span></h2>
                    </div>
                    <div className="row g-4">
                        {[
                            { icon: "bi-truck", color: "#6c63ff", bg: "#eeedfe", glow: "rgba(108,99,255,0.2)", n: "01", title: "Global Shipping", text: "Free delivery on orders over $150, tracked to your door." },
                            { icon: "bi-shield-lock", color: "#06d6a0", bg: "#e0faf3", glow: "rgba(6,214,160,0.2)", n: "02", title: "Secure Payment", text: "100% SSL encrypted gateways for your total peace of mind." },
                            { icon: "bi-arrow-repeat", color: "#6c63ff", bg: "#eeedfe", glow: "rgba(108,99,255,0.2)", n: "03", title: "90 Days Return", text: "Not satisfied? Return any item within 90 days, no questions." },
                            { icon: "bi-headset", color: "#f4a261", bg: "#fff3e8", glow: "rgba(244,162,97,0.2)", n: "04", title: "24/7 Support", text: "Expert team available around the clock for your needs." },
                        ].map((c, i) => (
                            <div key={i} className="col-md-6 col-lg-3">
                                <div className="neo-card" style={{ "--card-color": c.color, "--card-bg": c.bg, "--card-glow": c.glow }}>
                                    <div className="neo-icon-wrapper">
                                        <i className={`bi ${c.icon}`}></i>
                                    </div>
                                    <div className="neo-content">
                                        <h5 className="neo-title">{c.title}</h5>
                                        <p className="neo-text">{c.text}</p>
                                    </div>
                                    <div className="neo-number">{c.n}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════
                TESTIMONIALS
            ══════════════════════════════════════════════ */}
            <section className="testimonials-section">
                <div className="container">
                    <div className="section-header text-center mb-5">
                        <p className="kicker-text">CUSTOMER LOVE</p>
                        <h2 className="section-title">What Our <span className="text-accent">Members Say.</span></h2>
                    </div>
                    <div className="row g-4">
                        {TESTIMONIALS.map((t, i) => (
                            <div key={i} className="col-md-4">
                                <div className="testimonial-card">
                                    <div className="tcard-stars">
                                        {[...Array(t.stars)].map((_, j) => <i key={j} className="bi bi-star-fill"></i>)}
                                    </div>
                                    <p className="tcard-text">"{t.text}"</p>
                                    <div className="tcard-author">
                                        <div className="tcard-avatar">{t.name[0]}</div>
                                        <div>
                                            <p className="tcard-name">{t.name}</p>
                                            <p className="tcard-role">{t.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ══════════════════════════════════════════════
                FLASH SALE
            ══════════════════════════════════════════════ */}
            <section className="flash-sale-nexus">
                <div className="container">
                    <div className="flash-inner">
                        <div className="bg-grid-overlay"></div>
                        <div className="row g-0 align-items-stretch">
                            {/* Left */}
                            <div className="col-lg-7 flash-left">
                                <div className="live-pill">
                                    <span className="live-dot"></span>
                                    <span>Flash Sale Live</span>
                                </div>
                                <h2 className="flash-title">Midnight<br /><span className="text-glow-cyan">Tech Drop.</span></h2>
                                <p className="flash-sub">The Pro Max Ultra bundle is now 40% off. Once the clock hits zero, price resets to retail.</p>
                                <div className="flash-timer">
                                    {[["08", "HRS"], ["42", "MIN"], ["15", "SEC"]].map(([val, lbl], i) => (
                                        <React.Fragment key={i}>
                                            <div className="nexus-timer">
                                                <span className="time">{val}</span>
                                                <span className="tlabel">{lbl}</span>
                                            </div>
                                            {i < 2 && <span className="timer-sep">:</span>}
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="flash-cta">
                                    <button className="btn-nexus-primary">Secure the Bundle <i className="bi bi-arrow-right-short ms-1"></i></button>
                                    <div className="stock-hint">
                                        <span className="hint-label">HURRY! ONLY</span>
                                        <span className="hint-count">12 UNITS LEFT</span>
                                    </div>
                                </div>
                            </div>
                            {/* Right visual */}
                            <div className="col-lg-5 flash-right d-none d-lg-flex">
                                <div className="tech-orb"></div>
                                <div className="tech-orb tech-orb-2"></div>
                                <i className="bi bi-cpu flash-icon"></i>
                                <div className="scan-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />

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
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => Closetoast(Setshowtoast)}></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
