import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Sidebar } from "../sidebar/Sidebar";
import { Link, useParams } from "react-router-dom";
import { Getcurrentproduct } from "../../function/Getcurrentproduct";
import { maincontext } from "../../App";
import { Getallcategories } from "../../function/Getallcategories";
import { Getallbrands } from "../../function/Getallbrands";
import { Closetoast } from "../../function/Closetoast";
import { Updateproduct } from "../../function/Updateproduct";
import '../edit/Editproduct.css';
import { IMAGES_URL } from "../../axios/Imageurl";
import { Getloginuser } from "../../function/Getloginuser";

export const Editproduct = () => {
    const {
        allcategories,
        Setallcategories,
        eachproduct,
        Seteachproduct,
        allbrands,
        Setallbrands,
        loginuser,
        Setloginuser
    } = useContext(maincontext);

    const { id } = useParams();

    useEffect(() => {
        Setloginuser(Getloginuser())
        Getcurrentproduct(id, Seteachproduct);
        Getallcategories(Setallcategories);
        Getallbrands(Setallbrands);
    }, [id]);

    const getCategoryId = (name) => {
        const cat = allcategories.find(c => c.category_name === name);
        return cat ? cat.category_id : "";
    }

    const getBrandId = (name) => {
        const brand = allbrands.find(b => b.brand_name === name);
        return brand ? brand.brand_id : "";
    }

    return (
        <div className="container-fluid p-0">
            <div className="d-flex text-dark">
                <Sidebar />

                <div className="flex-grow-1 bg-light min-vh-100">
                    <nav className="navbar navbar-white bg-white border-bottom px-4 py-3 sticky-top">
                        <div className="container-fluid p-0 d-flex justify-content-between align-items-center">
                            <div className="d-flex align-items-center">
                                <button className="btn btn-light btn-sm me-3 border rounded-circle shadow-sm">
                                    <i className="bi bi-arrow-left"></i>
                                </button>
                                <div>
                                    <h5 className="fw-bold m-0 text-dark">Edit Product</h5>
                                    <span className="text-muted small">ID: {eachproduct.product_id}</span>
                                </div>
                            </div>
                            <img src={`${IMAGES_URL}/${loginuser.profileimage}`} alt="Profile" className="rounded-circle border" width="35" height="35" />
                        </div>
                    </nav>

                    <div className="p-4">
                        <div className="row g-4">
                            {/* Left Column */}
                            <div className="col-lg-8">
                                <div className="card border-0 shadow-sm rounded-4 mb-4">
                                    <div className="card-body p-4">
                                        <h6 className="fw-bold mb-4 text-primary"><i className="bi bi-info-circle me-2"></i>Product Details</h6>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted">Product Name</label>
                                            <input
                                                type="text"
                                                className="form-control bg-light border-0 p-2 shadow-none rounded-3"
                                                value={eachproduct.product_name || ""}
                                                onChange={(e) => Seteachproduct({ ...eachproduct, product_name: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted">Description</label>
                                            <textarea
                                                className="form-control bg-light border-0 p-2 shadow-none rounded-3"
                                                rows="8"
                                                value={eachproduct.description || ""}
                                                onChange={(e) => Seteachproduct({ ...eachproduct, description: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="card border-0 shadow-sm rounded-4">
                                    <div className="card-body p-4">
                                        <h6 className="fw-bold mb-4 text-primary"><i className="bi bi-currency-dollar me-2"></i>Pricing & Inventory</h6>
                                        <div className="row g-3">
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-muted">Sale Price</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-0">$</span>
                                                    <input
                                                        type="number"
                                                        className="form-control bg-light border-0 shadow-none"
                                                        value={eachproduct.price || 0}
                                                        onChange={(e) => Seteachproduct({ ...eachproduct, price: Number(e.target.value) })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-muted">Original Price</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-0">$</span>
                                                    <input
                                                        type="number"
                                                        className="form-control bg-light border-0 shadow-none text-muted text-decoration-line-through"
                                                        value={eachproduct.original_price || 0}
                                                        min={1}
                                                        onChange={(e) => {
                                                            const original = Number(e.target.value);
                                                            Seteachproduct({
                                                                ...eachproduct,
                                                                original_price: original,
                                                                price: original - (original * (eachproduct.offer || 0) / 100)
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-muted">Offer (%)</label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-light border-0">%</span>
                                                    <input
                                                        type="number"
                                                        className="form-control bg-light border-0 shadow-none text-muted"
                                                        value={eachproduct.offer || 0}
                                                        min={0}
                                                        max={100}
                                                        onChange={(e) => {
                                                            const offer = Number(e.target.value);
                                                            Seteachproduct({
                                                                ...eachproduct,
                                                                offer: offer,
                                                                price: (eachproduct.original_price || 0) - ((eachproduct.original_price || 0) * offer / 100)
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <label className="form-label small fw-bold text-muted">Current Stock</label>
                                                <input
                                                    type="number"
                                                    className="form-control bg-light border-0 shadow-none p-2"
                                                    value={eachproduct.stock || 0}
                                                    onChange={(e) => Seteachproduct({ ...eachproduct, stock: Number(e.target.value) })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="col-lg-4">
                                <div className="card border-0 shadow-sm rounded-4 mb-4">
                                    <div className="card-body p-4 text-center">
                                        <h6 className="fw-bold mb-3 text-start text-primary"><i className="bi bi-image me-2"></i>Product Media</h6>
                                        <div className="position-relative mb-3">
                                            <img
                                                src={eachproduct.newimage ? URL.createObjectURL(eachproduct.newimage) : `${IMAGES_URL}/${eachproduct.image}`}
                                                className="img-fluid rounded-4 border p-1"
                                                alt="Product"
                                                style={{ maxHeight: '200px', width: '100%', objectFit: 'contain' }}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <input
                                                type="file"
                                                className="form-control form-control-sm bg-light border-0 shadow-none"
                                                accept="image/*"
                                                onChange={(e) => Seteachproduct({ ...eachproduct, newimage: e.target.files[0] })}
                                            />
                                        </div>
                                        <p className="small text-muted mb-0">Recommended: 800x800px (JPG/PNG)</p>
                                    </div>
                                </div>

                                <div className="card border-0 shadow-sm rounded-4 mb-4">
                                    <div className="card-body p-4">
                                        <h6 className="fw-bold mb-3">Organization</h6>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted">Category</label>
                                            <select
                                                className="form-select bg-light border-0 p-2 shadow-none rounded-3"
                                                value={eachproduct.category_name || ""}
                                                onChange={(e) => Seteachproduct({
                                                    ...eachproduct,
                                                    category_id: getCategoryId(e.target.value)
                                                })}
                                            >
                                                <option disabled>Select Category</option>
                                                {allcategories.map((cat) => (
                                                    <option key={cat.category_id} value={cat.category_name}>{cat.category_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label small fw-bold text-muted">Brand</label>
                                            <select
                                                className="form-select bg-light border-0 p-2 shadow-none rounded-3"
                                                value={eachproduct.brand_name || ""}
                                                onChange={(e) => Seteachproduct({
                                                    ...eachproduct,
                                                    brand_id: getBrandId(e.target.value)
                                                })}
                                            >
                                                <option disabled>Select Brand</option>
                                                {allbrands.map((b) => (
                                                    <option key={b.brand_id} value={b.brand_name}>{b.brand_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="d-flex align-items-center justify-content-between p-2 bg-light rounded-3">
                                            <span className="small fw-bold">Active Status</span>
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    role="switch"
                                                    checked={eachproduct.status === "active"}
                                                    onChange={(e) => Seteachproduct({ ...eachproduct, status: e.target.checked ? "active" : "inactive" })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="d-grid gap-2">
                                    <button className="btn btn-primary py-2 fw-bold rounded-3 shadow-sm" onClick={() => {
                                        Updateproduct(eachproduct);
                                    }}>Save Changes</button>
                                    <Link to={'/allproduct'} className="btn btn-outline-danger py-2 fw-bold rounded-3 border-0">Cancel</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};