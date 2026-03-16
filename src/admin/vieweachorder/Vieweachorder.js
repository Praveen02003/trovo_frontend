import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export const Vieweachorder = () => {
    const order = {
        id: 101,
        customer: "John Doe",
        email: "john@example.com",
        phone: "+91 9876543210",
        address: "123 Main St, Madurai, India",
        products: [
            { name: "Product A", qty: 2, price: "$25" },
            { name: "Product B", qty: 1, price: "$40" },
        ],
        total: "$90",
        status: "Pending",
        date: "2026-03-10"
    };

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

                {/* Order Details */}
                <div className="container-fluid mt-4">
                    <h3 className="fw-bold mb-3">View Order #{order.id}</h3>

                    <div className="card mb-4">
                        <div className="card-header fw-bold bg-secondary text-white">Customer Information</div>
                        <div className="card-body fw-bold">
                            <p><strong>Name:</strong> {order.customer}</p>
                            <p><strong>Email:</strong> {order.email}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>Address:</strong> {order.address}</p>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header fw-bold bg-secondary text-white">Products Ordered</div>
                        <div className="card-body">
                            <table className="table table-striped table-bordered table-hover text-center fw-bold">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Product Name</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.products.map((prod, index) => (
                                        <tr key={index}>
                                            <td>{prod.name}</td>
                                            <td>{prod.qty}</td>
                                            <td>{prod.price}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="fw-bold text-end mt-2">Total: {order.total}</p>
                        </div>
                    </div>

                    <div className="row mb-4">
                        {/* Status Column */}
                        <div className="col-md-6">
                            <div className="card h-100">
                                <div className="card-header fw-bold bg-secondary text-white">Order Status</div>
                                <div className="card-body d-flex justify-content-between align-items-center fw-bold">
                                    <div>
                                        <p className="mb-2"><strong>Status:</strong></p>
                                        <select
                                            className={`form-select fw-bold ${order.status === "Completed" ? "bg-success text-white" : order.status === "Pending" ? "bg-warning text-dark" : "bg-info text-dark"}`}
                                            defaultValue={order.status}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p className="mb-2"><strong>Order Date:</strong></p>
                                        <span className="text-muted">{order.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Optional Action Column (like Save button) */}
                        <div className="col-md-6 d-flex align-items-center justify-content-center mt-3 mt-md-0">
                            <button className="btn btn-primary fw-bold">
                                <i className="bi bi-check-circle me-1"></i>Update Status
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};