import React from 'react';
import '../checkout/Checkout.css'
import { Navbar } from '../navbar/Navbar';

export const Checkout = () => {
    const cartItems = [
        { id: 1, name: 'Tempting Tasty Cat Treats', desc: 'NATURAL SALMON FLAVOR', price: 5.00, qty: 1 },
        { id: 2, name: 'Indoor Adult Jelly Mix', desc: 'POWER EDITION PACK', price: 27.95, qty: 1 },
        { id: 3, name: 'Shoulder Wool Salmon', desc: 'FRESH ARCTIC CATCH', price: 86.22, qty: 1 }
    ];

    return (
        <div className="checkout-page">
            <Navbar />

            <div className="container mt-5 pt-5">
                {/* Header Section - Always at the top */}
                <div className="row mb-4">
                    <div className="col-12">
                        <div className="d-flex justify-content-between align-items-end border-bottom pb-3">
                            <div>
                                <h1 className="fw-bold m-0">Review Order</h1>
                                <p className="text-muted small mb-0">Please confirm your items before proceeding to payment.</p>
                            </div>
                            <span className="badge bg-dark rounded-pill px-3 py-2">3 Products</span>
                        </div>
                    </div>
                </div>

                <div className="row g-4">
                    {/* LEFT: Separate Product Cards */}
                    <div className="col-lg-7">
                        {cartItems.map(item => (
                            <div key={item.id} className="item-card-separate mb-3 shadow-sm d-flex align-items-center p-3">
                                <div className="product-img-placeholder me-3">
                                    <i className="bi bi-box-seam text-muted"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="fw-bold mb-0">{item.name}</h6>
                                    <p className="extra-small text-muted mb-0">{item.desc}</p>
                                </div>
                                <div className="text-end ps-3">
                                    <div className="fw-bold text-primary">${item.price.toFixed(2)}</div>
                                    <div className="text-muted extra-small">QTY: {item.qty}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* RIGHT: Floating Summary Card */}
                    <div className="col-lg-5 col-xl-4 ms-auto">
                        <div className="summary-floating-card p-4 shadow-lg border-0 sticky-top" style={{ top: '100px' }}>
                            <h4 className="fw-bold mb-4">Order Summary</h4>

                            <div className="d-flex justify-content-between mb-2 small text-muted">
                                <span>Subtotal</span>
                                <span className="fw-bold text-dark">$119.17</span>
                            </div>
                            <div className="d-flex justify-content-between mb-4 small text-muted">
                                <span>Shipping</span>
                                <span className="text-success fw-bold">FREE</span>
                            </div>

                            <div className="total-box-accent p-3 d-flex justify-content-between align-items-center mb-4">
                                <div>
                                    <p className="extra-small text-muted mb-0 fw-bold">GRAND TOTAL</p>
                                    <h2 className="fw-bold m-0">$119.17</h2>
                                </div>
                                <span className="badge bg-light text-muted border py-2 px-3">USD</span>
                            </div>

                            <button className="btn btn-primary w-100 py-3 rounded-pill fw-bold shadow">
                                CONFIRM & PAY <i className="bi bi-chevron-right ms-2"></i>
                            </button>

                            <p className="text-center extra-small text-muted mt-4 mb-0">
                                <i className="bi bi-shield-lock-fill me-1"></i> SSL SECURE CHECKOUT
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



