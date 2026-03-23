import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";
import { Getloginuser } from "../../function/Getloginuser";
import { maincontext } from "../../App";
import { IMAGES_URL } from "../../axios/Imageurl";
import api from "../../axios/Axios";
import { Adminauth } from "../../function/Adminauth";
import '../orders/Orders.css';

export const Orders = () => {
    const { loginuser, Setloginuser } = useContext(maincontext);
    const [orders, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");

    useEffect(() => {
        const loadData = async () => {
            try {
                const isAdmin = await Adminauth();
                if (!isAdmin) return;
                const res = await api.get("/getallorders");
                setOrders(res.data);
                Setloginuser(Getloginuser());
            } catch (err) {
                console.error("Error fetching orders:", err);
            }
        };
        loadData();
    }, []);

    /* Status pill class */
    const statusClass = (s) => {
        switch ((s || '').toLowerCase()) {
            case 'delivered': case 'completed': return 'sp-delivered';
            case 'pending': return 'sp-pending';
            case 'shipped': return 'sp-shipped';
            case 'processed': return 'sp-processed';
            default: return 'sp-default';
        }
    };

    /* Customer initials */
    const initials = (name = '') =>
        name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

    /* Filtered orders */
    const filtered = orders.filter(order => {
        const matchSearch =
            order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.order_id.toString().includes(searchTerm);
        const matchStatus = filterStatus === 'All' || order.order_status === filterStatus;
        return matchSearch && matchStatus;
    });

    /* Total revenue */
    const totalRevenue = orders.reduce((acc, o) => acc + parseFloat(o.total_amount || 0), 0);

    return (
        <div className="container-fluid p-0 admin-orders-page">
            <div className="d-flex">
                <Sidebar />

                <div className="flex-grow-1 overflow-hidden">

                    {/* ── Top Navbar ── */}
                    <nav className="navbar admin-topbar">
                        <div className="container-fluid p-0">
                            <h5 className="admin-topbar-title">
                                <i className="bi bi-bag-check"></i> Order Management
                            </h5>
                            <div className="admin-topbar-profile ms-auto">
                                <div className="d-none d-sm-block text-end">
                                    <span className="admin-profile-name">{loginuser?.name}</span>
                                    <span className="admin-profile-role">Super Admin</span>
                                </div>
                                <img src={`${IMAGES_URL}/${loginuser?.profileimage}`} alt="Profile" className="admin-profile-img" />
                            </div>
                        </div>
                    </nav>

                    <div className="admin-content">

                        {/* ── Page header ── */}
                        <div className="page-header-row">
                            <div>
                                <h2 className="page-header-title">Order Dashboard</h2>
                                <p className="page-header-sub">Manage and track all customer orders</p>
                            </div>
                            <Link to="/admindashboard" className="dash-link">
                                <i className="bi bi-speedometer2"></i> Dashboard
                            </Link>
                        </div>

                        {/* ── Stat Cards ── */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <div className="stat-card">
                                    <div className="stat-icon purple"><i className="bi bi-cart-check"></i></div>
                                    <div>
                                        <span className="stat-label">Total Orders</span>
                                        <span className="stat-value">{orders.length}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="stat-card" style={{ animationDelay: '0.05s' }}>
                                    <div className="stat-icon green"><i className="bi bi-currency-dollar"></i></div>
                                    <div>
                                        <span className="stat-label">Total Revenue</span>
                                        <span className="stat-value">$ {totalRevenue.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ── Table card ── */}
                        <div className="table-card">

                            <div className="table-card-header">
                                <h5 className="table-card-title">Order History</h5>
                                <div className="d-flex gap-2 flex-wrap">
                                    <div className="filter-search-wrap">
                                        <i className="bi bi-search"></i>
                                        <input
                                            type="text"
                                            className="filter-search-input"
                                            placeholder="ID or customer name…"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                    </div>
                                    <select
                                        className="filter-select"
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
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Customer</th>
                                            <th>Status</th>
                                            <th>Date</th>
                                            <th>Total</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.length > 0 ? filtered.map((order) => (
                                            <tr key={order.order_id}>
                                                <td>
                                                    <span className="order-id-cell">#{order.order_id}</span>
                                                </td>
                                                <td>
                                                    <div className="customer-cell">
                                                        <div className="customer-avatar">
                                                            {initials(order.customer_name)}
                                                        </div>
                                                        <span className="customer-name">{order.customer_name}</span>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`status-pill ${statusClass(order.order_status)}`}>
                                                        <span className="status-dot"></span>
                                                        {order.order_status}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="order-date">
                                                        {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                            day: '2-digit', month: 'short', year: 'numeric'
                                                        })}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="order-amount">
                                                        $ {parseFloat(order.total_amount || 0).toLocaleString()}
                                                    </span>
                                                </td>
                                                <td>
                                                    <Link className="view-btn" to={`/vieworder/${order.order_id}`}>
                                                        <i className="bi bi-eye"></i> View
                                                    </Link>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={6}>
                                                    <div className="orders-empty">
                                                        <div className="orders-empty-icon">
                                                            <i className="bi bi-search"></i>
                                                        </div>
                                                        <h5>No matching orders found</h5>
                                                        <p>
                                                            Your search for <strong>"{searchTerm || filterStatus}"</strong> returned no results.
                                                            Try adjusting your filters.
                                                        </p>
                                                        <button
                                                            className="reset-btn"
                                                            onClick={() => { setSearchTerm(''); setFilterStatus('All'); }}
                                                        >
                                                            <i className="bi bi-arrow-counterclockwise"></i> Reset Filters
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
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