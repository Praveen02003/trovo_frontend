import React, { useState } from 'react';
import '../cart/Cart.css'
import { Navbar } from '../navbar/Navbar';
export const Cart = () => {
    const [items, setItems] = useState([
        { id: 1, name: 'Samsung Galaxy Watch 4 Classic', brand: 'Samsung', price: 249.99, qty: 1, img: 'https://images.unsplash.com' },
        { id: 2, name: 'Beats Fit Pro - True Wireless', brand: 'Beats', price: 199.99, qty: 1, img: 'https://images.unsplash.com' }
    ]);

    return (
        <div className="cart-bg py-5">
            <Navbar />
            <div className="container mt-5">
                <div className="row g-4">
                    {/* Left Side: Shopping Cart Table */}
                    <div className="col-lg-8">
                        <div className="bg-white rounded-4 shadow-sm p-4">
                            <h4 className="fw-bold mb-4">Shopping Cart</h4>

                            {/* Table Header */}
                            <div className="row text-muted small fw-bold mb-3 px-2">
                                <div className="col-6 text-uppercase">Product</div>
                                <div className="col-3 text-center text-uppercase">Quantity</div>
                                <div className="col-3 text-end text-uppercase">Price</div>
                            </div>

                            {items.map(item => (
                                <div key={item.id} className="row align-items-center py-3 border-top mx-0">
                                    <div className="col-6 d-flex align-items-center">
                                        <div className="cart-img-box rounded-3 border me-3">
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">{item.name}</h6>
                                            <p className="extra-small text-muted mb-0">{item.brand}</p>
                                        </div>
                                    </div>
                                    <div className="col-3 d-flex justify-content-center">
                                        <div className="qty-box border rounded-pill px-2 py-1">
                                            <button className="btn btn-sm"><i className="bi bi-dash"></i></button>
                                            <span className="mx-2 fw-bold">{item.qty}</span>
                                            <button className="btn btn-sm"><i className="bi bi-plus"></i></button>
                                        </div>
                                    </div>
                                    <div className="col-3 text-end">
                                        <span className="fw-bold fs-5">${item.price}</span>
                                        <button className="btn btn-sm text-danger ms-2"><i className="bi bi-trash"></i></button>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4 pt-3 border-top">
                                <button className="btn btn-danger rounded-pill px-4 fw-bold">Clear Cart</button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Action Cards */}
                    <div className="col-lg-4">
                        {/* Coupon Card */}
                        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                            <h6 className="fw-bold mb-3">Coupon Code</h6>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control bg-light border-0 py-2" placeholder="Enter code" />
                            </div>
                            <button className="btn btn-outline-primary w-100 rounded-pill fw-bold btn-sm py-2">Apply Coupon</button>
                        </div>

                        {/* Order Summary Card */}
                        <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                            <h6 className="fw-bold mb-4">Order Summary</h6>
                            <div className="d-flex justify-content-between mb-2 small">
                                <span className="text-muted">Subtotal</span>
                                <span className="fw-bold">$449.98</span>
                            </div>
                            <div className="d-flex justify-content-between mb-2 small">
                                <span className="text-muted">Shipping</span>
                                <span className="fw-bold text-success">Free</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4 small">
                                <span className="text-muted">Tax</span>
                                <span className="fw-bold">$12.50</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <span className="h5 fw-bold mb-0">Total</span>
                                <span className="h4 fw-bold text-primary mb-0">$462.48</span>
                            </div>
                        </div>

                        {/* Payment Card */}
                        <div className="bg-white rounded-4 shadow-sm p-4">
                            <h6 className="fw-bold mb-3 text-center">Payment Method</h6>
                            <div className="d-flex justify-content-center gap-3 mb-4 opacity-75">
                                <i className="bi bi-paypal fs-3"></i>
                                <i className="bi bi-credit-card fs-3"></i>
                                <i className="bi bi-apple fs-3"></i>
                            </div>
                            <button className="btn btn-primary w-100 rounded-pill fw-bold py-3">Check Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
