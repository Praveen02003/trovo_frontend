import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Sidebar } from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import '../add/Addproduct.css'
import { maincontext } from "../../App";
import { Getallcategories } from "../../function/Getallcategories";
import { Getallbrands } from "../../function/Getallbrands";
import { Createproduct } from "../../function/Createproduct";
import { Closetoast } from "../../function/Closetoast";

export const Addproduct = () => {
    const {
        allcategories,
        Setallcategories,
        allbrands,
        Setallbrands,
        addproduct,
        Setaddproduct,
        showtoast,
        Setshowtoast,
        toastcolor,
        Settoastcolor,
        toastmessage,
        Settoastmessage,
    } = useContext(maincontext)

    useEffect(() => {
        Getallcategories(Setallcategories);
        Getallbrands(Setallbrands)
    }, [])
    return (
        <div className="container-fluid p-0">
            <div className="d-flex text-dark">
                {/* Same Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-grow-1 bg-light min-vh-100">
                    {/* Top Navbar */}
                    <nav className="navbar navbar-white bg-white border-bottom px-4 py-3 sticky-top">
                        <div className="container-fluid p-0">
                            <div className="d-flex align-items-center">
                                <button className="btn btn-light btn-sm me-3 border rounded-circle shadow-sm">
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <h5 className="fw-bold m-0 text-dark">Add New Product</h5>
                            </div>
                            <div className="ms-auto">
                                <img src="https://ui-avatars.com" alt="Profile" className="rounded-circle border" width="35" height="35" />
                            </div>
                        </div>
                    </nav>

                    {/* Form Content */}
                    <div className="p-4">
                        <div className="row g-4">
                            {/* Left Column: Product Info */}
                            <div className="col-lg-8">
                                <div className="card border-0 shadow-sm rounded-4 mb-4">
                                    <div className="card-body p-4">
                                        <h6 className="fw-bold mb-3">General Information</h6>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted">Product Name</label>
                                            <input type="text" className="form-control bg-light border-0 p-2 shadow-none rounded-3" placeholder="Enter product title..."
                                                onChange={(e) => {
                                                    Setaddproduct({ ...addproduct, name: e.target.value })
                                                }} />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted">Description</label>
                                            <textarea className="form-control bg-light border-0 p-2 shadow-none rounded-3" rows="6" placeholder="Write something about the product..."
                                                onChange={(e) => {
                                                    Setaddproduct({ ...addproduct, description: e.target.value })
                                                }}></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 shadow-sm rounded-4">
                                    <div className="card-body p-4">
                                        <h6 className="fw-bold mb-3">Pricing & Inventory</h6>
                                        <div className="row g-3">
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-muted">Original Price ($)</label>
                                                <input type="number" className="form-control bg-light border-0 p-2 shadow-none rounded-3" placeholder="0" min={0}
                                                    onChange={(e) => {
                                                        Setaddproduct({ ...addproduct, original_price: e.target.value, price: (e.target.value) - ((e.target.value) * ((addproduct.offer || 0)) / 100) })
                                                    }} />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-muted">Discount Price ($)</label>
                                                <input type="number" className="form-control bg-light border-0 p-2 shadow-none rounded-3" placeholder="0.00" value={addproduct.price || 0} disabled />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-muted">Offer (%)</label>
                                                <input type="number" className="form-control bg-light border-0 p-2 shadow-none rounded-3" placeholder="offer" min={0} max={100}
                                                    onChange={(e) => {
                                                        Setaddproduct({ ...addproduct, offer: e.target.value, price: (addproduct.original_price - (addproduct.original_price * (e.target.value / 100))) })
                                                    }}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label small fw-bold text-muted">Stock Quantity</label>
                                                <input type="number" className="form-control bg-light border-0 p-2 shadow-none rounded-3" placeholder="e.g. 100" min={1}
                                                    onChange={(e) => {
                                                        Setaddproduct({ ...addproduct, stock: e.target.value })
                                                    }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column: Organization & Media */}
                            <div className="col-lg-4">
                                <div className="card border-0 shadow-sm rounded-4 mb-4">
                                    <div className="card-body p-4 text-center">
                                        <h6 className="fw-bold mb-3 text-start">Product Image</h6>
                                        <div className="border border-2 border-dashed rounded-4 py-5 bg-light position-relative">
                                            <i className="bi bi-cloud-arrow-up fs-1 text-primary"></i>
                                            <p className="small text-muted mt-2">Drag and drop or click to upload</p>
                                            <input type="file" className="position-absolute top-0 start-0 w-100 h-100 opacity-0 cursor-pointer"
                                                onChange={(e) => {
                                                    Setaddproduct({ ...addproduct, image: e.target.files[0] })
                                                }} />
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 shadow-sm rounded-4 mb-4">
                                    <div className="card-body p-4">
                                        <h6 className="fw-bold mb-3">Organization</h6>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted">Category</label>
                                            <select
                                                className="form-select bg-light border-0 p-2 shadow-none rounded-3"
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    Setaddproduct({
                                                        ...addproduct,
                                                        category_id: val ? Number(val) : null, // always a number or null
                                                    });
                                                }}
                                            >
                                                <option value="">Select Category</option>
                                                {allcategories.map((category) => (
                                                    <option key={category.category_id} value={category.category_id}>
                                                        {category.category_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted">Brand</label>
                                            <select
                                                className="form-select bg-light border-0 p-2 shadow-none rounded-3"
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    Setaddproduct({
                                                        ...addproduct,
                                                        brand_id: val ? Number(val) : null, // always a number or null
                                                    });
                                                }}
                                            >
                                                <option value="">Select Brand</option>
                                                {allbrands.map((brand) => (
                                                    <option key={brand.brand_id} value={brand.brand_id}>
                                                        {brand.brand_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between p-2 bg-light rounded-3">
                                            <span className="small fw-bold">Active Status</span>
                                            <div className="form-check form-switch">
                                                <input className="form-check-input" type="checkbox" role="switch" defaultChecked
                                                    onChange={(e) => {
                                                        Setaddproduct({ ...addproduct, status: (e.target.checked ? 'active' : 'inactive') })
                                                    }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary py-2 fw-bold rounded-3 shadow-sm" onClick={() => {
                                        Createproduct(addproduct, Settoastcolor, Settoastmessage, Setshowtoast);
                                    }}
                                    >
                                        Publish Product
                                    </button>
                                    <Link to={'/allproduct'} className="btn btn-light py-2 fw-bold rounded-3 border">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showtoast && (
                <div className="toast-container position-fixed top-0 end-0 p-3">

                    <div className={`toast show text-bg-${toastcolor} border-0`}>

                        <div className="d-flex">

                            <div className="toast-body">
                                {toastmessage}
                            </div>

                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => {
                                    Closetoast(Setshowtoast)
                                }}
                            ></button>

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
};
