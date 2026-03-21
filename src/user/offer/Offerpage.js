import React from 'react';
import { Navbar } from '../navbar/Navbar';
import '../offer/Offerpage.css'

export const Offer = () => {
    return (
        <div className="offers-premium-wrapper">
            <Navbar />

            <main className="container-fluid px-lg-5 py-5 mt-5">
                {/* 1. CINEMATIC HERO SECTION */}
                <header className="offer-hero-card rounded-5 overflow-hidden position-relative mb-5 shadow-2xl">
                    <div className="row g-0 h-100">
                        <div className="col-lg-8 p-5 p-md-6 d-flex flex-column justify-content-center z-2">
                            <div className="offer-badge-pill mb-4">
                                <span className="pulse-dot"></span> 24-HOUR FLASH SALE
                            </div>
                            <h1 className="display-1 fw-black text-white mb-3 ls-tight">
                                UNBEATABLE <br /> <span className="text-cyan-glow">OFFERS.</span>
                            </h1>
                            <p className="lead text-white-50 mb-5 max-w-500">
                                Precision-engineered tech and curated lifestyle essentials at clearance prices. Once it's gone, it's gone.
                            </p>

                            <div className="d-flex align-items-center gap-4 flex-wrap">
                                <button className="btn-cyan-solid">UNLOCK DEALS</button>
                                <div className="glass-countdown d-flex align-items-center gap-3">
                                    <div className="time-unit"><span>08</span><small>H</small></div>
                                    <div className="time-sep">:</div>
                                    <div className="time-unit"><span>42</span><small>M</small></div>
                                    <div className="time-sep">:</div>
                                    <div className="time-unit"><span>15</span><small>S</small></div>
                                </div>
                            </div>
                        </div>
                        {/* Decorative side with geometric depth */}
                        <div className="col-lg-4 d-none d-lg-block position-relative overflow-hidden bg-navy-accent">
                            <div className="floating-percent">%</div>
                            <div className="glass-orb"></div>
                        </div>
                    </div>
                </header>

                {/* 2. SECTION HEADER & FILTERS */}
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5 gap-4">
                    <div>
                        <h2 className="fw-black text-navy mb-1">Flash Catalogue</h2>
                        <p className="text-muted small fw-bold">SHOWING 12 HANDPICKED DEALS</p>
                    </div>
                    <div className="neo-filter-bar">
                        <button className="neo-pill active">All Drops</button>
                        <button className="neo-pill">Tech Specials</button>
                        <button className="neo-pill">Bundles</button>
                    </div>
                </div>

                {/* 3. BENTO OFFER GRID */}
                <div className="row g-4">
                    {/* Offer Item 1 */}
                    <div className="col-12 col-md-6 col-xl-3">
                        <div className="bento-offer-card">
                            <div className="offer-visual bg-soft-dark">
                                <div className="save-tag">SAVE $60</div>
                                <div className="visual-icon">
                                    <i className="bi bi-earbuds opacity-25"></i>
                                </div>
                                <div className="hover-action">
                                    <button className="btn-quick-add">QUICK ADD</button>
                                </div>
                            </div>
                            <div className="offer-details p-4">
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="offer-cat">AUDIO</span>
                                    <span className="stock-alert">LOW STOCK</span>
                                </div>
                                <h5 className="fw-bold text-navy mb-3">Sonic Buds Pro</h5>
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <span className="price-now">$89.00</span>
                                    <span className="price-was">$149.00</span>
                                </div>
                                <div className="inventory-bar">
                                    <div className="bar-fill bg-danger" style={{ width: '15%' }}></div>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <span className="extra-small text-muted fw-bold">8 LEFT</span>
                                    <span className="extra-small text-danger fw-bold">ENDS SOON</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Additional manual cards would follow the same structure */}
                </div>
            </main>
        </div>
    );
};
