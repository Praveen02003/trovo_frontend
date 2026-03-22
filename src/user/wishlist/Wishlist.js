import React, { useContext, useEffect } from 'react';
import { Navbar } from '../navbar/Navbar';
import '../wishlist/Wishlist.css'
import { maincontext } from '../../App';
import { Getwishlistdata } from '../../function/Getwishlistdata';
import { Link } from 'react-router-dom';
import { Removefromwishlist } from '../../function/Removefromwishlist';
import { Getloginuser } from '../../function/Getloginuser';
import { Closetoast } from '../../function/Closetoast';
import { Opentoast } from '../../function/Opentoast';
import { IMAGES_URL } from '../../axios/Imageurl';

export const Wishlist = () => {
    const {
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
    } = useContext(maincontext)

    useEffect(() => {
        Setloginuser(Getloginuser());
        Getwishlistdata(Setwishlistids, Setwishlistdata);
    }, [])
    return (
        <div className="bg-light min-vh-100">
            <Navbar />

            <main className="container py-5 mt-5">

                {/* Header */}
                <div className="text-center mb-5">
                    <h1 className="fw-bold display-5">My Wishlist</h1>
                    <p className="text-muted">
                        You have{" "}
                        <span className="text-primary fw-bold">
                            {wishlistdata.length}
                        </span>{" "}
                        items saved
                    </p>
                </div>

                <div className="row g-4">

                    {/* Empty State */}
                    {wishlistdata.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="bi bi-heart display-1 text-secondary"></i>
                            <h4 className="fw-bold mt-3">Your wishlist is empty</h4>
                            <p className="text-muted">Start adding items you love</p>
                            <Link
                                to="/"
                                className="btn btn-dark rounded-pill px-4"
                            >
                                Browse Shop
                            </Link>
                        </div>
                    ) : (

                        wishlistdata.map((product) => (
                            <div
                                className="col-sm-6 col-md-4 col-lg-3"
                                key={product.product_id}
                            >

                                <div className="card h-100 border-0 shadow-sm">

                                    {/* Image */}
                                    <div className="position-relative">

                                        <img
                                            src={`${IMAGES_URL}/${product.image}`}
                                            className="card-img-top p-3"
                                            style={{
                                                height: "220px",
                                                objectFit: "contain"
                                            }}
                                            alt={product.product_name}
                                        />

                                        {/* Remove Button */}

                                        <button
                                            className="btn btn-danger btn-sm position-absolute top-0 end-0 m-2 rounded-circle"
                                            onClick={() => {
                                                // ✅ SAFETY CHECK
                                                if (!loginuser?.user_id) {
                                                    Settoastmessage("Please login first");
                                                    Settoastcolor("danger");
                                                    Opentoast(Setshowtoast);
                                                    return;
                                                }

                                                // 1. Remove ID (instant UI)
                                                Setwishlistids(prev => prev.filter(id => id !== product.product_id));

                                                // 2. Remove from UI list
                                                Setwishlistdata(prev => prev.filter(item => item.product_id !== product.product_id));

                                                // 3. API Call
                                                Removefromwishlist(
                                                    loginuser.user_id,
                                                    product.product_id,
                                                    Setwishlistids,
                                                    Settoastmessage,
                                                    Setshowtoast,
                                                    Settoastcolor,
                                                    Setwishlistdata
                                                );
                                            }}
                                        >
                                            <i className="bi bi-x"></i>
                                        </button>

                                    </div>

                                    {/* Content */}
                                    <div className="card-body d-flex flex-column">

                                        <div className="d-flex justify-content-between mb-2">
                                            <small className="text-muted text-uppercase">
                                                {product.category_name}
                                            </small>
                                            <span className="badge bg-success">
                                                In Stock
                                            </span>
                                        </div>

                                        <h6 className="fw-bold text-truncate">
                                            {product.product_name}
                                        </h6>

                                        <p className="text-primary fw-bold mb-3">
                                            ${product.price}
                                        </p>

                                        <Link
                                            to={`/viewproduct/${product.product_id}`}
                                            className="btn btn-outline-dark mt-auto w-100"
                                        >
                                            <i className="bi bi-eye me-2"></i>
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
                <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div className={`toast show bg-${toastcolor} text-white border-0 shadow`}>
                        <div className="d-flex">
                            <div className="toast-body fw-bold">
                                {toastcolor === "success" ? (
                                    <i className="bi bi-check-circle-fill me-2"></i>
                                ) : (
                                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                                )}
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
