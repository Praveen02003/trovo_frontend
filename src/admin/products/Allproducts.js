import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Sidebar } from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import { maincontext } from "../../App";
import { Getallproducts } from "../../function/Getallproducts";
import { Getallcategories } from "../../function/Getallcategories";
import { Deleteproduct } from "../../function/Deleteproduct";
import { Addbrand } from "../../function/Addbrand";
import { Closetoast } from "../../function/Closetoast";
import { Addcategory } from "../../function/Addcategory";
import { Createproduct } from "../../function/Createproduct";
import { Getallbrands } from "../../function/Getallbrands";
import { Getloginuser } from "../../function/Getloginuser";
import { IMAGES_URL } from "../../axios/Imageurl";
import { Adminauth } from "../../function/Adminauth";

export const Allproducts = () => {
  const {
    loginuser,
    Setloginuser,
    allbrands,
    Setallbrands,
    allproducts,
    Setallproducts,
    allcategories,
    Setallcategories,
    page,
    Setpage,
    search,
    Setsearch,
    category,
    Setcategory,
    showtoast,
    Setshowtoast,
    toastcolor,
    Settoastcolor,
    toastmessage,
    Settoastmessage,
    addproduct,
    Setaddproduct,
    addbrand,
    Setaddbrand,
    addcategory,
    Setaddcategory,
    addcategoryimage,
    Setaddcategoryimage,
  } = useContext(maincontext);

  useEffect(() => {
    const loadData = async () => {
      // 1️⃣ Verify admin first
      const isAdmin = await Adminauth();
      if (!isAdmin) return; // stop if not admin

      // 2️⃣ Set login user
      Setloginuser(Getloginuser()); // synchronous

      // 3️⃣ Fetch data (await if functions are async)
      await Getallproducts(Setallproducts, page, search, category);
      await Getallcategories(Setallcategories);
      await Getallbrands(Setallbrands);
    };

    loadData();
  }, [page, search, category]);

  return (
    <div className="container-fluid p-0">
      <div className="d-flex text-dark bg-light">
        <Sidebar />

        <div className="flex-grow-1 min-vh-100">
          {/* Top Navbar */}
          <nav className="navbar navbar-white bg-white border-bottom px-4 py-3 sticky-top shadow-sm text-dark">
            <div className="container-fluid p-0">
              <h5 className="fw-bold m-0"><i className="bi bi-box-seam me-2 text-primary"></i>Inventory Management</h5>
              <div className="ms-auto d-flex align-items-center gap-3">
                <div className="text-end d-none d-sm-block">
                  <p className="m-0 small fw-bold">{loginuser.name}</p>
                  <p className="m-0 text-muted extra-small" style={{ fontSize: '0.7rem' }}>Super Admin</p>
                </div>
                <img src={`${IMAGES_URL}/${loginuser.profileimage}`} alt="Profile" className="rounded-circle border shadow-sm" width="40" height="40" />
              </div>
            </div>
          </nav>

          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0 text-dark">Our Product</h4>
              <div className="d-flex gap-2">
                {/* <Link to={'/addproduct'} className="btn btn-primary rounded-pill px-4 shadow-sm fw-bold">
                  <i className="bi bi-plus-lg me-2"></i>Product
                </Link> */}
                <button className="btn btn-primary rounded-pill px-4 shadow-sm fw-bold" data-bs-toggle="modal" data-bs-target="#addProductModal">
                  <i className="bi bi-plus-lg me-2"></i>Product
                </button>
                <button className="btn btn-primary rounded-pill px-4 shadow-sm fw-bold" data-bs-toggle="modal" data-bs-target="#brandModal">
                  <i className="bi bi-plus-lg me-2"></i>Brand
                </button>
                <button className="btn btn-primary rounded-pill px-4 shadow-sm fw-bold" data-bs-toggle="modal" data-bs-target="#categoryModal">
                  <i className="bi bi-plus-lg me-2"></i>Category
                </button>
              </div>
            </div>

            {/* Filter Bar */}
            <div className="card border-0 shadow-sm mb-4 rounded-4">
              <div className="card-body p-3">
                <div className="row g-2">
                  <div className="col-md-8">
                    <div className="input-group bg-light rounded-pill px-3 border">
                      <span className="input-group-text bg-transparent border-0"><i className="bi bi-search text-muted"></i></span>
                      <input type="text" className="form-control bg-transparent border-0 shadow-none py-2" placeholder="Search by name or ID..."
                        onChange={(e) => { Setsearch(e.target.value); Setpage(1); }} />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select border-0 bg-light rounded-pill px-3 shadow-none fw-bold text-muted"
                      onChange={(e) => { Setcategory(e.target.value); Setpage(1); }}>
                      <option value="all">All Categories</option>
                      {allcategories.map((cat) => (
                        <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Table Area */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th className="ps-4 py-3 text-uppercase text-muted fw-bold" style={{ fontSize: '0.7rem' }}>Product</th>
                      <th className="py-3 text-uppercase text-muted fw-bold" style={{ fontSize: '0.7rem' }}>Pricing</th>
                      <th className="py-3 text-uppercase text-muted fw-bold" style={{ fontSize: '0.7rem' }}>Inventory</th>
                      <th className="py-3 text-uppercase text-muted fw-bold text-center" style={{ fontSize: '0.7rem' }}>Status</th>
                      <th className="pe-4 py-3 text-uppercase text-muted fw-bold text-end" style={{ fontSize: '0.7rem' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allproducts && allproducts.length > 0 ? (
                      allproducts.map((product) => (
                        <tr key={product.product_id} className="border-bottom text-dark">
                          <td className="ps-4 py-3">
                            <div className="d-flex align-items-center">
                              <div className="rounded-3 bg-light border p-1 me-3 shadow-sm" style={{ width: '50px', height: '50px' }}>
                                <img src={`${IMAGES_URL}/${product.image}`}
                                  className="w-100 h-100 rounded" style={{ objectFit: 'contain' }} alt="thumb" />
                              </div>
                              <div>
                                <div className="fw-bold text-dark mb-0">{product.product_name}</div>
                                <div className="text-muted extra-small" style={{ fontSize: '0.75rem' }}>SKU: {product.product_id}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="fw-bold text-dark fs-6">${product.price}</div>
                            <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2" style={{ fontSize: '0.6rem' }}>
                              {product.offer}% OFF
                            </span>
                          </td>
                          <td>
                            <div className="small fw-bold text-dark">{product.stock} units</div>
                            <div className="progress mt-1" style={{ height: '4px', width: '100px' }}>
                              <div className={`progress-bar ${product.stock < 10 ? 'bg-danger' : 'bg-primary'}`}
                                style={{ width: `${Math.min(product.stock, 100)}%` }}></div>
                            </div>
                          </td>
                          <td className="text-center text-dark">
                            <span className={`badge rounded-pill px-3 py-2 fw-bold ${product.status === 'active' ? 'bg-success text-success' : 'bg-secondary text-secondary'} bg-opacity-10`} style={{ fontSize: '0.7rem' }}>
                              ● {product.status}
                            </span>
                          </td>
                          <td className="pe-4 text-end">
                            <div className="dropdown">
                              <button className="btn btn-light btn-sm rounded-circle border shadow-sm" data-bs-toggle="dropdown">
                                <i className="bi bi-three-dots-vertical text-dark"></i>
                              </button>
                              <ul className="dropdown-menu dropdown-menu-end shadow border-0">
                                <li>
                                  <Link className="dropdown-item py-2" to={`/editproduct/${product.product_id}`}>
                                    <i className="bi bi-pencil me-2 text-primary"></i>Edit
                                  </Link>
                                </li>
                                <li>
                                  <button className="dropdown-item py-2 text-danger" onClick={() => Deleteproduct(product.product_id, Setallproducts, page)}>
                                    <i className="bi bi-trash me-2"></i>Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr><td colSpan="5" className="text-center py-5">No Products Found</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="px-4 py-3 bg-light bg-opacity-25 border-top d-flex justify-content-between align-items-center">
                <p className="mb-0 small text-muted">Showing <b>{allproducts.length}</b> products on Page <b>{page}</b></p>
                <div className="btn-group shadow-sm border rounded overflow-hidden">
                  <button
                    className="btn btn-white btn-sm border-0 bg-white px-3 shadow-none"
                    disabled={page <= 1}
                    onClick={() => {
                      Setpage(page > 1 ? page - 1 : 1)
                    }}
                  >
                    <i className="bi bi-chevron-left text-primary"></i>
                  </button>
                  <button
                    className="btn btn-white btn-sm border-0 bg-white px-3 border-start shadow-none"
                    disabled={allproducts.length < 10}
                    onClick={() => {
                      if (allproducts.length === 10) {
                        Setpage(page + 1)
                      }
                    }}
                  >
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
                Addbrand(addbrand, Setallbrands, page, search);
              }}
              >Save Brand</button>
            </div>
          </div>
        </div>
      </div>

      {/* --- ADD CATEGORY MODAL --- */}
      <div className="modal fade text-dark" id="categoryModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Add New Category</h5>
              <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body p-4">
              <div className="mb-3">
                <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Category Name</label>
                <input type="text" value={addcategory} onChange={(e) => Setaddcategory(e.target.value)}
                  className="form-control rounded-pill bg-light border-0 px-3 py-2 shadow-sm" placeholder="e.g. Electronics" />
              </div>
              <div className="mb-4">
                <label className="form-label small fw-bold text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>Category Image</label>
                <input type="file" onChange={(e) => Setaddcategoryimage(e.target.files[0])}
                  className="form-control rounded-3 bg-light border-0 px-3 py-2 shadow-sm" />
              </div>
              <button type="button" onClick={() => Addcategory(addcategory, addcategoryimage, Setallcategories, page, search)}
                className="btn btn-primary w-100 rounded-pill py-2 fw-bold shadow">
                <i className="bi bi-check2-circle me-2"></i>Save Category
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* --- ADD PRODUCT MODAL --- */}
      <div className="modal fade text-dark" id="addProductModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header border-0 pb-0">
              <h5 className="modal-title fw-bold">Add New Product</h5>
              <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body p-4">
              <div className="row g-3">
                {/* General Info */}
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Product Name</label>
                  <input type="text" className="form-control bg-light border-0 p-2 rounded-3" placeholder="Enter product title..."
                    onChange={(e) => Setaddproduct({ ...addproduct, name: e.target.value })} />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Description</label>
                  <textarea className="form-control bg-light border-0 p-2 rounded-3" rows="3" placeholder="Description..."
                    onChange={(e) => Setaddproduct({ ...addproduct, description: e.target.value })}></textarea>
                </div>

                {/* Pricing & Inventory */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Original Price ($)</label>
                  <input type="number" className="form-control bg-light border-0 p-2 rounded-3" placeholder="0"
                    onChange={(e) => {
                      const val = e.target.value;
                      Setaddproduct({ ...addproduct, original_price: val, price: val - (val * (addproduct.offer || 0) / 100) });
                    }} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Offer (%)</label>
                  <input type="number" className="form-control bg-light border-0 p-2 rounded-3" placeholder="0"
                    onChange={(e) => {
                      const off = e.target.value;
                      Setaddproduct({ ...addproduct, offer: off, price: addproduct.original_price - (addproduct.original_price * (off / 100)) });
                    }} />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Discounted Price</label>
                  <input type="number" className="form-control bg-white border p-2 rounded-3" value={addproduct.price || 0} disabled />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Stock Quantity</label>
                  <input type="number" className="form-control bg-light border-0 p-2 rounded-3" placeholder="100"
                    onChange={(e) => Setaddproduct({ ...addproduct, stock: e.target.value })} />
                </div>

                {/* Organization */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Category</label>
                  <select className="form-select bg-light border-0 p-2 rounded-3 shadow-none"
                    onChange={(e) => Setaddproduct({ ...addproduct, category_id: e.target.value })}>
                    <option value="">Select Category</option>
                    {allcategories.map(cat => (
                      <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Brand</label>
                  <select className="form-select bg-light border-0 p-2 rounded-3 shadow-none"
                    onChange={(e) => Setaddproduct({ ...addproduct, brand_id: e.target.value })}>
                    <option value="">Select Brand</option>
                    {allbrands.map(brand => (
                      <option key={brand.brand_id} value={brand.brand_id}>{brand.brand_name}</option>
                    ))}
                  </select>
                </div>

                {/* Image Upload */}
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Product Image</label>
                  <div className="border border-2 border-dashed rounded-3 p-3 bg-light text-center position-relative">
                    <i className="bi bi-image text-primary fs-3"></i>
                    <p className="extra-small mb-0">Click to upload image</p>
                    <input type="file" className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                      onChange={(e) => Setaddproduct({ ...addproduct, image: e.target.files[0] })} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer border-0 p-4 pt-0">
              <button type="button" className="btn btn-primary w-100 rounded-pill py-2 fw-bold"
                onClick={() => Createproduct(addproduct)}>
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
