import React, { useContext, useEffect } from "react";
// Bootstrap imports MUST be in this order for some versions
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { Sidebar } from "../sidebar/Sidebar";
import { maincontext } from "../../App";
import { Getallcategories } from "../../function/Getallcategories";
import { Addcategory } from "../../function/Addcategory";
// import { Updatecategory } from "../../function/Updatecategory"; 
import { Closetoast } from "../../function/Closetoast";
import { Deletecategory } from "../../function/Deletecategory";
import { Updatecategory } from "../../function/Updatecategory";
import { IMAGES_URL } from "../../axios/Imageurl";
import { Adminauth } from "../../function/Adminauth";

export const Allcategories = () => {
    const {
        allcategories, Setallcategories, search, Setsearch, page, Setpage,
        addcategory, Setaddcategory, addcategoryimage, Setaddcategoryimage,
        editcategorydata, Seteditcategorydata
    } = useContext(maincontext);

    useEffect(() => {
        const loadData = async () => {
            const isAdmin = await Adminauth();
            if (!isAdmin) return; // stop if not admin
            await Getallcategories(Setallcategories, page, search);
        };

        loadData();
    }, [page, search, Setallcategories]);

    return (
        <div className="container-fluid p-0 bg-light min-vh-100">
            <div className="d-flex text-dark">
                <Sidebar />
                <div className="flex-grow-1">
                    {/* Top Navbar */}
                    <nav className="navbar bg-white border-bottom px-4 py-3 sticky-top shadow-sm">
                        <div className="container-fluid p-0">
                            <h5 className="fw-bold m-0"><i className="bi bi-grid-fill me-2 text-primary"></i>Categories</h5>
                            <button className="btn btn-primary rounded-pill px-4 fw-bold ms-auto" data-bs-toggle="modal" data-bs-target="#categoryModal">
                                <i className="bi bi-plus-lg me-2"></i>Add Category
                            </button>
                        </div>
                    </nav>

                    <div className="p-4">
                        {/* Search Bar */}
                        <div className="card border-0 shadow-sm mb-4 rounded-4">
                            <div className="card-body p-3">
                                <div className="input-group bg-light rounded-pill px-3 border-0">
                                    <span className="input-group-text bg-transparent border-0"><i className="bi bi-search text-muted"></i></span>
                                    <input type="text" className="form-control bg-transparent border-0 shadow-none py-2" placeholder="Search categories..."
                                        onChange={(e) => { Setsearch(e.target.value); Setpage(1); }} />
                                </div>
                            </div>
                        </div>

                        {/* Categories Table */}
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                            <div className="table-responsive">
                                <table className="table align-middle table-hover mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="ps-4 py-3 text-uppercase text-muted fw-bold border-0" style={{ fontSize: '0.7rem' }}>Image</th>
                                            <th className="py-3 text-uppercase text-muted fw-bold border-0" style={{ fontSize: '0.7rem' }}>Name</th>
                                            <th className="pe-4 py-3 text-uppercase text-muted fw-bold border-0 text-end" style={{ fontSize: '0.7rem' }}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        {allcategories && allcategories.length > 0 ? (
                                            allcategories.map((cat) => (
                                                <tr key={cat.category_id}>
                                                    <td className="ps-4 py-3">
                                                        <img src={`${IMAGES_URL}/${cat.category_image}`}
                                                            className="rounded-3 border shadow-sm" width="50" height="50" style={{ objectFit: 'cover' }} alt="cat" />
                                                    </td>
                                                    <td className="fw-bold text-dark">{cat.category_name}</td>
                                                    <td className="pe-4 text-end">
                                                        {/* Edit Button */}
                                                        <button className="btn btn-sm btn-light border rounded-circle me-2"
                                                            data-bs-toggle="modal" data-bs-target="#editCategoryModal"
                                                            onClick={() => Seteditcategorydata({ category_id: cat.category_id, category_name: cat.category_name, category_image: cat.category_image })}>
                                                            <i className="bi bi-pencil text-primary"></i>
                                                        </button>

                                                        {/* NEW: Delete Button */}
                                                        <button className="btn btn-sm btn-light border rounded-circle"
                                                            onClick={() => Deletecategory(cat.category_id, Setallcategories, page, search)}>
                                                            <i className="bi bi-trash text-danger"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="3" className="text-center py-5">No Categories Found</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-4 py-3 bg-light bg-opacity-25 border-top d-flex justify-content-between align-items-center">
                                <p className="mb-0 small text-muted">Page <b>{page}</b></p>
                                <div className="btn-group shadow-sm border rounded overflow-hidden">
                                    <button className="btn btn-white btn-sm border-0 bg-white px-3" disabled={page <= 1} onClick={() => Setpage(page - 1)}>
                                        <i className="bi bi-chevron-left text-primary"></i>
                                    </button>
                                    <button className="btn btn-white btn-sm border-0 bg-white px-3 border-start" disabled={allcategories?.length < 10} onClick={() => Setpage(page + 1)}>
                                        <i className="bi bi-chevron-right text-primary"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL: ADD CATEGORY --- */}
            <div className="modal fade text-dark" id="categoryModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow rounded-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold">New Category</h5>
                            <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-4 pt-0">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Name</label>
                                <input type="text" className="form-control bg-light border-0 py-2 rounded-3"
                                    onChange={(e) => Setaddcategory(e.target.value)} placeholder="Electronics..." />
                            </div>
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted">Image</label>
                                <input type="file" className="form-control bg-light border-0 py-2 rounded-3"
                                    onChange={(e) => Setaddcategoryimage(e.target.files[0])} />
                            </div>
                            <button className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
                                onClick={() => Addcategory(addcategory, addcategoryimage, Setallcategories, page, search)}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MODAL: EDIT CATEGORY --- */}
            <div className="modal fade text-dark" id="editCategoryModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow rounded-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold">Edit Category</h5>
                            <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body p-4 pt-0">

                            {/* Image Preview Logic */}
                            <div className="text-center mb-3">
                                <label className="form-label small fw-bold text-muted d-block text-start">
                                    {editcategorydata.new_image ? "New Image Preview" : "Current Image"}
                                </label>
                                <img
                                    src={
                                        editcategorydata.new_image
                                            ? URL.createObjectURL(editcategorydata.new_image) // Show selected file preview
                                            : `${IMAGES_URL}/${editcategorydata.category_image}` // Show current DB image
                                    }
                                    alt="preview"
                                    className="rounded-3 border shadow-sm"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Category Name</label>
                                <input type="text" className="form-control bg-light border-0 py-2 rounded-3"
                                    value={editcategorydata?.category_name || ""}
                                    onChange={(e) => Seteditcategorydata({ ...editcategorydata, category_name: e.target.value })} />
                            </div>

                            {/* New Image Upload */}
                            <div className="mb-4">
                                <label className="form-label small fw-bold text-muted">Change Category Image (Optional)</label>
                                <input type="file" className="form-control bg-light border-0 py-2 rounded-3 shadow-none"
                                    accept="image/*"
                                    onChange={(e) => Seteditcategorydata({ ...editcategorydata, new_image: e.target.files[0] })}
                                />
                            </div>

                            <button className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
                                onClick={() => Updatecategory(editcategorydata, Setallcategories, page, search)}>
                                Update Category
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
