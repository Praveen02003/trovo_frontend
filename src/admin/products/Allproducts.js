import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../products/Allproducts.css'
import { Getallproducts } from "../../function/Getallproducts";
import { maincontext } from "../../App";
import { Getallcategories } from "../../function/Getallcategories";
import { Sidebar } from "../sidebar/Sidebar";
import { Link } from "react-router-dom";
import { Deleteproduct } from "../../function/Deleteproduct";
import { Closetoast } from "../../function/Closetoast";

export const Allproducts = () => {
  const {
    allproducts,
    Setallproducts,
    allcategories,
    Setallcategories,
    page,
    Setpage,
    showtoast,
    Setshowtoast,
    toastcolor,
    Settoastcolor,
    toastmessage,
    Settoastmessage
  } = useContext(maincontext)

  useEffect(() => {
    Getallproducts(Setallproducts, page);
    Getallcategories(Setallcategories);
  }, [page])

  return (
    <div className="container-fluid p-0">
      <div className="d-flex text-dark">
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-grow-1 bg-light min-vh-100">
          {/* Top Navbar */}
          <nav className="navbar navbar-white bg-white border-bottom px-4 py-3 sticky-top">
            <div className="container-fluid p-0">
              <h5 className="fw-bold m-0 text-dark">Inventory Management</h5>
              <div className="ms-auto d-flex align-items-center">
                <div className="dropdown">
                  <div className="d-flex align-items-center cursor-pointer" data-bs-toggle="dropdown" id="profileDropdown" style={{ cursor: 'pointer' }}>
                    <div className="text-end me-2 d-none d-sm-block">
                      <p className="m-0 small fw-bold">Alex Rivera</p>
                      <p className="m-0 text-muted" style={{ fontSize: '0.7rem' }}>Super Admin</p>
                    </div>
                    <img src="https://ui-avatars.com" alt="Profile" className="rounded-circle border" width="40" height="40" />
                  </div>
                  <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="profileDropdown">
                    <li><a className="dropdown-item" href="#">Profile</a></li>
                    <li><hr className="dropdown-divider" /></li>
                    <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {/* Product Content */}
          <div className="p-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0">Product List</h4>
              <Link to={'/addproduct'} className="btn btn-primary rounded-pill px-4"><i className="bi bi-plus-lg me-2"></i>Add Product</Link>
            </div>

            {/* Search & Filter Bar */}
            <div className="card border-0 shadow-sm mb-4 rounded-3">
              <div className="card-body p-3">
                <div className="row g-2">
                  <div className="col-md-8">
                    <div className="input-group">
                      <span className="input-group-text bg-light border-0"><i className="bi bi-search text-muted"></i></span>
                      <input type="text" className="form-control bg-light border-0 shadow-none" placeholder="Search by name, category or SKU..." />
                    </div>
                  </div>
                  <div className="col-md-4">
                    <select className="form-select bg-light border-0 shadow-none text-muted">
                      <option>Select Category</option>
                      {
                        allcategories.map((category, index) => {
                          return (
                            <option key={category.category_id}>{category.category_name}</option>
                          )
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
              <div className="table-responsive">
                <table className="table table-borderless align-middle mb-0">
                  <thead className="bg-light bg-opacity-50">
                    <tr>
                      <th className="ps-4 py-3 text-uppercase text-muted fw-bolder" style={{ fontSize: '0.7rem', letterSpacing: '0.05em' }}>Product Details</th>
                      <th className="py-3 text-uppercase text-muted fw-bolder" style={{ fontSize: '0.7rem' }}>Pricing & Offer</th>
                      <th className="py-3 text-uppercase text-muted fw-bolder" style={{ fontSize: '0.7rem' }}>Inventory</th>
                      <th className="py-3 text-uppercase text-muted fw-bolder" style={{ fontSize: '0.7rem' }}>Category/Brand</th>
                      <th className="py-3 text-uppercase text-muted fw-bolder text-center" style={{ fontSize: '0.7rem' }}>Status</th>
                      <th className="pe-4 py-3 text-uppercase text-muted fw-bolder text-end" style={{ fontSize: '0.7rem' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allproducts.map((product, index) => (
                      <tr key={index} className="border-bottom">
                        {/* Product Column */}
                        <td className="ps-4 py-3">
                          <div className="d-flex align-items-center">
                            <div className="rounded-3 bg-light border d-flex align-items-center justify-content-center me-3 shadow-sm" style={{ width: '48px', height: '48px' }}>
                              <img src={`http://localhost:5000/images/${product.image}`}
                                style={{
                                  height: '3rem',
                                  width: '2rem'
                                }} />
                            </div>
                            <div>
                              <div className="fw-bold text-dark mb-0">{product.product_name}</div>
                              <div className="text-muted extra-small" style={{ fontSize: '0.75rem' }}>ID: {product.product_id}</div>
                            </div>
                          </div>
                        </td>

                        {/* Pricing Column */}
                        <td className="py-3">
                          <div className="d-flex flex-column">
                            <div className="d-flex align-items-center gap-2">
                              <span className="fw-bold text-dark fs-6">${product.price}</span>
                              <span className="text-muted text-decoration-line-through small">${product.original_price}</span>
                            </div>
                            <div className="mt-1">
                              <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-2" style={{ fontSize: '0.65rem' }}>
                                {product.offer}% OFF
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Inventory Column */}
                        <td className="py-3">
                          <div style={{ minWidth: '130px' }}>
                            <div className="d-flex justify-content-between mb-1">
                              <span className={`small fw-bold ${product.stock < 10 ? 'text-danger' : 'text-muted'}`}>
                                {product.stock} in stock
                              </span>
                            </div>
                            <div className="progress bg-light shadow-sm" style={{ height: '6px', borderRadius: '10px' }}>
                              <div
                                className={`progress-bar rounded-pill ${product.stock < 10 ? 'bg-danger' : 'bg-primary'}`}
                                role="progressbar"
                                style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>

                        {/* Category & Brand */}
                        <td className="py-3">
                          <div className="d-flex flex-column">
                            <span className="text-dark small fw-bold">{product.category_name}</span>
                            <span className="text-muted small">{product.brand_name}</span>
                          </div>
                        </td>

                        {/* Status Column with Dot Symbol */}
                        <td className="py-3 text-center">
                          <div className={`badge py-2 px-3 rounded-pill fw-bold ${product.status === 'active' ? 'bg-success text-success' : 'bg-secondary text-secondary'} bg-opacity-10`} style={{ fontSize: '0.75rem' }}>
                            <span className="me-1">●</span> {product.status}
                          </div>
                        </td>

                        {/* Action Column with Three Dots */}
                        <td className="pe-4 py-3 text-end">
                          <div className="dropdown">
                            <button
                              className="btn btn-light btn-sm rounded-3 border shadow-sm px-2"
                              type="button"
                              id={`actionMenu${product.id}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i className="bi bi-three-dots-vertical"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end shadow border-0 p-2" aria-labelledby={`actionMenu${product.id}`}>
                              <li>
                                <Link to={`/editproduct/${product.product_id}`} className="dropdown-item rounded-2 py-2 small">
                                  <i className="bi bi-pencil-square me-2 text-primary"></i> Edit Product
                                </Link>
                              </li>
                              {/* <li>
                                <button className="dropdown-item rounded-2 py-2 small">
                                  <i className="bi bi-eye me-2 text-info"></i> View Details
                                </button>
                              </li> */}
                              <li><hr className="dropdown-divider" /></li>
                              <li>
                                <button className="dropdown-item rounded-2 py-2 small text-danger" onClick={() => {
                                  Deleteproduct(product.product_id, Settoastmessage, Setshowtoast, Settoastcolor, Setallproducts, page);
                                }}>
                                  <i className="bi bi-trash3 me-2"></i> Delete Product
                                </button>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination Footer */}
              <div className="px-4 py-3 bg-light bg-opacity-25 border-top d-flex justify-content-between align-items-center">
                <p className="mb-0 small text-muted">Showing <b>{allproducts.length}</b> products</p>
                <div className="btn-group shadow-sm border rounded overflow-hidden">
                  <button className="btn btn-white btn-sm border-0 bg-white px-3" onClick={() => {
                    Setpage(page > 0 ? page - 1 : 1)
                  }}>
                    <i className="bi bi-chevron-left"></i>
                  </button>
                  <button className="btn btn-white btn-sm border-0 bg-white px-3 border-start" onClick={() => {
                    if (allproducts.length === 10) {
                      Setpage(page + 1)
                    }
                  }}>
                    <i className="bi bi-chevron-right"></i>
                  </button>
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
