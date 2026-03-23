import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../category/Allcategory.css';
import { Sidebar } from "../sidebar/Sidebar";
import { maincontext } from "../../App";
import { Getallcategories } from "../../function/Getallcategories";
import { Addcategory } from "../../function/Addcategory";
import { Deletecategory } from "../../function/Deletecategory";
import { Updatecategory } from "../../function/Updatecategory";
import { IMAGES_URL } from "../../axios/Imageurl";
import { Adminauth } from "../../function/Adminauth";

export const Allcategories = () => {
    const {
        allcategories, Setallcategories,
        search, Setsearch,
        page, Setpage,
        addcategory, Setaddcategory,
        addcategoryimage, Setaddcategoryimage,
        editcategorydata, Seteditcategorydata,
    } = useContext(maincontext);

    useEffect(() => {
        const load = async () => {
            const ok = await Adminauth();
            if (!ok) return;
            await Getallcategories(Setallcategories, page, search);
        };
        load();
    }, [page, search, Setallcategories]);

    const cats = Array.isArray(allcategories) ? allcategories : [];

    return (
        <div className="container-fluid p-0 cats-page">
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 overflow-hidden">

                    {/* ── Navbar ── */}
                    <nav className="c-topbar">
                        <h5 className="c-topbar-title">
                            <i className="bi bi-grid-fill"></i> Categories
                        </h5>
                        <button className="c-add-btn" data-bs-toggle="modal" data-bs-target="#categoryModal">
                            <i className="bi bi-plus-lg"></i> Add Category
                        </button>
                    </nav>

                    <div className="cats-content">

                        {/* Title */}
                        <div className="c-title-row">
                            <div>
                                <h3 className="c-page-title">All Categories</h3>
                                <p className="c-page-sub">Manage your product categories.</p>
                            </div>
                            <span className="c-count-badge">
                                <i className="bi bi-grid"></i> {cats.length} Categories
                            </span>
                        </div>

                        {/* Search */}
                        <div className="c-search-bar">
                            <i className="bi bi-search"></i>
                            <input
                                type="text"
                                className="c-search-input"
                                placeholder="Search categories…"
                                onChange={(e) => { Setsearch(e.target.value); Setpage(1); }}
                            />
                        </div>

                        {/* Table */}
                        <div className="c-table-card">
                            <div className="table-responsive">
                                <table className="c-table">
                                    <thead>
                                        <tr>
                                            <th>Image</th>
                                            <th>Category Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cats.length > 0 ? cats.map((cat) => (
                                            <tr key={cat.category_id}>
                                                <td>
                                                    <img
                                                        src={`${IMAGES_URL}/${cat.category_image}`}
                                                        alt={cat.category_name}
                                                        className="cat-thumb"
                                                        loading="lazy"
                                                    />
                                                </td>
                                                <td>
                                                    <span className="cat-name">{cat.category_name}</span>
                                                    <span className="cat-id">#{cat.category_id}</span>
                                                </td>
                                                <td>
                                                    <div className="c-action-row">
                                                        <button
                                                            className="c-icon-btn edit"
                                                            title="Edit"
                                                            data-bs-toggle="modal"
                                                            data-bs-target="#editCategoryModal"
                                                            onClick={() => Seteditcategorydata({
                                                                category_id: cat.category_id,
                                                                category_name: cat.category_name,
                                                                category_image: cat.category_image,
                                                            })}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="c-icon-btn del"
                                                            title="Delete"
                                                            onClick={() => Deletecategory(cat.category_id, Setallcategories, page, search)}
                                                        >
                                                            <i className="bi bi-trash3"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={3}>
                                                    <div className="c-empty">
                                                        <i className="bi bi-grid"></i>
                                                        <p>No categories found.</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="c-pagination">
                                <span className="c-pag-info">Page <b>{page}</b> · <b>{cats.length}</b> results</span>
                                <div className="d-flex gap-2">
                                    <button className="c-pag-btn" disabled={page <= 1} onClick={() => Setpage(p => Math.max(1, p - 1))}>
                                        <i className="bi bi-chevron-left"></i>
                                    </button>
                                    <button className="c-pag-btn" disabled={cats.length < 10} onClick={() => Setpage(p => p + 1)}>
                                        <i className="bi bi-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* ══ ADD MODAL ══ */}
            <div className="modal fade admin-modal" id="categoryModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">New Category</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="m-label">Category Name</label>
                                <input
                                    type="text" className="m-input"
                                    placeholder="e.g. Electronics, Fashion…"
                                    onChange={(e) => Setaddcategory(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="m-label">Category Image</label>
                                <div className="m-upload-area">
                                    <i className="bi bi-cloud-upload"></i>
                                    <p>Click to upload image</p>
                                    <input type="file" accept="image/*" onChange={(e) => Setaddcategoryimage(e.target.files[0])} />
                                </div>
                            </div>
                            <button
                                className="m-save-btn"
                                onClick={() => Addcategory(addcategory, addcategoryimage, Setallcategories, page, search)}
                            >
                                <i className="bi bi-check-lg"></i> Save Category
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ EDIT MODAL ══ */}
            <div className="modal fade admin-modal" id="editCategoryModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Category</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body">
                            {/* Image preview */}
                            <div className="mb-3">
                                <label className="m-label">
                                    {editcategorydata?.new_image ? 'New Image Preview' : 'Current Image'}
                                </label>
                                <div className="cat-img-preview-wrap">
                                    <img
                                        src={
                                            editcategorydata?.new_image
                                                ? URL.createObjectURL(editcategorydata.new_image)
                                                : `${IMAGES_URL}/${editcategorydata?.category_image}`
                                        }
                                        alt="preview"
                                        className="cat-img-preview"
                                    />
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="m-label">Category Name</label>
                                <input
                                    type="text" className="m-input"
                                    value={editcategorydata?.category_name || ''}
                                    onChange={(e) => Seteditcategorydata({ ...editcategorydata, category_name: e.target.value })}
                                />
                            </div>

                            <div className="mb-4">
                                <label className="m-label">Change Image (Optional)</label>
                                <div className="m-upload-area">
                                    <i className="bi bi-image"></i>
                                    <p>Click to select a new image</p>
                                    <input
                                        type="file" accept="image/*"
                                        onChange={(e) => Seteditcategorydata({ ...editcategorydata, new_image: e.target.files[0] })}
                                    />
                                </div>
                            </div>

                            <button
                                className="m-save-btn"
                                onClick={() => Updatecategory(editcategorydata, Setallcategories, page, search)}
                            >
                                <i className="bi bi-check-lg"></i> Update Category
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};