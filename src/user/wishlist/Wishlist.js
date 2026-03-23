import React, { useContext, useEffect } from 'react';
import { Navbar } from '../navbar/Navbar';
import '../wishlist/Wishlist.css';
import { maincontext } from '../../App';
import { Getwishlistdata } from '../../function/Getwishlistdata';
import { Link } from 'react-router-dom';
import { Removefromwishlist } from '../../function/Removefromwishlist';
import { Getloginuser } from '../../function/Getloginuser';
import { Closetoast } from '../../function/Closetoast';
import { Opentoast } from '../../function/Opentoast';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';

export const Wishlist = () => {
    const {
        loginuser, Setloginuser,
        wishlistids, Setwishlistids,
        wishlistdata, Setwishlistdata,
        showtoast, Setshowtoast,
        toastcolor, Settoastcolor,
        toastmessage, Settoastmessage,
    } = useContext(maincontext);

    useEffect(() => {
        const loadData = async () => {
            const isUser = await Userauth();
            if (!isUser) return;
            const user = Getloginuser();
            Setloginuser(user);
            if (user?.user_id) await Getwishlistdata(Setwishlistids, Setwishlistdata);
        };
        loadData();
    }, []);

    const handleRemove = (product) => {
        if (!loginuser?.user_id) {
            Settoastmessage("Please login first");
            Settoastcolor("danger");
            Opentoast(Setshowtoast);
            return;
        }
        Setwishlistids(prev => prev.filter(id => id !== product.product_id));
        Setwishlistdata(prev => prev.filter(p => p.product_id !== product.product_id));
        Removefromwishlist(
            loginuser.user_id, product.product_id,
            Setwishlistids, Settoastmessage, Setshowtoast, Settoastcolor, Setwishlistdata
        );
    };

    return (
        <div className="wishlist-page">
            <Navbar />

            <main className="container pb-5">

                {/* ── Header ── */}
                <div className="wishlist-header">
                    <div className="wishlist-header-icon">
                        <i className="bi bi-heart-fill"></i>
                    </div>
                    <h1 className="wishlist-title">My Wishlist</h1>
                    <p className="wishlist-sub">
                        You have <strong>{wishlistdata.length} items</strong> saved
                    </p>
                </div>

                {/* ── Grid ── */}
                <div className="row g-3 g-md-4">
                    {wishlistdata.length === 0 ? (

                        /* Empty state */
                        <div className="col-12">
                            <div className="wish-empty">
                                <i className="bi bi-heart wish-empty-icon"></i>
                                <h4>Your wishlist is empty</h4>
                                <p>Start saving items you love and find them here anytime.</p>
                                <Link to="/shop" className="wish-empty-btn">
                                    <i className="bi bi-bag"></i> Browse Shop
                                </Link>
                            </div>
                        </div>

                    ) : (
                        wishlistdata.map((product, index) => (
                            <div
                                key={product.product_id}
                                className="col-6 col-md-4 col-lg-3"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="wish-card">

                                    {/* Image */}
                                    <div className="wish-img-wrap">
                                        <div className="wish-new-tag">Saved</div>

                                        <button
                                            className="wish-remove-btn"
                                            onClick={() => handleRemove(product)}
                                            title="Remove from wishlist"
                                        >
                                            <i className="bi bi-x-lg"></i>
                                        </button>

                                        <img
                                            src={`${IMAGES_URL}/${product.image}`}
                                            alt={product.product_name}
                                            loading="lazy"
                                        />
                                    </div>

                                    {/* Body */}
                                    <div className="wish-body">
                                        <div className="wish-meta">
                                            <span className="wish-cat">{product.category_name}</span>
                                            <span className="wish-stock">
                                                <i className="bi bi-check-circle-fill"></i> In Stock
                                            </span>
                                        </div>

                                        <h6 className="wish-name">{product.product_name}</h6>

                                        <div className="wish-rating">
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-half"></i>
                                            <span style={{ color: 'var(--muted)', marginLeft: '4px' }}>4.9</span>
                                        </div>

                                        <p className="wish-price">${product.price}</p>

                                        <Link
                                            to={`/viewproduct/${product.product_id}`}
                                            className="wish-view-btn"
                                        >
                                            <i className="bi bi-eye"></i>
                                            View Product
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

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