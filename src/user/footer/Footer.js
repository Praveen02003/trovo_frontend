import React from 'react';
import '../footer/Footer.css'
export const Footer = () => {
    return (
        <>
            <footer className="trovo-footer pt-5">
                <div className="container pt-5 pb-4">
                    <div className="row gy-5">
                        {/* Brand Section */}
                        <div className="col-lg-4">
                            <div className="brand-block pe-lg-5">
                                <h2 className="brand-logo mb-3 text-white fw-black">
                                    TROVO<span className="text-primary">.</span>
                                </h2>
                                <p className="footer-text mb-4">
                                    Curating the world’s most sought-after products for the modern pioneer. From precision tech to high-street fashion, we redefine your standard of living.
                                </p>
                                <div className="social-stack d-flex gap-3">
                                    <a href="#" className="social-link"><i className="bi bi-facebook"></i></a>
                                    <a href="#" className="social-link"><i className="bi bi-instagram"></i></a>
                                    <a href="#" className="social-link"><i className="bi bi-twitter-x"></i></a>
                                    <a href="#" className="social-link"><i className="bi bi-tiktok"></i></a>
                                </div>
                            </div>
                        </div>

                        {/* Links Column 1 */}
                        <div className="col-6 col-md-3 col-lg-2">
                            <h6 className="footer-label">Collections</h6>
                            <ul className="list-unstyled menu-links">
                                <li><a href="#">Electronics</a></li>
                                <li><a href="#">Smart Fashion</a></li>
                                <li><a href="#">Home Decor</a></li>
                                <li><a href="#">Accessories</a></li>
                                <li><a href="#">New Drops</a></li>
                            </ul>
                        </div>

                        {/* Links Column 2 */}
                        <div className="col-6 col-md-3 col-lg-2">
                            <h6 className="footer-label">Customer</h6>
                            <ul className="list-unstyled menu-links">
                                <li><a href="#">Track Order</a></li>
                                <li><a href="#">Returns</a></li>
                                <li><a href="#">Help Center</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>

                        {/* Newsletter Section */}
                        <div className="col-lg-4 col-md-6">
                            <div className="newsletter-card">
                                <h6 className="footer-label">Stay in the Loop</h6>
                                <p className="footer-text mb-4">Subscribe to receive early access to sales and exclusive brand updates.</p>
                                <div className="newsletter-input-group">
                                    <input
                                        type="email"
                                        className="newsletter-control"
                                        placeholder="your@email.com"
                                    />
                                    <button className="newsletter-btn" type="button">
                                        SIGN UP
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="footer-sub-bar py-4 mt-5">
                    <div className="container">
                        <div className="row align-items-center gy-3">
                            <div className="col-md-6 text-center text-md-start">
                                <p className="copyright-text m-0">
                                    © 2024 <span className="text-white">TROVO</span>. DESIGNED FOR THE FUTURE.
                                </p>
                            </div>
                            <div className="col-md-6">
                                <div className="payment-stack d-flex gap-4 justify-content-center justify-content-md-end">
                                    <i className="bi bi-credit-card-2-back"></i>
                                    <i className="bi bi-paypal"></i>
                                    <i className="bi bi-apple"></i>
                                    <i className="bi bi-google"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
};
