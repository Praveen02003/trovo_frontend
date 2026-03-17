import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Sidebar } from "../sidebar/Sidebar";
import { maincontext } from "../../App";
import { Getallbrands } from "../../function/Getallbrands";
import { Link } from "react-router-dom";
import { Addbrand } from "../../function/Addbrand";
import { Closetoast } from "../../function/Closetoast";
import { Deletebrand } from "../../function/Deletebrand";
import { Updatebrand } from "../../function/Updatebrand";

export const Allbrands = () => {
    const {
        allbrands,
        Setallbrands,
        addbrand,
        Setaddbrand,
        search,
        Setsearch,
        page,
        Setpage,
        showtoast,
        Setshowtoast,
        toastcolor,
        Settoastcolor,
        toastmessage,
        Settoastmessage,
        editbranddata,
        Seteditbranddata
    } = useContext(maincontext);

    // Sync brands with search and pagination
    useEffect(() => {
        Getallbrands(Setallbrands, page, search);
    }, [page, search]);

    return (
        <div className="container-fluid p-0 bg-light min-vh-100">
            <div className="d-flex text-dark">
                {/* Reused Sidebar */}
                <Sidebar />

                <div className="flex-grow-1">
                    {/* Top Navbar */}
                    <nav className="navbar navbar-white bg-white border-bottom px-4 py-3 sticky-top shadow-sm">
                        <div className="container-fluid p-0">
                            <h5 className="fw-bold m-0">
                                <i className="bi bi-patch-check-fill me-2 text-primary"></i>Brand Management
                            </h5>
                            <div className="ms-auto d-flex align-items-center gap-3">
                                <img src="https://ui-avatars.com" alt="Profile" className="rounded-circle border shadow-sm" width="35" height="35" />
                            </div>
                        </div>
                    </nav>

                    <div className="p-4">
                        {/* Header Actions */}
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <h4 className="fw-bold m-0 text-dark">All Brands</h4>
                                <p className="text-muted small mb-0">Manage your product manufacturers and brand identities.</p>
                            </div>
                            <button className="btn btn-primary rounded-pill px-4 shadow-sm fw-bold" data-bs-toggle="modal" data-bs-target="#brandModal">
                                <i className="bi bi-plus-lg me-2"></i>Add Brand
                            </button>
                        </div>

                        {/* Search Bar */}
                        <div className="card border-0 shadow-sm mb-4 rounded-4">
                            <div className="card-body p-3">
                                <div className="input-group bg-light rounded-pill px-3 border-0">
                                    <span className="input-group-text bg-transparent border-0"><i className="bi bi-search text-muted"></i></span>
                                    <input type="text" className="form-control bg-transparent border-0 shadow-none py-2" placeholder="Search brands by name..."
                                        onChange={(e) => { Setsearch(e.target.value); Setpage(1); }} />
                                </div>
                            </div>
                        </div>

                        {/* Brands Table */}
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                            <div className="table-responsive">
                                <table className="table align-middle table-hover mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="ps-4 py-3 text-uppercase text-muted fw-bold border-0" style={{ fontSize: '0.7rem' }}>Brand Details</th>
                                            <th className="py-3 text-uppercase text-muted fw-bold border-0 text-center" style={{ fontSize: '0.7rem' }}>Status</th>
                                            <th className="pe-4 py-3 text-uppercase text-muted fw-bold border-0 text-end" style={{ fontSize: '0.7rem' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        {allbrands && allbrands.length > 0 ? (
                                            allbrands.map((brand) => (
                                                <tr key={brand.brand_id}>
                                                    <td className="ps-4 py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3 text-primary fw-bold" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                                {brand.brand_name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <div className="fw-bold text-dark">{brand.brand_name}</div>
                                                                <div className="text-muted extra-small">ID: #{brand.brand_id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">
                                                        <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2 fw-bold" style={{ fontSize: '0.65rem' }}>
                                                            ● ACTIVE
                                                        </span>
                                                    </td>
                                                    <td className="pe-4 text-end">
                                                        <div className="dropdown">
                                                            <button className="btn btn-light btn-sm rounded-circle border shadow-sm" data-bs-toggle="dropdown">
                                                                <i className="bi bi-three-dots-vertical"></i>
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3">
                                                                <li>
                                                                    <button
                                                                        className="dropdown-item py-2"
                                                                        data-bs-toggle="modal"
                                                                        data-bs-target="#editBrandModal"
                                                                        onClick={() => Seteditbranddata({ brand_id: brand.brand_id, brand_name: brand.brand_name })}
                                                                    >
                                                                        <i className="bi bi-pencil me-2 text-primary"></i>Edit
                                                                    </button></li>
                                                                <li>
                                                                    <button
                                                                        className="dropdown-item py-2 text-danger"
                                                                        onClick={() => Deletebrand(
                                                                            brand.brand_id,
                                                                            Setallbrands,
                                                                            page,
                                                                            search,
                                                                            Setshowtoast,
                                                                            Settoastcolor,
                                                                            Settoastmessage
                                                                        )}
                                                                    >
                                                                        <i className="bi bi-trash me-2"></i>Delete
                                                                    </button>

                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="3" className="text-center py-5 text-muted">No brands found.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination (Your Fixed Style) */}
                            <div className="px-4 py-3 bg-light bg-opacity-25 border-top d-flex justify-content-between align-items-center">
                                <p className="mb-0 small text-muted">Showing <b>{allbrands?.length || 0}</b> brands (Page {page})</p>
                                <div className="btn-group shadow-sm border rounded overflow-hidden">
                                    <button className="btn btn-white btn-sm border-0 bg-white px-3" disabled={page <= 1} onClick={() => Setpage(page - 1)}>
                                        <i className="bi bi-chevron-left text-primary"></i>
                                    </button>
                                    <button className="btn btn-white btn-sm border-0 bg-white px-3 border-start" disabled={allbrands?.length < 10} onClick={() => Setpage(page + 1)}>
                                        <i className="bi bi-chevron-right text-primary"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {showtoast && (
                    <div className="toast-container position-fixed top-0 end-0 p-3">
                        <div className={`toast show text-bg-${toastcolor} border-0`}>
                            <div className="d-flex">
                                <div className="toast-body">{toastmessage}</div>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white me-2 m-auto"
                                    onClick={() => Closetoast(Setshowtoast)}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {/* --- ADD BRAND MODAL --- */}
            <div className="modal fade text-dark" id="brandModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow-lg rounded-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold">Add New Brand</h5>
                            <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-4 pt-0">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Brand Name</label>
                                <input type="text" className="form-control rounded-pill bg-light border-0 px-3 py-2" placeholder="Enter brand name..." onChange={(e) => {
                                    Setaddbrand(e.target.value)
                                }}
                                />
                            </div>
                            <button type="button" className="btn btn-primary w-100 rounded-pill py-2 fw-bold" onClick={() => {
                                Addbrand(addbrand, Setshowtoast, Settoastcolor, Settoastmessage, Setallbrands, page, search);
                            }}
                            >Save Brand</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* --- EDIT BRAND MODAL --- */}
            <div className="modal fade text-dark" id="editBrandModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow rounded-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold">Update Brand</h5>
                            <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-4 pt-0">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Brand Name</label>
                                <input
                                    type="text"
                                    className="form-control bg-light border-0 py-2 rounded-3"
                                    value={editbranddata.brand_name}
                                    onChange={(e) => Seteditbranddata({ ...editbranddata, brand_name: e.target.value })}
                                />
                            </div>
                            <button
                                className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
                                onClick={() => Updatebrand(editbranddata, Setallbrands, page, search, Setshowtoast, Settoastcolor, Settoastmessage)}
                            >
                                Update Brand
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
