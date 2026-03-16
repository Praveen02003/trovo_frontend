import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../home/Adminhome.css'
import { Sidebar } from "../sidebar/Sidebar";

export const Adminhome = () => {
    const orders = [
        { id: "#1001", customer: "John Doe", total: "$120.00", status: "Completed", color: "success" },
        { id: "#1002", customer: "Jane Smith", total: "$80.50", status: "Pending", color: "warning" },
        { id: "#1003", customer: "Mike Johnson", total: "$50.00", status: "Shipped", color: "info" },
        { id: "#1004", customer: "Sarah Connor", total: "$210.00", status: "Cancelled", color: "danger" },
    ];

    return (
        <div className="container-fluid p-0">
            <div className="d-flex">
                <Sidebar/>

                {/* Main Content */}
                <div className="flex-grow-1 bg-light min-vh-100">
                    {/* Top Navbar */}
                    <nav className="navbar navbar-expand-lg navbar-white bg-white border-bottom px-4 py-3 sticky-top">
                        <div className="container-fluid p-0">
                            <button className="btn btn-light d-md-none me-2">
                                <i className="bi bi-list fs-4"></i>
                            </button>
                            <form className="d-none d-sm-flex flex-grow-1 max-w-500 ms-2">
                                <div className="input-group border rounded-pill px-2 bg-light">
                                    <span className="input-group-text bg-transparent border-0"><i className="bi bi-search text-muted"></i></span>
                                    <input type="text" className="form-control bg-transparent border-0 shadow-none" placeholder="Search analytics..." />
                                </div>
                            </form>

                            <div className="ms-auto d-flex align-items-center">
                                <div className="position-relative me-4 cursor-pointer">
                                    <i className="bi bi-bell fs-5 text-muted"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>3</span>
                                </div>
                                <div className="dropdown">
                                    <div className="d-flex align-items-center cursor-pointer dropdown-toggle shadow-none" id="userMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                        <div className="text-end me-2 d-none d-sm-block">
                                            <p className="m-0 small fw-bold text-dark">Alex Rivera</p>
                                            <p className="m-0 x-small text-muted" style={{ fontSize: '0.7rem' }}>Super Admin</p>
                                        </div>
                                        <img src="https://ui-avatars.com" alt="Profile" className="rounded-circle border" width="40" height="40" />
                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-end shadow border-0" aria-labelledby="userMenu">
                                        <li><a className="dropdown-item" href="#">Profile</a></li>
                                        <li><a className="dropdown-item" href="#">Settings</a></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><a className="dropdown-item text-danger" href="#">Logout</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>

                    <div className="p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="fw-bold m-0">Dashboard Overview</h4>
                            <button className="btn btn-primary btn-sm rounded-pill px-3"><i className="bi bi-plus-lg me-2"></i>New Product</button>
                        </div>

                        {/* Stats Cards */}
                        <div className="row g-4 mb-4">
                            {[
                                { title: "Total Revenue", value: "$45,231.89", icon: "bi-currency-dollar", color: "primary", trend: "+12%" },
                                { title: "Active Orders", value: "356", icon: "bi-cart-check", color: "success", trend: "+5%" },
                                { title: "New Customers", value: "1,204", icon: "bi-people", color: "info", trend: "+18%" },
                                { title: "Avg. Sale", value: "$124.50", icon: "bi-bar-chart", color: "warning", trend: "-2%" }
                            ].map((stat, idx) => (
                                <div key={idx} className="col-sm-6 col-xl-3">
                                    <div className="card border-0 shadow-sm h-100 p-2">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between mb-3">
                                                <div className={`bg-${stat.color} bg-opacity-10 text-${stat.color} p-2 rounded-3`}>
                                                    <i className={`bi ${stat.icon} fs-4`}></i>
                                                </div>
                                                <span className={`text-${stat.trend.startsWith('+') ? 'success' : 'danger'} small fw-bold`}>
                                                    {stat.trend} <i className={`bi bi-arrow-${stat.trend.startsWith('+') ? 'up' : 'down'}`}></i>
                                                </span>
                                            </div>
                                            <h6 className="text-muted mb-1 small fw-bold">{stat.title}</h6>
                                            <h3 className="fw-bold m-0 text-dark">{stat.value}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Orders Table */}
                        <div className="card border-0 shadow-sm rounded-3 overflow-hidden">
                            <div className="card-header bg-white py-3 border-0">
                                <h5 className="fw-bold m-0">Recent Transactions</h5>
                            </div>
                            <div className="table-responsive">
                                <table className="table align-middle table-hover mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="border-0 px-4 text-muted small fw-bold">ORDER ID</th>
                                            <th className="border-0 text-muted small fw-bold">CUSTOMER</th>
                                            <th className="border-0 text-muted small fw-bold">AMOUNT</th>
                                            <th className="border-0 text-muted small fw-bold">STATUS</th>
                                            <th className="border-0 px-4 text-muted small fw-bold text-end">ACTION</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orders.map(order => (
                                            <tr key={order.id}>
                                                <td className="px-4 fw-bold text-primary">{order.id}</td>
                                                <td className="fw-bold">{order.customer}</td>
                                                <td className="fw-bold text-dark">{order.total}</td>
                                                <td>
                                                    <span className={`badge bg-${order.color} bg-opacity-10 text-${order.color} rounded-pill px-3`}>
                                                        {order.status}
                                                    </span>
                                                </td>
                                                <td className="px-4 text-end">
                                                    <button className="btn btn-light btn-sm rounded-circle me-1 border shadow-sm"><i className="bi bi-eye"></i></button>
                                                    <button className="btn btn-light btn-sm rounded-circle text-danger border shadow-sm"><i className="bi bi-trash"></i></button>
                                                </td>
                                            </tr>
                                        ))}
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
