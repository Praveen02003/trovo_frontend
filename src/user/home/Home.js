import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../home/Home.css'


export const Home = () => {
    const [cartCount, setCartCount] = useState(2);

    const categories = [
        { id: 1, name: "Electronics", icon: "bi-cpu", color: "#00f2fe" },
        { id: 2, name: "Fashion", icon: "bi-bag-heart", color: "#f093fb" },
        { id: 3, name: "Home", icon: "bi-house-door", color: "#4facfe" },
        { id: 4, name: "Beauty", icon: "bi-stars", color: "#f5576c" },
    ];

    const products = [
        { id: 1, name: "Trovo Neo Watch", price: 299, image: "https://images.unsplash.com", tag: "New" },
        { id: 2, name: "Cyber Audio Pro", price: 399, image: "https://images.unsplash.com", tag: "Sale" },
        { id: 3, name: "Trovo Smart Bag", price: 499, image: "https://images.unsplash.com", tag: "Hot" },
        { id: 4, name: "Glass Lens Pro", price: 599, image: "https://images.unsplash.com", tag: "Limited" },
    ];

    return (
        <div style={{ backgroundColor: "#080808", color: "#ffffff", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

            {/* 1. Professional Neon Navbar */}
            <nav className="navbar navbar-expand-lg sticky-top py-3" style={{ background: "rgba(10,10,10,0.95)", backdropFilter: "blur(15px)", borderBottom: "1px solid rgba(255,255,255,0.1)", zIndex: "1050" }}>
                <div className="container">
                    <a className="navbar-brand fw-800 fs-2 trovo-logo" href="#">
                        <span className="text-cyan">TRO</span><span className="text-magenta">VO</span>
                    </a>

                    <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
                        <i className="bi bi-list text-white fs-1"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4 gap-3">
                            <li className="nav-item"><a className="nav-link text-white-50 hover-glow" href="#">Home</a></li>
                            <li className="nav-item"><a className="nav-link text-white-50 hover-glow" href="#shop">Shop</a></li>
                            <li className="nav-item"><a className="nav-link text-white-50 hover-glow" href="#about">About</a></li>
                            <li className="nav-item"><a className="nav-link text-white-50 hover-glow" href="#contact">Contact</a></li>
                        </ul>

                        <div className="d-flex align-items-center gap-4">
                            <div className="search-box d-none d-xl-flex">
                                <input type="text" className="search-input" placeholder="Search brands..." />
                                <i className="bi bi-search search-icon text-white-50"></i>
                            </div>

                            <a href="#" className="text-white-50 position-relative p-2 wishlist-btn">
                                <i className="bi bi-heart-fill fs-5"></i>
                                <span className="badge-dot"></span>
                            </a>

                            <button className="btn cart-btn rounded-pill px-4 fw-bold d-flex align-items-center gap-2" onClick={() => setCartCount(cartCount + 1)}>
                                <i className="bi bi-bag-check-fill"></i>
                                <span>{cartCount} Items</span>
                            </button>

                            <div className="dropdown">
                                <button className="btn p-0 border-0 dropdown-toggle no-caret" data-bs-toggle="dropdown">
                                    <img src="https://ui-avatars.com" className="rounded-circle border border-info shadow-glow-blue" style={{ width: "40px" }} alt="User" />
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end glass-dropdown mt-3 animate-pop">
                                    <li><a className="dropdown-item py-2" href="#"><i className="bi bi-person me-2"></i> Profile</a></li>
                                    <li><a className="dropdown-item py-2" href="#"><i className="bi bi-box-seam me-2"></i> Orders</a></li>
                                    <li><hr className="dropdown-divider border-secondary opacity-25" /></li>
                                    <li><a className="dropdown-item text-danger py-2" href="#"><i className="bi bi-power me-2"></i> Logout</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- CENTERED VIVID HERO CAROUSEL --- */}
<div id="trovoHero" className="carousel slide carousel-fade mb-5" data-bs-ride="carousel">
    <div className="carousel-indicators">
        <button type="button" data-bs-target="#trovoHero" data-bs-slide-to="0" className="active rounded-circle" style={{width: '12px', height: '12px'}}></button>
        <button type="button" data-bs-target="#trovoHero" data-bs-slide-to="1" className="rounded-circle" style={{width: '12px', height: '12px'}}></button>
    </div>

    <div className="carousel-inner shadow-lg">
        {/* Slide 1 - Centered Tech */}
        <div className="carousel-item active" style={{ height: '80vh', minHeight: '500px' }}>
            <div className="hero-center-overlay"></div>
            <img src="https://images.unsplash.com" className="d-block w-100 h-100 object-fit-cover" alt="Tech" />
            <div className="carousel-caption glass-caption-center d-flex flex-column align-items-center justify-content-center text-center">
                <h6 className="text-cyan fw-bold tracking-widest mb-3 animate-slide-up">SEASONAL DROP 01</h6>
                <h1 className="display-1 fw-800 glow-text-blue mb-4 animate-slide-up-delayed">NEO-TECH <br/>ESSENTIALS.</h1>
                <p className="lead fs-4 text-white-50 mb-4 d-none d-md-block max-w-600">Precision-engineered hardware for the digital nomad.</p>
                <div className="d-flex gap-3 mt-2">
                    <button className="btn btn-cyan rounded-pill px-5 py-3 fw-bold shadow-glow-blue">SHOP NOW</button>
                    <button className="btn btn-outline-light rounded-pill px-5 py-3 fw-bold">LEARN MORE</button>
                </div>
            </div>
        </div>

        {/* Slide 2 - Centered Fashion */}
        <div className="carousel-item" style={{ height: '80vh', minHeight: '500px' }}>
            <div className="hero-center-overlay-magenta"></div>
            <img src="https://images.unsplash.com" className="d-block w-100 h-100 object-fit-cover" alt="Fashion" />
            <div className="carousel-caption glass-caption-center d-flex flex-column align-items-center justify-content-center text-center">
                <h6 className="text-magenta fw-bold tracking-widest mb-3">LIMITED EDITION</h6>
                <h1 className="display-1 fw-800 glow-text-magenta mb-4">CYBER <br/>STREETWEAR.</h1>
                <p className="lead fs-4 text-white-50 mb-4 d-none d-md-block max-w-600">Express your vibe with Trovo's exclusive summer drops.</p>
                <button className="btn btn-magenta rounded-pill px-5 py-3 fw-bold shadow-glow-magenta">EXPLORE STYLE</button>
            </div>
        </div>
    </div>

    <button className="carousel-control-prev" type="button" data-bs-target="#trovoHero" data-bs-slide="prev">
        <span className="carousel-control-prev-icon p-3 rounded-circle bg-dark bg-opacity-50"></span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#trovoHero" data-bs-slide="next">
        <span className="carousel-control-next-icon p-3 rounded-circle bg-dark bg-opacity-50"></span>
    </button>
</div>


            {/* --- PROMO BANNERS --- */}
            <div className="container mb-5 pb-5">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="promo-banner rounded-5 p-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #00c6ff, #0072ff)' }}>
                            <div className="z-2 position-relative">
                                <h2 className="fw-800 display-6">FREE SHIPPING</h2>
                                <p className="fs-5 opacity-75">On all orders over $99. No code needed.</p>
                                <a href="#shop" className="btn btn-white-glass rounded-pill px-4 fw-bold">DETAILS</a>
                            </div>
                            <i className="bi bi-truck position-absolute end-0 bottom-0 display-1 opacity-25 m-3 p-3"></i>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="promo-banner rounded-5 p-5 position-relative overflow-hidden" style={{ background: 'linear-gradient(45deg, #f093fb, #f5576c)' }}>
                            <div className="z-2 position-relative">
                                <h2 className="fw-800 display-6">INSTANT 20% OFF</h2>
                                <p className="fs-5 opacity-75">For new Trovo members only.</p>
                                <button className="btn btn-white-glass rounded-pill px-4 fw-bold">JOIN NOW</button>
                            </div>
                            <i className="bi bi-tag position-absolute end-0 bottom-0 display-1 opacity-25 m-3 p-3"></i>
                        </div>
                    </div>
                </div>
            </div>


            {/* 3. Categories Universe */}
            <div className="container py-5 text-center my-5">
                <h6 className="text-cyan fw-bold tracking-widest text-uppercase">Categories</h6>
                <h2 className="display-4 fw-800 mb-5">Browse by Universe</h2>
                <div className="row justify-content-center g-4">
                    {categories.map((cat) => (
                        <div key={cat.id} className="col-6 col-md-3">
                            <div className="cat-card p-5 rounded-4" style={{ "--hover-color": cat.color }}>
                                <i className={`bi ${cat.icon} display-4 mb-3`} style={{ color: cat.color }}></i>
                                <h5 className="fw-bold m-0">{cat.name}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. Products Grid */}
            <div id="shop" className="container py-5">
                <div className="d-flex justify-content-between align-items-end mb-5">
                    <div>
                        <h6 className="text-magenta fw-bold tracking-widest text-uppercase">New Arrivals</h6>
                        <h2 className="display-5 fw-800">Featured Drops</h2>
                    </div>
                    <a href="#" className="text-white-50 text-decoration-none border-bottom border-secondary pb-1">View All</a>
                </div>
                <div className="row g-4">
                    {products.map(product => (
                        <div key={product.id} className="col-12 col-sm-6 col-md-3">
                            <div className="card h-100 product-glass border-0">
                                <div className="position-relative overflow-hidden rounded-4 m-3">
                                    <span className="badge position-absolute top-0 end-0 m-2 z-3 bg-cyan text-dark rounded-pill px-3 py-2 fw-bold">{product.tag}</span>
                                    <img src={product.image} className="card-img-top product-img" alt={product.name} />
                                </div>
                                <div className="card-body p-4 pt-0 text-center">
                                    <h5 className="fw-bold mb-1">{product.name}</h5>
                                    <p className="text-white-50 small mb-3">Limited Edition • Trovo Series</p>
                                    <div className="d-flex justify-content-between align-items-center mt-3">
                                        <span className="fs-4 fw-800 text-cyan">${product.price}</span>
                                        <button className="btn btn-info-glow rounded-circle p-2" onClick={() => setCartCount(cartCount + 1)}>
                                            <i className="bi bi-plus-lg fs-5"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 5. About Us Section */}
            <section id="about" className="py-5 bg-dark-vibe my-5">
                <div className="container">
                    <div className="row align-items-center g-5">
                        <div className="col-lg-6">
                            <h6 className="text-cyan fw-bold tracking-widest text-uppercase">Our Story</h6>
                            <h2 className="display-4 fw-800 mb-4">Born to be <span className="text-magenta">Different.</span></h2>
                            <p className="text-white-50 fs-5 lh-lg">
                                Trovo isn't just a store; it's a movement. We curate products that define the edge of technology and fashion. Our mission is to provide premium essentials that don't just work well—they look incredible.
                            </p>
                            <div className="d-flex gap-5 mt-4">
                                <div><h3 className="fw-800 text-cyan">99%</h3><p className="small text-white-50">Sat Rate</p></div>
                                <div><h3 className="fw-800 text-magenta">24h</h3><p className="small text-white-50">Support</p></div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="about-frame p-3 rounded-5">
                                <img src="https://images.unsplash.com" className="img-fluid rounded-5 grayscale-hover transition-all" alt="Team" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. Contact Us Section */}
            <section id="contact" className="container py-5 mb-5">
                <div className="contact-glass p-5 rounded-5 border border-secondary border-opacity-25">
                    <div className="row g-5">
                        <div className="col-lg-5">
                            <h2 className="fw-800 display-5 mb-4">Contact <span className="text-cyan">Us</span></h2>
                            <p className="text-white-50 mb-4">Have questions? Our support team is available 24/7 to assist you in the Trovo Universe.</p>
                            <div className="d-flex align-items-center mb-3"><i className="bi bi-geo-alt-fill text-cyan me-3 fs-5"></i> 77 Trovo Plaza, Neon City</div>
                            <div className="d-flex align-items-center mb-3"><i className="bi bi-envelope-fill text-magenta me-3 fs-5"></i> help@trovo.shop</div>
                        </div>
                        <div className="col-lg-7">
                            <form className="row g-3">
                                <div className="col-md-6"><input type="text" className="form-control glass-input" placeholder="Name" /></div>
                                <div className="col-md-6"><input type="email" className="form-control glass-input" placeholder="Email" /></div>
                                <div className="col-12"><textarea className="form-control glass-input" rows="4" placeholder="How can we help?"></textarea></div>
                                <div className="col-12"><button className="btn btn-cyan w-100 rounded-pill py-3 fw-bold shadow-glow-blue mt-2">SEND SIGNAL</button></div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Professional Footer */}
            <footer className="footer-obsidian pt-5 pb-4 mt-5">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4">
                            <h2 className="fw-800 mb-4 fs-3"><span className="text-cyan">TRO</span><span className="text-magenta">VO</span></h2>
                            <p className="text-white-50 small pe-lg-5">Curating the future of lifestyle essentials. High-end tech, premium fashion, zero compromise.</p>
                            <div className="d-flex gap-3 fs-4 mt-3">
                                <i className="bi bi-instagram hover-magenta pointer"></i>
                                <i className="bi bi-twitter-x hover-cyan pointer"></i>
                                <i className="bi bi-facebook hover-cyan pointer"></i>
                            </div>
                        </div>
                        <div className="col-6 col-lg-2">
                            <h6 className="fw-bold mb-4">Shop</h6>
                            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2">
                                <li className="hover-white pointer">New Arrivals</li>
                                <li className="hover-white pointer">Best Sellers</li>
                                <li className="hover-white pointer">Deals</li>
                            </ul>
                        </div>
                        <div className="col-6 col-lg-2">
                            <h6 className="fw-bold mb-4">Support</h6>
                            <ul className="list-unstyled text-white-50 small d-flex flex-column gap-2">
                                <li className="hover-white pointer">Track Order</li>
                                <li className="hover-white pointer">Returns</li>
                                <li className="hover-white pointer">Help Center</li>
                            </ul>
                        </div>
                        <div className="col-lg-4">
                            <h6 className="fw-bold mb-4">Newsletter</h6>
                            <div className="input-group">
                                <input type="text" className="form-control glass-input-sm" placeholder="Email address" />
                                <button className="btn btn-cyan">JOIN</button>
                            </div>
                        </div>
                    </div>
                    <hr className="my-5 border-secondary border-opacity-25" />
                    <p className="text-center text-white-50 small m-0">&copy; 2026 Trovo Shop. Designed for the Future.</p>
                </div>
            </footer>

            <style>{`
                @import url('https://fonts.googleapis.com');
                .fw-800 { font-weight: 800; }
                .text-cyan { color: #00f2fe; }
                .text-magenta { color: #f093fb; }
                .tracking-widest { letter-spacing: 0.2rem; }
                .pointer { cursor: pointer; }

                /* Navbar & Icons */
                .hover-glow:hover { color: #00f2fe !important; text-shadow: 0 0 8px #00f2fe; }
                .search-box { background: rgba(255,255,255,0.05); padding: 8px 15px; border-radius: 50px; border: 1px solid rgba(255,255,255,0.1); }
                .search-input { background: transparent; border: none; color: white; outline: none; font-size: 0.9rem; }
                .cart-btn { background: linear-gradient(45deg, #00f2fe, #4facfe); border: none; color: #000; box-shadow: 0 0 15px rgba(0, 242, 254, 0.4); }
                .wishlist-btn:hover i { color: #f093fb; transform: scale(1.1); transition: 0.3s; }
                .badge-dot { position: absolute; top: 10px; right: 10px; width: 8px; height: 8px; background: #f093fb; border-radius: 50%; border: 2px solid #080808; }

                /* Hero */
                .hero-slide { height: 85vh; min-height: 500px; position: relative; }
                .hero-overlay { position: absolute; width: 100%; height: 100%; background: linear-gradient(to right, #080808, transparent); z-index: 1; }
                .carousel-caption { z-index: 2; left: 10%; right: 10%; }
                .glow-text-blue { text-shadow: 0 0 30px rgba(0, 242, 254, 0.6); }
                .glow-text-magenta { text-shadow: 0 0 30px rgba(240, 147, 251, 0.6); }
                .btn-magenta { background: #f093fb; color: #000; }

                /* Cards */
                .cat-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); transition: 0.4s; }
                .cat-card:hover { transform: translateY(-10px); border-color: var(--hover-color); box-shadow: 0 0 30px var(--hover-color); background: rgba(255,255,255,0.08); }
                .product-glass { background: rgba(255,255,255,0.03) !important; border: 1px solid rgba(255,255,255,0.05) !important; transition: 0.4s; border-radius: 25px !important; }
                .product-glass:hover { transform: translateY(-12px); border-color: #00f2fe !important; box-shadow: 0 20px 40px rgba(0,0,0,0.6); }
                .product-img { height: 260px; object-fit: cover; transition: 0.6s; }
                .product-glass:hover .product-img { transform: scale(1.1); }
                .btn-info-glow { border: 1px solid #00f2fe; color: #00f2fe; background: rgba(0,242,254,0.1); }
                .btn-info-glow:hover { background: #00f2fe; color: #000; box-shadow: 0 0 15px #00f2fe; }

                /* About & Contact */
                .bg-dark-vibe { background: #0c0c0c; border-top: 1px solid rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.03); }
                .about-frame { border: 2px dashed rgba(0, 242, 254, 0.3); }
                .transition-all { transition: 0.5s ease; }
                .grayscale-hover:hover { filter: grayscale(0%); transform: scale(1.02); }
                .grayscale-hover { filter: grayscale(100%); }
                .contact-glass { background: rgba(255,255,255,0.02); backdrop-filter: blur(10px); }
                .glass-input { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); color: #fff; padding: 15px; border-radius: 15px; }
                .glass-input:focus { background: rgba(255,255,255,0.08); color: #fff; border-color: #00f2fe; box-shadow: none; }
                
                /* Footer */
                .footer-obsidian { background: #040404; }
                .hover-white:hover { color: #fff; }
                .hover-magenta:hover { color: #f093fb; transition: 0.3s; }
                .hover-cyan:hover { color: #00f2fe; transition: 0.3s; }
                .glass-input-sm { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: #fff; border-radius: 50px 0 0 50px !important; padding-left: 20px; }
            `}</style>
        </div>
    );
};
