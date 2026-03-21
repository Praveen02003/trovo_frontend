import React from 'react';
import { Navbar } from '../navbar/Navbar'; // Adjust path
import '../orderhistory/Orderhistory.css'
export const Orderhistory = () => {
    // Mock data for the orders
    const orders = [
        { id: 'TRV-99201', date: 'Oct 12, 2023', total: '₹4,599', status: 'Delivered', items: 2, img: 'https://images.unsplash.com' },
        { id: 'TRV-88154', date: 'Sep 28, 2023', total: '₹1,250', status: 'Shipped', items: 1, img: 'https://images.unsplash.com' },
        { id: 'TRV-77102', date: 'Aug 15, 2023', total: '₹2,679', status: 'Cancelled', items: 3, img: 'https://images.unsplash.com' }
    ];

    const getStatusClass = (status) => {
        switch (status) {
            case 'Delivered': return 'bg-success-subtle text-success border-success-subtle';
            case 'Shipped': return 'bg-primary-subtle text-primary border-primary-subtle';
            case 'Cancelled': return 'bg-danger-subtle text-danger border-danger-subtle';
            default: return 'bg-secondary-subtle text-secondary';
        }
    };

    return (
        <div className="bg-light min-vh-100">
            <Navbar />

            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-lg-10">

                        {/* Header */}
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
                            <div>
                                <h3 className="fw-bold mb-1">Order History</h3>
                                <p className="text-muted small mb-0">Track and manage your orders</p>
                            </div>

                            <select className="form-select mt-3 mt-md-0 w-auto shadow-sm">
                                <option>Last 3 months</option>
                                <option>2023</option>
                                <option>2022</option>
                            </select>
                        </div>

                        {/* Orders */}
                        <div className="d-grid gap-3">
                            {orders.map((order) => (
                                <div key={order.id} className="card border-0 shadow-sm rounded-4">

                                    {/* Header */}
                                    <div className="card-header bg-white border-0 pb-0">
                                        <div className="row text-center text-md-start">
                                            <div className="col-md-3">
                                                <small className="text-muted d-block">Order ID</small>
                                                <strong>#{order.id}</strong>
                                            </div>

                                            <div className="col-md-3">
                                                <small className="text-muted d-block">Date</small>
                                                <span>{order.date}</span>
                                            </div>

                                            <div className="col-md-3">
                                                <small className="text-muted d-block">Total</small>
                                                <strong className="text-primary">{order.total}</strong>
                                            </div>

                                            <div className="col-md-3 text-md-end mt-2 mt-md-0">
                                                <span className={`badge rounded-pill px-3 py-2 ${getStatusClass(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="card-body pt-3">
                                        <div className="d-flex align-items-center flex-wrap gap-3">

                                            <img
                                                src={order.img}
                                                className="rounded-3 border order-img"
                                                alt="product"
                                            />

                                            <div className="flex-grow-1">
                                                <h6 className="fw-bold mb-1">
                                                    Items ({order.items})
                                                </h6>
                                                <p className="text-muted small mb-0">
                                                    Standard delivery • 3–5 days
                                                </p>
                                            </div>

                                            {/* Desktop Buttons */}
                                            <div className="d-none d-md-flex gap-2">
                                                <button className="btn btn-outline-secondary btn-sm rounded-pill">
                                                    View
                                                </button>
                                                <button className="btn btn-dark btn-sm rounded-pill">
                                                    Reorder
                                                </button>
                                            </div>
                                        </div>

                                        {/* Mobile Buttons */}
                                        <div className="d-flex d-md-none gap-2 mt-3">
                                            <button className="btn btn-outline-secondary w-100 btn-sm">
                                                View
                                            </button>
                                            <button className="btn btn-dark w-100 btn-sm">
                                                Reorder
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

