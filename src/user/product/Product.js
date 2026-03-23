import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import '../product/Product.css';
import { maincontext } from '../../App';
import { Getallactiveproducts } from '../../function/Getallactiveproducts';
import { Getloginuser } from '../../function/Getloginuser';
import { Getwishlistdata } from '../../function/Getwishlistdata';
import { Removefromwishlist } from '../../function/Removefromwishlist';
import { Addtowishlist } from '../../function/Addtowishlist';
import { Link, useParams } from 'react-router-dom';
import { Getcategories } from '../../function/Getcategories';
import { Closetoast } from '../../function/Closetoast';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Authuser } from '../../function/Authuser';
import { Opentoast } from '../../function/Opentoast';

export const Product = () => {
    const {
        getactiveproducts,
        Setgetactiveproducts,
        loginuser,
        Setloginuser,
        wishlistids,
        Setwishlistids,
        wishlistdata,
        Setwishlistdata,
        getcategories,
        Setgetcategories,
        showtoast,
        Setshowtoast,
        toastcolor,
        Settoastcolor,
        toastmessage,
        Settoastmessage
    } = useContext(maincontext);

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        Getallactiveproducts(Setgetactiveproducts, selectedCategory, searchTerm);
        Setloginuser(Getloginuser());
        Getwishlistdata(Setwishlistids, Setwishlistdata);
        Getcategories(Setgetcategories);
    }, [selectedCategory, searchTerm]);

    const handleWishlist = (product, isWishlisted) => {
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
            if (product.stock === 0) {
                Settoastmessage("Product is out of stock");
                Settoastcolor("danger");
                Opentoast(Setshowtoast);
                return;
            }
            Setwishlistids(prev => [...prev, product.product_id]);
            Addtowishlist(loginuser.user_id, product.product_id, Setwishlistids, Settoastmessage, Setshowtoast, Settoastcolor);
        }
    };

    return (
        <div className="products-page-wrapper">
            <Navbar />

            <main className="container-fluid px-3 px-lg-5 pt-5 pb-5 mt-4">

                {/* ── Page Header ── */}
                <div className="page-header-row mt-3">
                    <h4 className="page-title">
                        {selectedCategory === "All" ? "All Products" : selectedCategory}
                        <span className="count-dot">{getactiveproducts.length}</span>
                    </h4>

                    {/* Search */}
                    <div className="search-box-container shadow-sm border">
                        <i className="bi bi-search"></i>
                        <input
                            type="text"
                            placeholder="Search your gear..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <i className="bi bi-x-lg" onClick={() => setSearchTerm("")}></i>
                        )}
                    </div>
                </div>

                {/* ── Mobile Category Chips ── */}
                <div className="mobile-cat-chips d-lg-none mb-3">
                    <button
                        className={`cat-chip ${selectedCategory === "All" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("All")}
                    >
                        All
                    </button>
                    {getcategories.map((cat, i) => (
                        <button
                            key={i}
                            className={`cat-chip ${selectedCategory === cat.category_name ? "active" : ""}`}
                            onClick={() => setSelectedCategory(cat.category_name)}
                        >
                            {cat.category_image && (
                                <img
                                    src={`${IMAGES_URL}/${cat.category_image}`}
                                    alt={cat.category_name}
                                />
                            )}
                            {cat.category_name}
                        </button>
                    ))}
                </div>

                <div className="row g-4 align-items-start">

                    {/* ── Sidebar ── */}
                    <aside className="col-lg-2 d-none d-lg-block">
                        <div className="filter-sidebar">
                            <span className="sidebar-label">Collections</span>
                            <ul className="sidebar-menu">
                                <li
                                    className={selectedCategory === "All" ? "active" : ""}
                                    onClick={() => setSelectedCategory("All")}
                                >
                                    <i className="bi bi-grid-3x3-gap" style={{ fontSize: '0.85rem' }}></i>
                                    All Categories
                                </li>
                                {getcategories.map((cat, i) => (
                                    <li
                                        key={i}
                                        className={selectedCategory === cat.category_name ? "active" : ""}
                                        onClick={() => setSelectedCategory(cat.category_name)}
                                    >
                                        {cat.category_image && (
                                            // <img
                                            //     src={`${IMAGES_URL}/${cat.category_image}`}
                                            //     alt={cat.category_name}
                                            //     className="sidebar-cat-img"
                                            // />
                                            <i className="bi bi-grid-3x3-gap" style={{ fontSize: '0.85rem' }}></i>
                                        )}
                                        {cat.category_name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>

                    {/* ── Product Grid ── */}
                    <section className="col-lg-10">
                        {getactiveproducts.length > 0 ? (
                            <div className="row g-3 g-md-4">
                                {getactiveproducts.map((product, index) => {
                                    const isWishlisted = wishlistids.includes(product.product_id);
                                    const outOfStock = product.stock === 0;

                                    return (
                                        <div
                                            key={index}
                                            className="col-6 col-md-4 col-xl-3"
                                            style={{ animationDelay: `${index * 0.04}s` }}
                                        >
                                            <div className="boutique-card">

                                                {/* Image area */}
                                                <div className="image-wrap">

                                                    {/* Badge */}
                                                    {outOfStock
                                                        ? <div className="card-tag bg-danger">Out of Stock</div>
                                                        : <div className="card-tag new-tag">New Drop</div>
                                                    }

                                                    {/* Action icons */}
                                                    <div className="card-actions">
                                                        <button
                                                            className={`circle-icon ${isWishlisted ? "active-wishlist" : ""}`}
                                                            onClick={() => handleWishlist(product, isWishlisted)}
                                                            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                                                        >
                                                            <i className={`bi ${isWishlisted ? "bi-heart-fill" : "bi-heart"}`}></i>
                                                        </button>

                                                        <Link
                                                            to={outOfStock ? "#" : `/viewproduct/${product.product_id}`}
                                                            className={`action-btn ${outOfStock ? "disabled" : ""}`}
                                                            title="Quick view"
                                                            onClick={(e) => {
                                                                if (outOfStock) {
                                                                    e.preventDefault();
                                                                    Settoastmessage("Product is out of stock");
                                                                    Settoastcolor("danger");
                                                                    Opentoast(Setshowtoast);
                                                                }
                                                            }}
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </Link>
                                                    </div>

                                                    {/* Product image */}
                                                    <div className="img-placeholder">
                                                        <img
                                                            src={`${IMAGES_URL}/${product.image}`}
                                                            alt={product.product_name}
                                                            loading="lazy"
                                                        />
                                                    </div>

                                                    {/* Quick view bar */}
                                                    <Link
                                                        to={outOfStock ? "#" : `/viewproduct/${product.product_id}`}
                                                        className={`quick-add-btn ${outOfStock ? "disabled" : ""}`}
                                                        onClick={(e) => {
                                                            if (outOfStock) {
                                                                e.preventDefault();
                                                                Settoastmessage("Product is out of stock");
                                                                Settoastcolor("danger");
                                                                Opentoast(Setshowtoast);
                                                            }
                                                        }}
                                                    >
                                                        <i className="bi bi-eye me-1"></i>
                                                        {outOfStock ? "Unavailable" : "Quick View"}
                                                    </Link>
                                                </div>

                                                {/* Info */}
                                                <div className="card-body-custom">
                                                    <div className="d-flex justify-content-between align-items-center mb-1">
                                                        <span className="cat-label">{product.category_name}</span>
                                                        <span className="rating-pill">
                                                            <i className="bi bi-star-fill"></i> 4.9
                                                        </span>
                                                    </div>
                                                    <h6 className="product-title">{product.product_name}</h6>
                                                    <div className="price-box">
                                                        <span className="price-now">${product.price}</span>
                                                        <span className="price-old">${product.original_price}</span>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="empty-state fade-in">
                                <div className="no-product-icon mb-4">
                                    <i className="bi bi-search-heart" style={{ fontSize: '5rem', color: '#ccc' }}></i>
                                </div>
                                <h2>No Products Found</h2>
                                <p>
                                    We couldn't find anything matching{" "}
                                    <strong>"{searchTerm || selectedCategory}"</strong>.
                                </p>
                                <button
                                    className="clear-btn"
                                    onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        )}
                    </section>

                </div>
            </main>

            {/* Toast */}
            {showtoast && (
                <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 9999 }}>
                    <div className={`toast show align-items-center text-white bg-${toastcolor} border-0 shadow-lg`}>
                        <div className="d-flex">
                            <div className="toast-body fw-bold">
                                {toastcolor === "success"
                                    ? <i className="bi bi-check-circle-fill me-2"></i>
                                    : <i className="bi bi-exclamation-triangle-fill me-2"></i>}
                                {toastmessage}
                            </div>
                            <button
                                type="button"
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
