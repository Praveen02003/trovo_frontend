import React, { useState } from 'react';
import { Navbar } from '../navbar/Navbar'; // Adjust path as needed
import '../payment/Payment.css';



export const Payment = () => {
    return (
        <div className="bg-light min-vh-100">
            {/* Using your existing Navbar */}
            <Navbar />

            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        {/* Main Success Card */}
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="card-body p-5 text-center">

                                {/* Animated Success Icon */}
                                <div className="mb-4 d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle"
                                    style={{ width: '100px', height: '100px' }}>
                                    <i className="bi bi-check-lg display-1"></i>
                                </div>

                                <h2 className="fw-bold text-dark mb-2">Payment Successful!</h2>
                                <p className="text-secondary mb-4">
                                    Your order has been confirmed. A receipt has been sent to <strong>alex.m@example.com</strong>
                                </p>

                                {/* Order Brief Info */}
                                <div className="bg-light rounded-3 p-4 mb-4 text-start">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted small">Order Number:</span>
                                        <span className="fw-bold small">#TRV-99201-AX</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted small">Payment Method:</span>
                                        <span className="fw-bold small text-uppercase">Visa ending in 4242</span>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <span className="text-muted small">Total Paid:</span>
                                        <span className="fw-bold text-primary">₹2,679.00</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="d-grid gap-3">
                                    <a href="/orders" className="btn btn-dark btn-lg rounded-3 fw-bold">
                                        Track Your Order
                                    </a>
                                    <a href="/" className="btn btn-outline-secondary btn-lg rounded-3 border-2 fw-bold">
                                        Back to Shop
                                    </a>
                                </div>

                                <p className="mt-4 text-muted extra-small">
                                    Need help? <a href="#" className="text-decoration-none text-primary">Contact Trovo Support</a>
                                </p>
                            </div>
                        </div>

                        {/* Extra: Quick Suggestion */}
                        <div className="mt-4 text-center">
                            <p className="text-muted small">Share your purchase</p>
                            <div className="d-flex justify-content-center gap-3">
                                <button className="btn btn-sm btn-light border rounded-circle"><i className="bi bi-instagram"></i></button>
                                <button className="btn btn-sm btn-light border rounded-circle"><i className="bi bi-twitter-x"></i></button>
                                <button className="btn btn-sm btn-light border rounded-circle"><i className="bi bi-facebook"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



