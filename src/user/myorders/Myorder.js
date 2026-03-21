import React from 'react';
import { Navbar } from '../navbar/Navbar'; // Adjust path based on your setup
import '../myorders/Myorder.css'
export const Myorder = () => {
    // Current tracking status
    const steps = [
        { label: 'Confirmed', icon: 'bi-check-circle-fill', completed: true },
        { label: 'Shipped', icon: 'bi-truck', completed: true },
        { label: 'In Transit', icon: 'bi-geo-alt-fill', completed: true, active: true },
        { label: 'Delivered', icon: 'bi-house-heart', completed: false }
    ];

    return (
        <div className="bg-light min-vh-100">
            <Navbar />

            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-8">

                        {/* Page Title */}
                        <div className="mb-4">
                            <h4 className="fw-bold mb-1">Order Details</h4>
                            <p className="text-muted small mb-0">Track your order status</p>
                        </div>

                        {/* Main Card */}
                        <div className="card border-0 shadow-sm rounded-4 p-3">

                            {/* Top Info */}
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <small className="text-muted">Order ID</small>
                                    <div className="fw-bold">#TRV-99201-AX</div>
                                </div>

                                <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
                                    In Transit
                                </span>
                            </div>

                            <hr />

                            {/* Product */}
                            <div className="d-flex align-items-center mb-3">
                                <img
                                    src="https://images.unsplash.com"
                                    className="rounded-3 border me-3 order-img"
                                    alt="product"
                                />

                                <div className="flex-grow-1">
                                    <h6 className="fw-bold mb-1">
                                        TROVO Neo Wireless
                                    </h6>
                                    <small className="text-muted">Qty: 1</small>
                                </div>

                                <strong className="text-primary">₹4,599</strong>
                            </div>

                            <hr />

                            {/* Delivery Info */}
                            <div className="mb-3">
                                <small className="text-muted">Delivery Address</small>
                                <div className="fw-bold">Alex M.</div>
                                <div className="text-muted small">
                                    Chennai, Tamil Nadu <br />
                                    +91 98765 43210
                                </div>
                            </div>

                            <div className="mb-3">
                                <small className="text-muted">Expected Delivery</small>
                                <div className="fw-bold">25 March</div>
                            </div>

                            <hr />

                            {/* Actions */}
                            <div className="d-flex gap-2">
                                <button className="btn btn-outline-secondary w-100">
                                    Invoice
                                </button>
                                <button className="btn btn-dark w-100">
                                    Support
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

