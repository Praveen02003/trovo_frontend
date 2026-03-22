import React, { useContext, useEffect } from 'react';
import '../navbar/Navbar.css';
import { Logout } from '../../function/Logout';
import { Link, useLocation } from 'react-router-dom';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { Getwishlistdata } from '../../function/Getwishlistdata';
import { Getcartdata } from '../../function/Getcartdata';
import { IMAGES_URL } from '../../axios/Imageurl';

export const Navbar = () => {
    const {
        loginuser,
        Setloginuser,
        wishlistids,
        Setwishlistids,
        wishlistdata,
        Setwishlistdata,
        cartids,
        Setcartids,
        cartdata,
        Setcartdata,
    } = useContext(maincontext);
    const location = useLocation();

    useEffect(() => {
        // 1. Get the user object safely
        Setloginuser(Getloginuser());
        Getwishlistdata(Setwishlistids, Setwishlistdata);
        Getcartdata(Setcartids, Setcartdata);
    }, [])

    return (
        <nav className="navbar navbar-expand-lg sticky-top trovo-neo-nav">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="/">
                    <div className="brand-icon-box"><i className="bi bi-lightning-charge-fill"></i></div>
                    <span className="brand-logo-text">TROVO</span>
                </a>

                <button className="navbar-toggler neo-toggle" type="button" data-bs-toggle="collapse" data-bs-target="#trovoNav">
                    <span className="bar-top"></span><span className="bar-mid"></span><span className="bar-bot"></span>
                </button>

                <div className="collapse navbar-collapse" id="trovoNav">
                    <ul className="navbar-nav mx-auto neo-links">
                        {/* 2. Admin Link - Safe check */}
                        {loginuser?.role === "admin" && (
                            <li className="nav-item"><a className="nav-link text-primary" href="/admindashboard">Admin</a></li>
                        )}

                        <li className="nav-item"><a className={location.pathname === "/" ? 'nav-link active' : "nav-link"} href="/">Home</a></li>
                        <li className="nav-item"><a className={location.pathname === "/shop" ? 'nav-link active' : "nav-link"} href="/shop">Shop</a></li>

                        {/* 3. Login/Signup - Only if NOT logged in */}
                        {!loginuser && (
                            <>
                                <li className="nav-item"><a className="nav-link" href="/login">Login</a></li>
                                <li className="nav-item"><a className="nav-link" href="/signup">Signup</a></li>
                            </>
                        )}
                    </ul>

                    {/* 4. Profile & Cart - Only if logged in */}
                    {loginuser && (
                        <div className="d-flex align-items-center">
                            <div className="d-flex gap-3 align-items-center pe-3 border-end border-white border-opacity-10 me-3">
                                <Link className="neo-icon-btn position-relative" to={`/cart/${loginuser.user_id}`}>
                                    <i className="bi bi-bag"></i>
                                    <span className="neo-badge border-0">{cartids.length}</span>
                                </Link>
                                <Link className="neo-icon-btn position-relative" to={`/wishlist/${loginuser.user_id}`}>
                                    <i className="bi bi-heart"></i>
                                    <span className="neo-badge bg-primary border-0">{wishlistids.length}</span>
                                </Link>
                            </div>

                            {/* Profile - Integrated Circle */}
                            <div className="dropdown">
                                <div className="profile-btn-circle" data-bs-toggle="dropdown">
                                    <img src={`${IMAGES_URL}/${loginuser.profileimage}`} alt={`${loginuser.name}`} />
                                </div>

                                <ul className="dropdown-menu dropdown-menu-end neo-dropdown shadow-xl">
                                    <li className="px-3 py-2 border-bottom border-secondary border-opacity-10">
                                        <p className="m-0 small fw-bold text-white">{loginuser.name}</p>
                                        <p className="m-0 extra-small text-primary fw-bold text-uppercase">Gold Member</p>
                                    </li>
                                    <li><Link to={`/trackorder/${loginuser.user_id}`} className="dropdown-item mt-2"><i className="bi bi-box-seam"></i> Current Order</Link></li>
                                    <li><Link className="dropdown-item" to={`/history/${loginuser.user_id}`}><i className="bi bi-clock-history"></i> Order History</Link></li>
                                    <li><Link className="dropdown-item" to={`/userprofile/${loginuser.user_id}`}><i className="bi bi-gear"></i> Settings</Link></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li>
                                        <button className="dropdown-item text-danger-light" onClick={() => {
                                            Logout();
                                        }}>
                                            <i className="bi bi-power"></i>
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};
