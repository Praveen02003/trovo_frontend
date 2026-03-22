import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Sidebar } from "../sidebar/Sidebar";
import { Getadmindashboarddata } from "../../function/Getadmindashboarddata";
import { maincontext } from "../../App";
import { Link } from "react-router-dom";
import { Getloginuser } from "../../function/Getloginuser";
import { IMAGES_URL } from "../../axios/Imageurl";

export const Adminhome = () => {
    const {
        loginuser,
        Setloginuser,
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
        Setblockedcustomerscont,
        orderscount,
        Setorderscount,
        totalrevenue,
        Settotalrevenue,
        recenttransactions,
        Setrecenttransactions,
        avgsale,
        Setavgsale,
    } = useContext(maincontext);

    useEffect(() => {
        Setloginuser(Getloginuser())
        Getadmindashboarddata(
            Setcustomerscount,
            Setproductscount,
            Setactiveproductscount,
            Setinactiveproductscount,
            Setbrandscount,
            Setcategoriescount,
            Setactivecustomerscont,
            Setblockedcustomerscont,
            Setorderscount,
            Settotalrevenue,
            Setrecenttransactions,
            Setavgsale
        );
    }, []);
    return (
        <div className="container-fluid p-0 bg-light">
            <div className="d-flex min-vh-0">
                <Sidebar />

                <div className="flex-grow-1 overflow-hidden">
                    {/* Top Navbar */}
                    <nav className="navbar navbar-white bg-white border-bottom px-4 py-3 sticky-top shadow-sm">
                        <div className="container-fluid p-0">
                            <h5 className="fw-bold m-0 text-dark"><i className="bi bi-speedometer2 me-2 text-primary"></i>Admin Dashboard</h5>
                            <div className="ms-auto d-flex align-items-center gap-3">
                                <div className="text-end d-none d-sm-block">
                                    <p className="m-0 small fw-bold text-dark">{loginuser.name}</p>
                                    <small className="text-muted" style={{ fontSize: '0.65rem' }}>Super Admin</small>
                                </div>
                                <img src={`${IMAGES_URL}/${loginuser.profileimage}`} alt="Profile" className="rounded-circle border shadow-sm" width="38" height="38" />
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
                                        <h3 className="fw-bold m-0 text-dark">${parseFloat(totalrevenue || 0).toLocaleString()}</h3>
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
                                        <h3 className="fw-bold m-0 text-dark">{orderscount}</h3>
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
                                        <h3 className="fw-bold m-0 text-dark">${parseFloat(avgsale || 0).toFixed(2)}</h3>
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


                        {/* Modern Recent Transactions Table */}
                        <div className="card rounded-4 shadow-sm bg-white p-3">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5 className="fw-bold m-0">Recent Transactions</h5>
                                <Link to={'/orders'} className="btn btn-sm btn-outline-primary rounded-pill">View All</Link>
                            </div>

                            <div className="table-responsive">
                                <table className="table align-middle mb-0 modern-table">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>CUSTOMER</th>
                                            <th>AMOUNT</th>
                                            <th>STATUS</th>
                                            <th>DETAILS</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recenttransactions.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="text-center py-4 text-muted">
                                                    No recent transactions
                                                </td>
                                            </tr>
                                        ) : (
                                            recenttransactions.map((tx) => (
                                                <tr key={tx.order_id} className="align-middle">
                                                    <td>
                                                        <div className="fw-bold text-dark">#{tx.order_id}</div>
                                                        <small className="text-muted">{new Date(tx.created_at).toLocaleDateString()}</small>
                                                    </td>
                                                    <td className="text-dark fw-semibold">{tx.name}</td>
                                                    <td className="fw-bold text-dark">${parseFloat(tx.total_amount).toFixed(2)}</td>
                                                    <td>
                                                        <span className={`text-white bg-success badge status-badge`}>
                                                            ● {tx.order_status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Link to={`/vieworder/${tx.order_id}`} className="btn btn-primary btn-sm rounded-pill px-3">
                                                            View <i className="bi bi-chevron-right ms-1"></i>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
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
