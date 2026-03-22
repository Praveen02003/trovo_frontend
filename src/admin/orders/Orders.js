import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";
import { Getloginuser } from "../../function/Getloginuser";
import { maincontext } from "../../App";
import { IMAGES_URL } from "../../axios/Imageurl";
import api from "../../axios/Axios";

export const Orders = () => {
    const {
        loginuser,
        Setloginuser,
    } = useContext(maincontext)
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All"); // New State

    useEffect(() => {
        api
            .get("/getallorders")
            .then((res) => setOrders(res.data))
            .catch((err) => console.error(err));

        Setloginuser(Getloginuser())
    }, []);

    const getStatusStyle = (status) => {
        switch ((status || "").toLowerCase()) {
            case "completed": case "delivered": return { bg: "#e6f4ea", text: "#1e7e34", icon: "bi-check-circle" };
            case "pending": return { bg: "#fff8e1", text: "#b45d00", icon: "bi-clock-history" };
            case "shipped": return { bg: "#e3f2fd", text: "#0d6efd", icon: "bi-truck" };
            case "processed": return { bg: "#f3e5f5", text: "#7b1fa2", icon: "bi-gear" };
            default: return { bg: "#f8f9fa", text: "#6c757d", icon: "bi-question-circle" };
        }
    };

    // Updated Filter Logic
    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.order_id.toString().includes(searchTerm);
        const matchesStatus = filterStatus === "All" || order.order_status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="d-flex" style={{ minHeight: "100vh", background: "#f8f9fa", fontFamily: "'Inter', sans-serif" }}>
            <Sidebar />

            <div className="flex-grow-1">
                <nav className="navbar bg-white border-bottom px-4 py-3 sticky-top shadow-sm">
                    <div className="container-fluid p-0">
                        <div className="d-flex align-items-center">
                            <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                                <i className="bi bi-people-fill text-primary fs-5"></i>
                            </div>
                            <h5 className="fw-bold m-0 text-dark">Order Management</h5>
                        </div>
                        <div className="ms-auto d-flex align-items-center gap-3">
                            <div className="text-end d-none d-sm-block">
                                <p className="m-0 small fw-bold">{loginuser.name}</p>
                                <p className="m-0 text-muted extra-small" style={{ fontSize: '0.7rem' }}>Super Admin</p>
                            </div>
                            <img src={`${IMAGES_URL}/${loginuser.profileimage}`} alt="Profile" className="rounded-circle border shadow-sm" width="40" height="40" />
                        </div>
                    </div>
                </nav>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold text-dark mb-1">Order Dashboard</h2>
                        <p className="text-muted small mb-0">Manage and track your customer orders</p>
                    </div>
                    <Link to={'/admindashboard'} className="btn btn-primary d-flex align-items-center shadow-sm rounded-3 px-3">
                        Go to Dashboard
                    </Link>
                </div>

                {/* Stats Overview */}
                <div className="row g-3 mb-4">
                    {[
                        { title: "Total Orders", val: orders.length, color: "primary", icon: "bi-cart-check" },
                        { title: "Revenue", val: `$${orders.reduce((acc, o) => acc + parseFloat(o.total_amount || 0), 0).toLocaleString()}`, color: "success", icon: "bi-currency-dollar" }
                    ].map((stat, i) => (
                        <div key={i} className="col-md-6">
                            <div className="card border-0 shadow-sm rounded-4 p-3">
                                <div className="d-flex align-items-center">
                                    <div className={`bg-${stat.color}-subtle text-${stat.color} p-3 rounded-3 me-3`}>
                                        <i className={`bi ${stat.icon} fs-4`}></i>
                                    </div>
                                    <div>
                                        <p className="text-muted small fw-semibold mb-0">{stat.title}</p>
                                        <h4 className="fw-bold mb-0">{stat.val}</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Search and Table */}
                <div className="card shadow-sm rounded-4 border-0 overflow-hidden">
                    <div className="card-header bg-white py-3 px-4 border-bottom d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
                        <h5 className="fw-bold mb-0 text-secondary">Order History</h5>
                        <div className="d-flex gap-2">
                            {/* Search Input */}
                            <div className="input-group input-group-sm shadow-sm rounded-3 overflow-hidden">
                                <span className="input-group-text bg-light border-0 px-3"><i className="bi bi-search text-muted"></i></span>
                                <input
                                    type="text"
                                    className="form-control border-0 bg-light px-2"
                                    placeholder="ID or Customer..."
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            {/* Status Filter Dropdown */}
                            <select
                                className="form-select form-select-sm border shadow-sm rounded-3 fw-bold text-secondary"
                                style={{ width: '150px' }}
                                onChange={(e) => setFilterStatus(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Pending">Pending</option>
                                <option value="Processed">Processed</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-light">
                                <tr className="small text-uppercase text-muted tracking-wider">
                                    <th className="ps-4">Order ID</th>
                                    <th>Customer</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th className="text-center pe-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredOrders.map((order) => {
                                    const style = getStatusStyle(order.order_status);
                                    return (
                                        <tr key={order.order_id}>
                                            <td className="ps-4 fw-bold text-dark">#{order.order_id}</td>
                                            <td>
                                                <div className="d-flex align-items-center gap-3">
                                                    <img src={`https://ui-avatars.com{order.customer_name}&background=random`} className="rounded-circle border" width="32" height="32" alt="" />
                                                    <span className="fw-semibold">{order.customer_name}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="badge rounded-pill px-3 py-2 d-inline-flex align-items-center shadow-sm" style={{ backgroundColor: style.bg, color: style.text, fontSize: '0.7rem' }}>
                                                    <i className={`bi ${style.icon} me-2`}></i> {order.order_status}
                                                </span>
                                            </td>
                                            <td className="text-muted small">{new Date(order.created_at).toLocaleDateString("en-IN", { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                            <td className="fw-bold text-dark">${parseFloat(order.total_amount || 0).toLocaleString()}</td>
                                            <td className="text-center pe-4">
                                                <Link className="btn btn-white btn-sm border rounded-3 shadow-sm px-3 fw-bold" to={`/vieworder/${order.order_id}`}>
                                                    <i className="bi bi-eye me-2 text-primary"></i> View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        {filteredOrders.length === 0 && (
                            <div className="text-center py-5 my-5 px-4 animate__animated animate__fadeIn">
                                {/* Modern Illustration Circle */}
                                <div className="mb-4 d-inline-block position-relative">
                                    <div className="bg-primary-subtle rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                                        style={{ width: "100px", height: "100px" }}>
                                        <i className="bi bi-search text-primary fs-1 opacity-75"></i>
                                    </div>
                                    <span className="position-absolute bottom-0 end-0 bg-white rounded-circle p-2 shadow-sm border border-light">
                                        <i className="bi bi-question-circle text-muted fs-5"></i>
                                    </span>
                                </div>

                                {/* Textual Feedback */}
                                <div className="mb-4">
                                    <h4 className="fw-bold text-dark mb-2">No matching orders found</h4>
                                    <p className="text-muted mx-auto" style={{ maxWidth: "400px", fontSize: "0.95rem" }}>
                                        Your search for <span className="text-primary fw-semibold">"{searchTerm || filterStatus}"</span>
                                        didn't return any results. Try checking for typos or adjusting your filters.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-flex justify-content-center gap-2 mt-4">
                                    <button
                                        className="btn btn-outline-secondary btn-sm rounded-pill px-4 fw-bold shadow-sm bg-white"
                                        onClick={() => { setSearchTerm(""); setFilterStatus("All"); }}
                                    >
                                        <i className="bi bi-arrow-counterclockwise me-2"></i>Reset Filters
                                    </button>

                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};
