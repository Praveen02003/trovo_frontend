import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../home/Home.css'
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

export const Home = () => {
    const {
        fewproducts,
        Setfewproducts,
        loginuser,
        Setloginuser,
        wishlistids,
        Setwishlistids,
        wishlistdata,
        Setwishlistdata,
        showtoast,
        Setshowtoast,
        toastcolor,
        Settoastcolor,
        toastmessage,
        Settoastmessage
    } = useContext(maincontext);

    useEffect(() => {
        Setloginuser(Getloginuser());
        Getfewproducts(Setfewproducts);
        Getwishlistdata(Setwishlistids, Setwishlistdata);
    }, [])
    return (
        <div className="min-vh-100 bg-white overflow-hidden">
            <Navbar />

            {/* --- CINEMATIC GRID CAROUSEL --- */}
            <div id="heroCarousel" className="carousel slide carousel-fade trovo-cinema" data-bs-ride="carousel">
                {/* Progress Bar Indicators */}
                <div className="carousel-indicators dynamic-indicators">
                    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"><span>01</span><div className="progress"></div></button>
                    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"><span>02</span><div className="progress"></div></button>
                    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"><span>03</span><div className="progress"></div></button>
                    <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="3"><span>04</span><div className="progress"></div></button>
                </div>

                <div className="carousel-inner">
                    {/* Slide 1: Tech */}
                    <div className="carousel-item active slide-dark-blue">
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-lg-6 entry-animate">
                                    <p className="kicker">NEXT-GEN TECHNOLOGY</p>
                                    <h1 className="main-heading">Future on <br /><span className="glow-text">Your Wrist.</span></h1>
                                    <p className="description">The Series 9 Pro Max. More battery, more power, more you.</p>
                                    <div className="cta-group">
                                        <button className="btn-neo-primary">Explore Series</button>
                                        <span className="price-tag ps-4 border-start ms-4">Starting at $299</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 2: Fashion */}
                    <div className="carousel-item slide-vibrant-pink">
                        <div className="container h-100">
                            <div className="row h-100 align-items-center justify-content-center">
                                <div className="col-lg-8 text-center entry-animate">
                                    <p className="kicker white">CURATED FASHION</p>
                                    <h1 className="main-heading white">The Summer <br />Redefinition.</h1>
                                    <button className="btn-neo-white mt-4">Grab the 70% Off</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3: Audio */}
                    <div className="carousel-item slide-deep-black">
                        <div className="container h-100">
                            <div className="row h-100 align-items-center">
                                <div className="col-lg-6 entry-animate">
                                    <p className="kicker blue">AUDIO PERFORMANCE</p>
                                    <h1 className="main-heading white">Pure Sound. <br />Zero Noise.</h1>
                                    <p className="description light">Lossless audio meets industry-leading noise cancellation.</p>
                                    <button className="btn-neo-outline-blue">Pre-Order Now</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 4: Gaming */}
                    <div className="carousel-item slide-gaming-yellow">
                        <div className="container h-100">
                            <div className="row h-100 align-items-center justify-content-end text-end">
                                <div className="col-lg-6 entry-animate">
                                    <p className="kicker dark">ULTIMATE PERFORMANCE</p>
                                    <h1 className="main-heading white">Level Up <br /><span className="text-warning">Your Play.</span></h1>
                                    <p className="description white">The only limit is your imagination. Enter the gear lab.</p>
                                    <button className="btn-neo-dark">Shop Gear</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            {/* --- PREMIUM TRUST BAR --- */}
            <section className="trust-bar-wrapper">
                <div className="container">
                    <div className="trust-inner-card shadow-sm">
                        <div className="row g-0 align-items-center">
                            {/* Item 1 */}
                            <div className="col-md-3 trust-item border-end">
                                <div className="d-flex align-items-center justify-content-center py-4 px-3">
                                    <div className="icon-circle me-3"><i className="bi bi-truck"></i></div>
                                    <div className="text-start">
                                        <span className="trust-title">Free Shipping</span>
                                        <p className="trust-desc m-0">On all global orders</p>
                                    </div>
                                </div>
                            </div>
                            {/* Item 2 */}
                            <div className="col-md-3 trust-item border-end">
                                <div className="d-flex align-items-center justify-content-center py-4 px-3">
                                    <div className="icon-circle me-3"><i className="bi bi-arrow-repeat"></i></div>
                                    <div className="text-start">
                                        <span className="trust-title">Easy Returns</span>
                                        <p className="trust-desc m-0">30-day money back</p>
                                    </div>
                                </div>
                            </div>
                            {/* Item 3 */}
                            <div className="col-md-3 trust-item border-end">
                                <div className="d-flex align-items-center justify-content-center py-4 px-3">
                                    <div className="icon-circle me-3"><i className="bi bi-shield-lock"></i></div>
                                    <div className="text-start">
                                        <span className="trust-title">Secure Pay</span>
                                        <p className="trust-desc m-0">100% SSL protected</p>
                                    </div>
                                </div>
                            </div>
                            {/* Item 4 */}
                            <div className="col-md-3 trust-item">
                                <div className="d-flex align-items-center justify-content-center py-4 px-3">
                                    <div className="icon-circle me-3"><i className="bi bi-headset"></i></div>
                                    <div className="text-start">
                                        <span className="trust-title">24/7 Support</span>
                                        <p className="trust-desc m-0">Live expert assistance</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- REDESIGNED ABOUT US SECTION --- */}
            <section className="about-section overflow-hidden py-5 my-5">
                <div className="container py-lg-5">
                    <div className="row align-items-center g-5">
                        {/* Visual Side */}
                        <div className="col-lg-6 position-relative">
                            <div className="about-image-stack">
                                {/* Main Image */}
                                <div className="main-img-wrapper">
                                    <img
                                        src="https://images.unsplash.com"
                                        alt="Lifestyle"
                                        className="img-fluid rounded-custom shadow-2xl"
                                    />
                                </div>
                                {/* Secondary Accent Image/Shape */}
                                <div className="accent-shape d-none d-md-block"></div>

                                {/* Floating Glass Stats */}
                                <div className="glass-stats-card p-4 rounded-4 shadow-xl animate-float">
                                    <div className="d-flex align-items-center gap-3">
                                        <h2 className="fw-black text-primary m-0">10<span className="plus">+</span></h2>
                                        <p className="small fw-bold text-navy m-0">Years of Curated<br />Excellence</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="col-lg-6 ps-lg-5">
                            <div className="about-content">
                                <span className="section-subtitle">OUR PHILOSOPHY</span>
                                <h2 className="display-4 fw-black text-navy mb-4 mt-2">
                                    Redefining the <br />
                                    <span className="text-gradient">Shopping Experience</span>
                                </h2>

                                <p className="lead-text mb-4">
                                    At <strong>TROVO</strong>, we don't just sell products; we curate lifestyles.
                                    Founded in 2024, our mission is to bridge the gap between premium quality and accessible pricing.
                                </p>

                                <div className="row g-4 mb-5">
                                    <div className="col-sm-6">
                                        <div className="feature-mini d-flex gap-3">
                                            <i className="bi bi-patch-check-fill text-primary fs-3"></i>
                                            <div>
                                                <h6 className="fw-bold m-0">Rigorous Quality</h6>
                                                <p className="extra-small text-muted m-0">12-point quality check.</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="feature-mini d-flex gap-3">
                                            <i className="bi bi-people-fill text-primary fs-3"></i>
                                            <div>
                                                <h6 className="fw-bold m-0">50k+ Community</h6>
                                                <p className="extra-small text-muted m-0">Global happy customers.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button className="btn-neo-outline">
                                    <span>Read Full Journey</span>
                                    <i className="bi bi-arrow-right ms-2"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* --- BOUTIQUE LATEST ARRIVALS --- */}
            <section className="latest-arrivals py-6 bg-white">
                <div className="container mb-5 pb-5">
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end mb-5 gap-3">
                        <div className="section-head">
                            <p className="kicker-text">CURATED SELECTION</p>
                            <h2 className="display-4 fw-black text-navy m-0">The New <span className="text-primary">Standard.</span></h2>
                        </div>
                        <a href="#" className="explore-link">
                            View Collection <span className="arrow-icon">→</span>
                        </a>
                    </div>

                    <div className="row g-4">
                        {fewproducts.map((product, index) => {
                            // 1. Check if this product is in the wishlist state
                            const isWishlisted = wishlistids?.includes(product.product_id);

                            return (
                                <div key={index} className="col-6 col-lg-3">
                                    <div className="premium-product-card">
                                        <div className="image-frame">
                                            <div className="glass-tag">NEW DROP</div>

                                            {/* 2. Unified Toggle Logic */}
                                            <div className="action-icons">
                                                {isWishlisted ? (
                                                    <button
                                                        className="circle-icon active-wishlist"
                                                        onClick={() => {
                                                            if (!loginuser?.user_id) {
                                                                Settoastmessage("Please login first");
                                                                Settoastcolor("danger");
                                                                Setshowtoast(true);
                                                                return;
                                                            }

                                                            Setwishlistids(prev => prev.filter(id => id !== product.product_id));

                                                            Removefromwishlist(
                                                                loginuser.user_id,
                                                                product.product_id,
                                                                Setwishlistids,
                                                                Settoastmessage,
                                                                Setshowtoast,
                                                                Settoastcolor
                                                            );
                                                        }}
                                                    >
                                                        <i className="bi bi-heart-fill text-danger"></i>
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="circle-icon"
                                                        disabled={!loginuser?.user_id}
                                                        onClick={() => {
                                                            if (!loginuser?.user_id) {
                                                                Settoastmessage("Please login first");
                                                                Settoastcolor("danger");
                                                                Opentoast(Setshowtoast);
                                                                return;
                                                            }

                                                            Setwishlistids(prev => [...prev, product.product_id]);

                                                            Addtowishlist(
                                                                loginuser.user_id,
                                                                product.product_id,
                                                                Setwishlistids,
                                                                Settoastmessage,
                                                                Setshowtoast,
                                                                Settoastcolor
                                                            );
                                                        }}
                                                    >
                                                        <i className="bi bi-heart"></i>
                                                    </button>
                                                )}
                                            </div>

                                            <div className="product-visual">
                                                <img src={`${IMAGES_URL}/${product.image}`} alt={product.product_name} />
                                            </div>

                                            <div className="cart-slider">
                                                <Link to={`/viewproduct/${product.product_id}`} className="btn-cart-add">
                                                    <i className="bi bi-plus-lg"></i> QUICK VIEW
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="product-details mt-3">
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <span className="brand-label">TROVO ESSENTIALS</span>
                                                <span className="rating-tag"><i className="bi bi-star-fill text-warning"></i> 4.9</span>
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


            <section className="features-neo py-6">
                <div className="container">
                    <div className="row g-4">
                        {/* Card 1 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="neo-card">
                                <div className="neo-icon-wrapper text-primary">
                                    <i className="bi bi-truck"></i>
                                    <div className="icon-glow bg-primary"></div>
                                </div>
                                <div className="neo-content">
                                    <h5 className="neo-title">Global <br />Shipping</h5>
                                    <p className="neo-text">Free delivery on orders over $150, tracked to your door.</p>
                                </div>
                                <div className="neo-number">01</div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="neo-card">
                                <div className="neo-icon-wrapper text-success">
                                    <i className="bi bi-shield-lock"></i>
                                    <div className="icon-glow bg-success"></div>
                                </div>
                                <div className="neo-content">
                                    <h5 className="neo-title">Secure <br />Payment</h5>
                                    <p className="neo-text">100% SSL encrypted gateways for your total peace of mind.</p>
                                </div>
                                <div className="neo-number">02</div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="neo-card">
                                <div className="neo-icon-wrapper text-purple">
                                    <i className="bi bi-arrow-repeat"></i>
                                    <div className="icon-glow bg-purple"></div>
                                </div>
                                <div className="neo-content">
                                    <h5 className="neo-title">90 Days <br />Return</h5>
                                    <p className="neo-text">Not satisfied? Return any item within 90 days, no questions.</p>
                                </div>
                                <div className="neo-number">03</div>
                            </div>
                        </div>

                        {/* Card 4 */}
                        <div className="col-md-6 col-lg-3">
                            <div className="neo-card">
                                <div className="neo-icon-wrapper text-orange">
                                    <i className="bi bi-headset"></i>
                                    <div className="icon-glow bg-orange"></div>
                                </div>
                                <div className="neo-content">
                                    <h5 className="neo-title">24/7 <br />Support</h5>
                                    <p className="neo-text">Expert team available around the clock for your needs.</p>
                                </div>
                                <div className="neo-number">04</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* --- FLASH SALE SECTION: FOOTER-READY --- */}
            <section className="flash-sale-nexus py-5" style={{ background: '#020617' }}>
                <div className="container overflow-hidden rounded-5 p-0 border border-white border-opacity-10 position-relative">

                    {/* Dynamic Background Element */}
                    <div className="bg-grid-overlay"></div>

                    <div className="row g-0 align-items-stretch min-vh-60">
                        {/* Left Content Column */}
                        <div className="col-lg-7 p-5 p-md-6 position-relative z-2">
                            <div className="d-inline-flex align-items-center gap-2 mb-4 bg-white bg-opacity-5 px-3 py-1 rounded-pill">
                                <span className="live-dot pulse-red"></span>
                                <span className="text-danger fw-black extra-small ls-wider text-uppercase">Flash Sale Live</span>
                            </div>

                            <h2 className="display-4 fw-black text-white mb-3 ls-tight">
                                Midnight <br />
                                <span className="text-glow-cyan">Tech Drop.</span>
                            </h2>

                            <p className="text-secondary mb-5 opacity-75 pe-lg-5">
                                The Pro Max Ultra bundle is now 40% off.
                                Once the clock hits zero, the price resets to retail.
                            </p>

                            {/* Minimalist Cyber Timer */}
                            <div className="d-flex gap-3 gap-md-4 mb-5">
                                <div className="nexus-timer">
                                    <span className="time">08</span>
                                    <span className="label">HRS</span>
                                </div>
                                <div className="timer-sep">:</div>
                                <div className="nexus-timer">
                                    <span className="time">42</span>
                                    <span className="label">MIN</span>
                                </div>
                                <div className="timer-sep">:</div>
                                <div className="nexus-timer">
                                    <span className="time text-cyan">15</span>
                                    <span className="label">SEC</span>
                                </div>
                            </div>

                            {/* Secure Button */}
                            <div className="d-flex align-items-center gap-4 flex-wrap">
                                <button className="btn btn-nexus-primary">
                                    Secure the Bundle <i className="bi bi-arrow-right-short ms-2"></i>
                                </button>
                                <div className="stock-hint">
                                    <span className="d-block text-white-50 extra-small fw-bold">HURRY! ONLY</span>
                                    <span className="text-cyan fw-black fs-5">12 UNITS LEFT</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Visual Column - High Tech Graphic */}
                        <div className="col-lg-5 d-none d-lg-flex align-items-center justify-content-center position-relative overflow-hidden" style={{ background: '#050a18' }}>
                            <div className="tech-orb"></div>
                            <div className="tech-visual text-white">
                                <i className="bi bi-cpu display-1 opacity-25"></i>
                                <div className="scan-line"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            {showtoast && (
                <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div className={`toast show align-items-center text-white bg-${toastcolor} border-0 shadow-lg rounded-3`}>
                        <div className="d-flex">
                            <div className="toast-body fw-bold">
                                {toastcolor === "success" ? <i className="bi bi-check-circle-fill me-2"></i> : <i className="bi bi-exclamation-triangle-fill me-2"></i>}
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
