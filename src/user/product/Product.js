import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import '../product/Product.css'
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
    } = useContext(maincontext)

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState(""); // 1. Add Search State

    useEffect(() => {
        Getallactiveproducts(Setgetactiveproducts, selectedCategory, searchTerm);
        Setloginuser(Getloginuser());
        Getwishlistdata(Setwishlistids, Setwishlistdata);
        Getcategories(Setgetcategories)
    }, [selectedCategory, searchTerm])
    return (
        <div className="products-page-wrapper">
            <Navbar />

            <main className="container-fluid px-lg-5 py-5 mt-5">
                <div className="row g-4 mt-2">

                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 px-3 gap-3">
                        <h4 className="fw-black m-0 text-dark">
                            {selectedCategory} Products <span className="count-dot">{getactiveproducts.length}</span>
                        </h4>

                        {/* 4. Search Input Field */}
                        <div className="search-box-container shadow-sm border rounded-pill px-3 py-1 d-flex align-items-center bg-white" style={{ minWidth: '300px' }}>
                            <i className="bi bi-search text-muted me-2"></i>
                            <input
                                type="text"
                                className="form-control border-0 bg-transparent shadow-none"
                                placeholder="Search your gear..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <i className="bi bi-x-lg cursor-pointer text-muted" onClick={() => setSearchTerm("")}></i>
                            )}
                        </div>
                    </div>
                    {/* Sidebar Filter */}
                    <main className="col-lg-2 d-none d-lg-block">
                        <div className="filter-sidebar sticky-filter">
                            <p className="sidebar-label">COLLECTIONS</p>
                            <ul className="list-unstyled sidebar-menu mb-5">
                                {/* 1. All Categories - Simply pass the string "All" or "All Categories" */}
                                <li
                                    className={selectedCategory === "All" ? "active" : ""}
                                    onClick={() => setSelectedCategory("All")}
                                >
                                    All Categories
                                </li>

                                {/* 2. Dynamic Categories from API */}
                                {getcategories.map((cat, index) => (
                                    <li
                                        key={index}
                                        className={selectedCategory === cat.category_name ? "active" : ""}
                                        onClick={() => setSelectedCategory(cat.category_name)}
                                    >
                                        {cat.category_name}
                                    </li>
                                ))}
                            </ul>


                            {/* <p className="sidebar-label">FILTERS</p>
                            <div className="price-range-box mb-4">
                                <span className="small fw-bold d-block mb-2 text-dark">Price Range</span>
                                <input type="range" className="form-range custom-range" />
                                <div className="d-flex justify-content-between extra-small fw-bold text-muted">
                                    <span>$0</span>
                                    <span>$2000</span>
                                </div>
                            </div> */}
                        </div>
                    </main>

                    {/* Product Grid Section */}
                    <section className="col-lg-10">
                        {/* Top Utility Bar */}
                        <div className="d-flex justify-content-between align-items-center mb-5 px-3">
                            <h4 className="fw-black m-0 text-dark">All Products <span className="count-dot">{getactiveproducts.length}</span></h4>
                            {/* <div className="d-flex gap-3">
                                <select className="form-select boutique-select shadow-sm border-0">
                                    <option>Sort by: Popularity</option>
                                    <option>Newest Arrivals</option>
                                    <option>Price: Low to High</option>
                                </select>
                            </div> */}
                        </div>


                        <div className="row g-4">
                            {/* 1. Check if there are products in the array */}
                            {getactiveproducts.length > 0 ? (
                                getactiveproducts.map((product, index) => {
                                    const isWishlisted = wishlistids.includes(product.product_id);
                                    return (
                                        <div key={index} className="col-6 col-md-4 col-xl-3">
                                            <div className="boutique-card">
                                                <div className="image-wrap">
                                                    <div className="card-tag">NEW</div>
                                                    <div className="card-actions">
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
                                                                        Setshowtoast(true);
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

                                                        <Link to={`/viewproduct/${product.product_id}`} className="action-btn">
                                                            <i className="bi bi-eye"></i>
                                                        </Link>
                                                    </div>

                                                    <div className="img-placeholder bg-gradient-gray">
                                                        <img
                                                            src={` ${IMAGES_URL}/${product.image}`}
                                                            alt={product.product_name}
                                                            className="img-fluid"
                                                        />
                                                    </div>

                                                    <Link to={`/viewproduct/${product.product_id}`} className="quick-add-btn">
                                                        <i className="bi bi-plus-lg me-2"></i> QUICK VIEW
                                                    </Link>
                                                </div>

                                                <div className="card-body-custom">
                                                    <div className="d-flex justify-content-between mb-1">
                                                        <span className="cat-label text-uppercase">{product.category_name} SERIES</span>
                                                        <span className="rating-pill"><i className="bi bi-star-fill text-warning"></i> 4.9</span>
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
                                })
                            ) : (
                                /* 2. Show this if getactiveproducts is empty */
                                <div className="col-12 text-center py-5 mt-5 fade-in">
                                    <div className="no-product-icon mb-4">
                                        <i className="bi bi-search-heart display-1 text-muted opacity-25"></i>
                                    </div>
                                    <h2 className="fw-black text-dark mb-2">No Products Found</h2>
                                    <p className="text-muted mb-4">
                                        We couldn't find anything matching "<strong>{searchTerm || selectedCategory}</strong>".
                                    </p>
                                    <button
                                        className="btn btn-dark rounded-pill px-5 py-3 fw-bold shadow-sm"
                                        onClick={() => { setSelectedCategory("All"); setSearchTerm(""); }}
                                    >
                                        CLEAR ALL FILTERS
                                    </button>
                                </div>
                            )}
                        </div>

                    </section>
                </div>
            </main>
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
