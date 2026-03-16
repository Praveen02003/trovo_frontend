import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Orders = () => {
    const orders = [
        { id: 101, customer: "John Doe", product: "Product A", qty: 2, total: "$50", status: "Pending", date: "2026-03-10" },
        { id: 102, customer: "Jane Smith", product: "Product B", qty: 1, total: "$40", status: "Completed", date: "2026-03-12" },
        { id: 103, customer: "Mike Johnson", product: "Product C", qty: 3, total: "$45", status: "Shipped", date: "2026-03-14" },
    ];

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <div className="bg-dark text-white vh-100 p-3" style={{ width: "250px" }}>
                <div className="text-center mb-4">
                    <i className="bi bi-lightning-fill fs-1 text-warning"></i>
                    <h3 className="mt-2 fw-bold">Trovo Admin</h3>
                </div>
                <ul className="nav flex-column fw-bold">
                    <li className="nav-item mb-2">
                        <a href="#" className="nav-link text-white"><i className="bi bi-speedometer2 me-2"></i>Dashboard</a>
                    </li>
                    <li className="nav-item mb-2">
                        <a href="#" className="nav-link text-white"><i className="bi bi-box-seam me-2"></i>Products</a>
                    </li>
                    <li className="nav-item mb-2">
                        <a href="#" className="nav-link text-white"><i className="bi bi-bag-check me-2"></i>Orders</a>
                    </li>
                    <li className="nav-item mb-2">
                        <a href="#" className="nav-link text-white"><i className="bi bi-people me-2"></i>Users</a>
                    </li>
                    <li className="nav-item mb-2">
                        <a href="#" className="nav-link text-white"><i className="bi bi-gear me-2"></i>Settings</a>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1">
                {/* Top Navbar */}
                <nav className="navbar navbar-expand-lg navbar-light bg-light px-4">
                    <a className="navbar-brand fw-bold" href="#">Trovo Admin</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle d-flex align-items-center" href="#" role="button" data-bs-toggle="dropdown">
                                    <img
                                        src="https://i.pravatar.cc/40"
                                        alt="Avatar"
                                        className="rounded-circle me-2"
                                        width="40"
                                        height="40"
                                    />
                                    <span className="fw-bold">Admin</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-end">
                                    <li><a className="dropdown-item fw-bold" href="#">My Profile</a></li>
                                    <li><a className="dropdown-item fw-bold" href="#">Settings</a></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><a className="dropdown-item fw-bold" href="#">Logout</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>

                <div className="container-fluid mt-4">
                    <h3 className="fw-bold mb-3">All Orders</h3>

                    <div className="card">
                        <div className="card-body">
                            <table className="table table-striped table-bordered table-hover align-middle text-center fw-bold">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Status</th>
                                        <th>Date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>{order.id}</td>
                                            <td>{order.customer}</td>
                                            <td>{order.product}</td>
                                            <td>{order.qty}</td>
                                            <td>{order.total}</td>
                                            <td>{order.status}</td>
                                            <td>{order.date}</td>
                                            <td>
                                                <button className="btn btn-sm btn-success me-2 fw-bold">
                                                    <i className="bi bi-pencil-square me-1"></i>Update
                                                </button>
                                                <button className="btn btn-sm btn-danger fw-bold">
                                                    <i className="bi bi-trash me-1"></i>Delete
                                                </button>
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
    );
};