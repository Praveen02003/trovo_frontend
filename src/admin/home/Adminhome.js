import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Sidebar } from "../sidebar/Sidebar";
import { Getadmindashboarddata } from "../../function/Getadmindashboarddata";
import { maincontext } from "../../App";

export const Adminhome = () => {
    const {
        customerscount,
        Setcustomerscount,
        productscount,
        Setproductscount,
        activeproductscount,
        Setactiveproductscount,
        inactiveproductscount,
        Setinactiveproductscount,
        brandscount,
        Setbrandscount,
        categoriescount,
        Setcategoriescount,
        activecustomerscont,
        Setactivecustomerscont,
        blockedcustomerscont,
        Setblockedcustomerscont
    } = useContext(maincontext);

    useEffect(() => {
        Getadmindashboarddata(
            Setcustomerscount,
            Setproductscount,
            Setactiveproductscount,
            Setinactiveproductscount,
            Setbrandscount,
            Setcategoriescount,
            Setactivecustomerscont,
            Setblockedcustomerscont
        );
    }, []);
    return (
        <div className="container-fluid p-0 bg-light">
            <div className="d-flex min-vh-100">
                <Sidebar />

                <div className="flex-grow-1 overflow-hidden">
                    {/* Top Navbar */}
                    <nav className="navbar navbar-white bg-white border-bottom px-4 py-3 sticky-top shadow-sm">
                        <div className="container-fluid p-0">
                            <h5 className="fw-bold m-0 text-dark"><i className="bi bi-speedometer2 me-2 text-primary"></i>Admin Dashboard</h5>
                            <div className="ms-auto d-flex align-items-center gap-3">
                                <div className="text-end d-none d-sm-block">
                                    <p className="m-0 small fw-bold text-dark">Alex Rivera</p>
                                    <small className="text-muted" style={{ fontSize: '0.65rem' }}>Super Admin</small>
                                </div>
                                <img src="https://ui-avatars.com" alt="Profile" className="rounded-circle border shadow-sm" width="38" height="38" />
                            </div>
                        </div>
                    </nav>

                    <div className="p-4">
                        <div className="mb-4">
                            <h4 className="fw-bold text-dark m-0">Inventory & Sales Overview</h4>
                            <p className="text-muted small">Comprehensive summary of your store's performance</p>
                        </div>

                        {/* --- TOP ROW: SALES STATS --- */}
                        <div className="row g-4 mb-4">
                            <div className="col-sm-6 col-xl-3">
                                <div className="card border-0 shadow-sm rounded-4 p-2 h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-4"><i className="bi bi-currency-dollar fs-4"></i></div>
                                            <span className="badge bg-success bg-opacity-10 text-success rounded-pill">+12%</span>
                                        </div>
                                        <h6 className="text-muted small fw-bold text-uppercase">Total Revenue</h6>
                                        <h3 className="fw-bold m-0 text-dark">$45,231</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="card border-0 shadow-sm rounded-4 p-2 h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="bg-success bg-opacity-10 text-success p-3 rounded-4"><i className="bi bi-cart-check fs-4"></i></div>
                                            <span className="badge bg-success bg-opacity-10 text-success rounded-pill">+5%</span>
                                        </div>
                                        <h6 className="text-muted small fw-bold text-uppercase">Active Orders</h6>
                                        <h3 className="fw-bold m-0 text-dark">356</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="card border-0 shadow-sm rounded-4 p-2 h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="bg-info bg-opacity-10 text-info p-3 rounded-4"><i className="bi bi-people fs-4"></i></div>
                                            <span className="badge bg-success bg-opacity-10 text-success rounded-pill">+18%</span>
                                        </div>
                                        <h6 className="text-muted small fw-bold text-uppercase">Our Customers</h6>
                                        <h3 className="fw-bold m-0 text-dark">{customerscount}</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-xl-3">
                                <div className="card border-0 shadow-sm rounded-4 p-2 h-100">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <div className="bg-warning bg-opacity-10 text-warning p-3 rounded-4"><i className="bi bi-graph-up-arrow fs-4"></i></div>
                                            <span className="badge bg-danger bg-opacity-10 text-danger rounded-pill">-2%</span>
                                        </div>
                                        <h6 className="text-muted small fw-bold text-uppercase">Avg. Sale</h6>
                                        <h3 className="fw-bold m-0 text-dark">$124.50</h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- SECOND ROW: INVENTORY STATS --- */}
                        <div className="row g-4 mb-5">
                            {/* Total Products */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="card border-0 shadow-sm rounded-4 p-2 h-100 bg-white border-start border-primary border-5">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-primary bg-opacity-10 text-primary p-3 rounded-circle me-3"><i className="bi bi-box-seam fs-4"></i></div>
                                            <div>
                                                <h6 className="text-muted small fw-bold m-0">TOTAL PRODUCTS</h6>
                                                <h3 className="fw-bold m-0">{productscount}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Active Products */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="card border-0 shadow-sm rounded-4 p-2 h-100 bg-white border-start border-success border-5">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle me-3"><i className="bi bi-check-circle fs-4"></i></div>
                                            <div>
                                                <h6 className="text-muted small fw-bold m-0">ACTIVE PRODUCTS</h6>
                                                <h3 className="fw-bold m-0 text-success">{activeproductscount}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Inactive Products */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="card border-0 shadow-sm rounded-4 p-2 h-100 bg-white border-start border-danger border-5">
                                    <div className="card-body">
                                        <div className="d-flex align-items-center">
                                            <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-circle me-3"><i className="bi bi-x-circle fs-4"></i></div>
                                            <div>
                                                <h6 className="text-muted small fw-bold m-0">INACTIVE PRODUCTS</h6>
                                                <h3 className="fw-bold m-0 text-danger">{inactiveproductscount}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Brands & Categories Combined or Separate */}
                            <div className="col-sm-6 col-lg-3">
                                <div className="card border-0 shadow-sm rounded-4 p-2 h-100 bg-white border-start border-dark border-5">
                                    <div className="card-body d-flex flex-column justify-content-center">
                                        <div className="d-flex justify-content-between mb-2">
                                            <span className="small text-muted fw-bold"><i className="bi bi-patch-check text-primary me-1"></i> BRANDS:</span>
                                            <span className="fw-bold">{brandscount}</span>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <span className="small text-muted fw-bold"><i className="bi bi-grid text-primary me-1"></i> CATEGORIES:</span>
                                            <span className="fw-bold">{categoriescount}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- NEW THIRD ROW: CUSTOMER STATS --- */}
                        <div className="row g-4 mb-5">
                            <div className="col-sm-6 col-lg-4">
                                <div className="card border-0 shadow-sm rounded-4 p-2 h-100 bg-white border-start border-success border-5">
                                    <div className="card-body d-flex align-items-center">
                                        <div className="bg-success bg-opacity-10 text-success p-3 rounded-circle me-3"><i className="bi bi-person-check fs-4"></i></div>
                                        <div>
                                            <h6 className="text-muted small fw-bold m-0 text-uppercase">Active Customers</h6>
                                            <h3 className="fw-bold m-0">{activecustomerscont}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <div className="card border-0 shadow-sm rounded-4 p-2 h-100 bg-white border-start border-danger border-5">
                                    <div className="card-body d-flex align-items-center">
                                        <div className="bg-danger bg-opacity-10 text-danger p-3 rounded-circle me-3"><i className="bi bi-person-slash fs-4"></i></div>
                                        <div>
                                            <h6 className="text-muted small fw-bold m-0 text-uppercase">Blocked Customers</h6>
                                            <h3 className="fw-bold m-0">{blockedcustomerscont}</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* Static Recent Orders Table */}
                        <div className="card border-0 shadow-sm rounded-4 bg-white overflow-hidden">
                            <div className="card-header bg-white py-4 px-4 border-0">
                                <h5 className="fw-bold m-0 text-dark">Recent Transactions</h5>
                            </div>
                            <div className="table-responsive px-2">
                                <table className="table align-middle table-hover mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="border-0 ps-4 py-3 text-muted extra-small fw-bold">ORDER ID</th>
                                            <th className="border-0 py-3 text-muted extra-small fw-bold">CUSTOMER</th>
                                            <th className="border-0 py-3 text-muted extra-small fw-bold">AMOUNT</th>
                                            <th className="border-0 py-3 text-muted extra-small fw-bold">STATUS</th>
                                            <th className="border-0 pe-4 py-3 text-muted extra-small fw-bold text-end">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        <tr>
                                            <td className="ps-4 py-3 fw-bold text-primary">#1001</td>
                                            <td className="py-3 text-dark fw-semibold">John Doe</td>
                                            <td className="py-3 text-dark fw-bold">$120.00</td>
                                            <td className="py-3">
                                                <span className="badge rounded-pill bg-success bg-opacity-10 text-success px-3 py-2 fw-bold" style={{ fontSize: '0.7rem' }}>● Completed</span>
                                            </td>
                                            <td className="pe-4 py-3 text-end">
                                                <button className="btn btn-light btn-sm border rounded-circle shadow-sm"><i className="bi bi-three-dots"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 py-3 fw-bold text-primary">#1002</td>
                                            <td className="py-3 text-dark fw-semibold">Jane Smith</td>
                                            <td className="py-3 text-dark fw-bold">$80.50</td>
                                            <td className="py-3">
                                                <span className="badge rounded-pill bg-warning bg-opacity-10 text-warning px-3 py-2 fw-bold" style={{ fontSize: '0.7rem' }}>● Pending</span>
                                            </td>
                                            <td className="pe-4 py-3 text-end">
                                                <button className="btn btn-light btn-sm border rounded-circle shadow-sm"><i className="bi bi-three-dots"></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="ps-4 py-3 fw-bold text-primary">#1003</td>
                                            <td className="py-3 text-dark fw-semibold">Mike Johnson</td>
                                            <td className="py-3 text-dark fw-bold">$50.00</td>
                                            <td className="py-3">
                                                <span className="badge rounded-pill bg-info bg-opacity-10 text-info px-3 py-2 fw-bold" style={{ fontSize: '0.7rem' }}>● Shipped</span>
                                            </td>
                                            <td className="pe-4 py-3 text-end">
                                                <button className="btn btn-light btn-sm border rounded-circle shadow-sm"><i className="bi bi-three-dots"></i></button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
