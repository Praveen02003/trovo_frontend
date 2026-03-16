import React from 'react';

export const Navbar = () => {
    return (
        <div style={{ backgroundColor: '#0a0a0a' }}>
            <nav className="navbar navbar-expand-lg sticky-top py-3"
                style={{
                    background: 'rgba(10, 10, 10, 0.95)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.6)'
                }}>
                <div className="container">
                    {/* 1. Brand Logo with Neon Pulse */}
                    <a className="navbar-brand fw-black fs-2 me-5 trovo-logo-glow" href="/" style={{ letterSpacing: '-1.5px' }}>
                        <span style={{ background: 'linear-gradient(45deg, #00f2fe, #4facfe)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>TRO</span>
                        <span style={{ background: 'linear-gradient(45deg, #f093fb, #f5576c)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>VO</span>
                    </a>

                    <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon filter-invert"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav gap-3">
                            <li className="nav-item">
                                <a className="nav-link fw-bold text-white-50 nav-hover-underline" href="#home">HOME</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fw-bold text-white-50 nav-hover-underline" href="#shop">SHOP</a>
                            </li>
                        </ul>

                        {/* 2. Right Side Icons & Profile */}
                        <ul className="navbar-nav ms-auto align-items-center gap-4">

                            {/* Wishlist Heart - Neon Magenta Glow */}
                            <li className="nav-item">
                                <a className="nav-link position-relative p-2 wishlist-vibe" href="#wishlist">
                                    <i className="bi bi-heart-fill fs-4"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger border border-dark pulse-red">3</span>
                                </a>
                            </li>

                            {/* Cart - Electric Cyan Gradient Button */}
                            <li className="nav-item">
                                <button className="btn rounded-pill px-4 fw-bold cart-btn-vivid d-flex align-items-center gap-2">
                                    <i className="bi bi-bag-heart-fill"></i>
                                    <span>CART</span>
                                </button>
                            </li>

                            {/* 3. User Avatar & Professional Dropdown */}
                            <li className="nav-item dropdown">
                                <a className="nav-link p-0 dropdown-toggle no-caret" href="#" id="userMenu" role="button" data-bs-toggle="dropdown">
                                    <div className="profile-hex">
                                        <img
                                            src="https://ui-avatars.com"
                                            alt="User"
                                            className="rounded-circle border border-2 border-info shadow-neon-blue"
                                            style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                                        />
                                    </div>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end glass-dropdown mt-3 border-0 shadow-2xl animate-pop-in">
                                    <li className="dropdown-header text-uppercase small fw-black text-cyan pb-2">Account Dashboard</li>
                                    <li><a className="dropdown-item d-flex align-items-center" href="#profile">
                                        <div className="icon-box bg-soft-cyan"><i className="bi bi-person-badge-fill"></i></div>
                                        <span>My Profile</span>
                                    </a></li>
                                    <li><a className="dropdown-item d-flex align-items-center" href="#current">
                                        <div className="icon-box bg-soft-magenta"><i className="bi bi-truck"></i></div>
                                        <span>Track Order</span>
                                    </a></li>
                                    <li><a className="dropdown-item d-flex align-items-center" href="#history">
                                        <div className="icon-box bg-soft-yellow"><i className="bi bi-clock-history"></i></div>
                                        <span>Order History</span>
                                    </a></li>
                                    <li><hr className="dropdown-divider border-secondary opacity-25" /></li>
                                    <li><a className="dropdown-item text-danger d-flex align-items-center" href="#logout">
                                        <div className="icon-box bg-soft-danger"><i className="bi bi-power"></i></div>
                                        <span>Sign Out</span>
                                    </a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <style>{`
                /* 1. Neon Logo Effect */
                .trovo-logo-glow:hover {
                    filter: drop-shadow(0 0 12px #00f2fe);
                    transform: scale(1.02);
                    transition: 0.4s;
                }

                /* 2. Glassmorphism Dropdown */
                .glass-dropdown {
                    background: rgba(20, 20, 20, 0.95) !important;
                    backdrop-filter: blur(25px);
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 20px !important;
                    padding: 15px !important;
                    min-width: 250px;
                }

                .dropdown-item {
                    color: rgba(255,255,255,0.8) !important;
                    padding: 10px 15px !important;
                    border-radius: 12px !important;
                    margin-bottom: 5px;
                    transition: all 0.3s ease;
                }

                .dropdown-item:hover {
                    background: rgba(255, 255, 255, 0.05) !important;
                    color: #fff !important;
                    transform: translateX(8px);
                }

                /* 3. Dropdown Icon Boxes */
                .icon-box {
                    width: 35px; height: 35px;
                    display: flex; align-items: center; justify-content: center;
                    border-radius: 10px; margin-right: 15px; font-size: 1.1rem;
                }
                .bg-soft-cyan { background: rgba(0, 242, 254, 0.1); color: #00f2fe; }
                .bg-soft-magenta { background: rgba(240, 147, 251, 0.1); color: #f093fb; }
                .bg-soft-yellow { background: rgba(255, 193, 7, 0.1); color: #ffc107; }
                .bg-soft-danger { background: rgba(255, 71, 87, 0.1); color: #ff4757; }

                /* 4. Cart & Wishlist Glows */
                .cart-btn-vivid {
                    background: linear-gradient(45deg, #00f2fe, #4facfe);
                    color: #000 !important; border: none;
                    box-shadow: 0 0 20px rgba(0, 242, 254, 0.4);
                }
                .cart-btn-vivid:hover { transform: translateY(-3px); box-shadow: 0 0 30px rgba(0, 242, 254, 0.7); }

                .wishlist-vibe i { color: #f093fb; filter: drop-shadow(0 0 8px #f093fb); transition: 0.3s; }
                .wishlist-vibe:hover i { color: #ff00ff; transform: scale(1.2); }

                /* 5. Animations & Helpers */
                .animate-pop-in { animation: popIn 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55); }
                @keyframes popIn { from { opacity: 0; transform: scale(0.9) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
                
                .text-cyan { color: #00f2fe; }
                .no-caret::after { display: none; }
                .pulse-red { animation: pulseRed 2s infinite; }
                @keyframes pulseRed { 0% { transform: scale(0.95); } 70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(255, 0, 0, 0); } 100% { transform: scale(0.95); } }
                .filter-invert { filter: invert(1); }
                .shadow-neon-blue { box-shadow: 0 0 12px #00f2fe; }
            `}</style>
        </div>
    );
};
