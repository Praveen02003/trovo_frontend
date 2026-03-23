import React from 'react';
import '../footer/Footer.css';

export const Footer = () => {
    return (
        <footer className="trovo-footer pt-5">
            <div className="container pt-4 pb-4">
                <div className="row gy-5">

                    {/* ── Brand ── */}
                    <div className="col-lg-4">
                        <div className="brand-block pe-lg-5">
                            <h2 className="brand-logo mb-3">
                                TROVO<span className="dot">.</span>
                            </h2>
                            <p className="footer-text mb-4">
                                Curating the world's most sought-after products for the modern pioneer.
                                From precision tech to high-street fashion, we redefine your standard of living.
                            </p>
                            <div className="social-stack">
                                <a href="#" className="social-link" aria-label="Facebook">
                                    <i className="bi bi-facebook"></i>
                                </a>
                                <a href="#" className="social-link" aria-label="Instagram">
                                    <i className="bi bi-instagram"></i>
                                </a>
                                <a href="#" className="social-link" aria-label="Twitter / X">
                                    <i className="bi bi-twitter-x"></i>
                                </a>
                                <a href="#" className="social-link" aria-label="TikTok">
                                    <i className="bi bi-tiktok"></i>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* ── Collections ── */}
                    <div className="col-6 col-md-3 col-lg-2">
                        <span className="footer-label">Collections</span>
                        <ul className="menu-links">
                            <li><a href="#">Electronics</a></li>
                            <li><a href="#">Smart Fashion</a></li>
                            <li><a href="#">Home Decor</a></li>
                            <li><a href="#">Accessories</a></li>
                            <li><a href="#">New Drops</a></li>
                        </ul>
                    </div>

                    {/* ── Customer ── */}
                    <div className="col-6 col-md-3 col-lg-2">
                        <span className="footer-label">Customer</span>
                        <ul className="menu-links">
                            <li><a href="#">Track Order</a></li>
                            <li><a href="#">Returns</a></li>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* ── Newsletter ── */}
                    <div className="col-lg-4 col-md-6">
                        <div className="newsletter-card">
                            <span className="footer-label">Stay in the Loop</span>
                            <p className="footer-text mb-4">
                                Subscribe to receive early access to sales and exclusive brand updates.
                            </p>
                            <div className="newsletter-input-group">
                                <input
                                    type="email"
                                    className="newsletter-control"
                                    placeholder="your@email.com"
                                />
                                <button className="newsletter-btn" type="button">
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div className="footer-sub-bar py-4">
                <div className="container">
                    <div className="row align-items-center gy-3">
                        <div className="col-md-6 text-center text-md-start">
                            <p className="copyright-text m-0">
                                © 2024 <span>TROVO</span>. Designed for the future.
                            </p>
                        </div>
                        <div className="col-md-6">
                            <div className="payment-stack justify-content-center justify-content-md-end">
                                <i className="bi bi-credit-card-2-back" title="Card"></i>
                                <i className="bi bi-paypal" title="PayPal"></i>
                                <i className="bi bi-apple" title="Apple Pay"></i>
                                <i className="bi bi-google" title="Google Pay"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};