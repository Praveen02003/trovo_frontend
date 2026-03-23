import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './Adminhome.css';
import { Sidebar } from "../sidebar/Sidebar";
import { Getadmindashboarddata } from "../../function/Getadmindashboarddata";
import { maincontext } from "../../App";
import { Link } from "react-router-dom";
import { Getloginuser } from "../../function/Getloginuser";
import { IMAGES_URL } from "../../axios/Imageurl";
import { Adminauth } from "../../function/Adminauth";

export const Adminhome = () => {
    const {
        loginuser, Setloginuser,
        customerscount, Setcustomerscount,
        productscount, Setproductscount,
        activeproductscount, Setactiveproductscount,
        inactiveproductscount, Setinactiveproductscount,
        brandscount, Setbrandscount,
        categoriescount, Setcategoriescount,
        activecustomerscont, Setactivecustomerscont,
        blockedcustomerscont, Setblockedcustomerscont,
        orderscount, Setorderscount,
        totalrevenue, Settotalrevenue,
        recenttransactions, Setrecenttransactions,
        avgsale, Setavgsale,
    } = useContext(maincontext);

    useEffect(() => {
        const loadData = async () => {
            const isAdmin = await Adminauth();
            if (!isAdmin) return;
            Setloginuser(Getloginuser());
            await Getadmindashboarddata(
                Setcustomerscount, Setproductscount,
                Setactiveproductscount, Setinactiveproductscount,
                Setbrandscount, Setcategoriescount,
                Setactivecustomerscont, Setblockedcustomerscont,
                Setorderscount, Settotalrevenue,
                Setrecenttransactions, Setavgsale
            );
        };
        loadData();
    }, []);

    /* Status badge class */
    const statusClass = (s) => {
        switch ((s || '').toLowerCase()) {
            case 'placed': return 'placed';
            case 'shipped': return 'shipped';
            case 'delivered': return 'delivered';
            default: return 'default';
        }
    };

    return (
        <div className="container-fluid p-0 admin-page">
            <div className="d-flex">
                <Sidebar />

                <div className="flex-grow-1 overflow-hidden">

                    {/* ── Top Navbar ── */}
                    <nav className="navbar admin-topbar">
                        <div className="container-fluid p-0">
                            <h5 className="admin-topbar-title">
                                <i className="bi bi-speedometer2"></i>
                                Admin Dashboard
                            </h5>
                            <div className="admin-topbar-profile ms-auto">
                                <div className="admin-profile-info d-none d-sm-block">
                                    <span className="admin-profile-name">{loginuser?.name}</span>
                                    <span className="admin-profile-role">Super Admin</span>
                                </div>
                                <img
                                    src={`${IMAGES_URL}/${loginuser?.profileimage}`}
                                    alt="Profile"
                                    className="admin-profile-img"
                                />
                            </div>
                        </div>
                    </nav>

                    <div className="admin-content">

                        {/* Page heading */}
                        <div className="admin-page-heading">
                            <h4>Inventory & Sales Overview</h4>
                            <p>Comprehensive summary of your store's performance</p>
                        </div>

                        {/* ══ ROW 1 — Sales Stats ══ */}
                        <div className="row g-3 mb-4">
                            {/* Revenue */}
                            <div className="col-sm-6 col-xl-3">
                                <div className="stat-card" style={{ "--sc-color": "var(--accent)" }}>
                                    <div className="stat-card-top">
                                        <div className="stat-icon purple"><i className="bi bi-currency-dollar"></i></div>
                                        <span className="stat-badge badge-up"><i className="bi bi-arrow-up me-1"></i>12%</span>
                                    </div>
                                    <span className="stat-label">Total Revenue</span>
                                    <span className="stat-value">$ {parseFloat(totalrevenue || 0).toLocaleString()}</span>
                                </div>
                            </div>
                            {/* Orders */}
                            <div className="col-sm-6 col-xl-3">
                                <div className="stat-card" style={{ "--sc-color": "var(--green)" }}>
                                    <div className="stat-card-top">
                                        <div className="stat-icon green"><i className="bi bi-cart-check"></i></div>
                                        <span className="stat-badge badge-up"><i className="bi bi-arrow-up me-1"></i>5%</span>
                                    </div>
                                    <span className="stat-label">Active Orders</span>
                                    <span className="stat-value">{orderscount}</span>
                                </div>
                            </div>
                            {/* Customers */}
                            <div className="col-sm-6 col-xl-3">
                                <div className="stat-card" style={{ "--sc-color": "var(--cyan)" }}>
                                    <div className="stat-card-top">
                                        <div className="stat-icon cyan"><i className="bi bi-people"></i></div>
                                        <span className="stat-badge badge-up"><i className="bi bi-arrow-up me-1"></i>18%</span>
                                    </div>
                                    <span className="stat-label">Our Customers</span>
                                    <span className="stat-value">{customerscount}</span>
                                </div>
                            </div>
                            {/* Avg Sale */}
                            <div className="col-sm-6 col-xl-3">
                                <div className="stat-card" style={{ "--sc-color": "var(--gold)" }}>
                                    <div className="stat-card-top">
                                        <div className="stat-icon gold"><i className="bi bi-graph-up-arrow"></i></div>
                                        <span className="stat-badge badge-down"><i className="bi bi-arrow-down me-1"></i>2%</span>
                                    </div>
                                    <span className="stat-label">Avg. Sale</span>
                                    <span className="stat-value">$ {parseFloat(avgsale || 0).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/* ══ ROW 2 — Inventory Stats ══ */}
                        <div className="row g-3 mb-4">
                            <div className="col-sm-6 col-lg-3">
                                <div className="inv-card" style={{ "--ic-color": "var(--accent)" }}>
                                    <div className="inv-icon purple"><i className="bi bi-box-seam"></i></div>
                                    <div>
                                        <span className="inv-label">Total Products</span>
                                        <span className="inv-value">{productscount}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="inv-card" style={{ "--ic-color": "var(--green)" }}>
                                    <div className="inv-icon green"><i className="bi bi-check-circle"></i></div>
                                    <div>
                                        <span className="inv-label">Active Products</span>
                                        <span className="inv-value green">{activeproductscount}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="inv-card" style={{ "--ic-color": "var(--red)" }}>
                                    <div className="inv-icon red"><i className="bi bi-x-circle"></i></div>
                                    <div>
                                        <span className="inv-label">Inactive Products</span>
                                        <span className="inv-value red">{inactiveproductscount}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-3">
                                <div className="combo-card">
                                    <div className="combo-row">
                                        <span className="combo-label"><i className="bi bi-patch-check"></i>Brands</span>
                                        <span className="combo-value">{brandscount}</span>
                                    </div>
                                    <div className="combo-divider"></div>
                                    <div className="combo-row">
                                        <span className="combo-label"><i className="bi bi-grid"></i>Categories</span>
                                        <span className="combo-value">{categoriescount}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ══ ROW 3 — Customer Stats ══ */}
                        <div className="row g-3 mb-4">
                            <div className="col-sm-6 col-lg-4">
                                <div className="cust-card">
                                    <div className="cust-icon green"><i className="bi bi-person-check"></i></div>
                                    <div>
                                        <span className="cust-label">Active Customers</span>
                                        <span className="cust-value">{activecustomerscont}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 col-lg-4">
                                <div className="cust-card">
                                    <div className="cust-icon red"><i className="bi bi-person-slash"></i></div>
                                    <div>
                                        <span className="cust-label">Blocked Customers</span>
                                        <span className="cust-value">{blockedcustomerscont}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ══ Transactions Table ══ */}
                        <div className="tx-card">
                            <div className="tx-card-header">
                                <h5 className="tx-card-title">Recent Transactions</h5>
                                <Link to="/orders" className="view-all-btn">
                                    View All <i className="bi bi-arrow-right ms-1"></i>
                                </Link>
                            </div>

                            <div className="table-responsive">
                                <table className="modern-table">
                                    <thead>
                                        <tr>
                                            <th>Order</th>
                                            <th>Customer</th>
                                            <th>Amount</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recenttransactions.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="tx-empty">
                                                    <i className="bi bi-inbox" style={{ fontSize: '2rem', display: 'block', marginBottom: '8px', color: '#ddd' }}></i>
                                                    No recent transactions
                                                </td>
                                            </tr>
                                        ) : (
                                            recenttransactions.map((tx) => (
                                                <tr key={tx.order_id}>
                                                    <td>
                                                        <span className="tx-order-id">#{tx.order_id}</span>
                                                        <span className="tx-order-date">
                                                            {new Date(tx.created_at).toLocaleDateString('en-GB', {
                                                                day: 'numeric', month: 'short', year: 'numeric'
                                                            })}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className="tx-customer">{tx.name}</span>
                                                    </td>
                                                    <td>
                                                        <span className="tx-amount">
                                                            $ {parseFloat(tx.total_amount).toFixed(2)}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <span className={`status-badge ${statusClass(tx.order_status)}`}>
                                                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}></span>
                                                            {tx.order_status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Link to={`/vieworder/${tx.order_id}`} className="tx-view-btn">
                                                            View <i className="bi bi-chevron-right"></i>
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