import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import '../payment/Payment.css';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { useParams, useLocation } from 'react-router-dom';

export const Payment = () => {

    const { id } = useParams(); // ✅ get order id from URL
    const location = useLocation(); // ✅ get passed data

    const {
        loginuser,
        Setloginuser
    } = useContext(maincontext);

    const [orderedItems, setOrderedItems] = useState([]);

    useEffect(() => {
        const user = Getloginuser();
        Setloginuser(user);

        // ✅ GET ORDERED ITEMS FROM CHECKOUT
        if (location.state?.orderedItems) {
            setOrderedItems(location.state.orderedItems);
        }

    }, []);

    // ✅ TOTAL CALCULATION
    const subtotal = orderedItems.reduce(
        (acc, item) => acc + (Number(item.price) * (item.quantity || 1)),
        0
    );

    const tax = subtotal * 0.03;
    const total = subtotal + tax;

    return (
        <div className="bg-light min-vh-100">
            <Navbar />

            <div className="container py-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">

                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                            <div className="card-body p-5 text-center">

                                {/* SUCCESS ICON */}
                                <div
                                    className="mb-4 d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 text-success rounded-circle"
                                    style={{ width: '100px', height: '100px' }}
                                >
                                    <i className="bi bi-check-lg display-1"></i>
                                </div>

                                <h2 className="fw-bold text-dark mb-2">
                                    Payment Successful!
                                </h2>

                                <p className="text-secondary mb-4">
                                    Order confirmed for{" "}
                                    <strong>{loginuser?.email}</strong>
                                </p>

                                {/* ORDER DETAILS */}
                                <div className="bg-light rounded-3 p-4 mb-4 text-start">

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Order ID:</span>
                                        <strong>#{id}</strong>
                                    </div>

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Payment Method:</span>
                                        <strong>Cash on Delivery</strong>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <span>Total Paid:</span>
                                        <strong className="text-primary">
                                            ₹{total.toFixed(2)}
                                        </strong>
                                    </div>

                                </div>

                                {/* ORDERED ITEMS */}
                                <div className="text-start mb-4">
                                    <h6 className="fw-bold mb-3">Ordered Items</h6>

                                    {orderedItems.length > 0 ? (
                                        orderedItems.map((item, index) => (
                                            <div key={index} className="d-flex align-items-center mb-3">

                                                <img
                                                    src={`http://localhost:5000/images/${item.image}`}
                                                    alt={item.product_name}
                                                    style={{ width: "50px", height: "50px", objectFit: "cover" }}
                                                    className="me-3 rounded"
                                                />

                                                <div className="flex-grow-1">
                                                    <div className="fw-bold small">
                                                        {item.product_name}
                                                    </div>
                                                    <div className="text-muted extra-small">
                                                        Qty: {item.quantity || 1}
                                                    </div>
                                                </div>

                                                <div className="fw-bold text-primary">
                                                    ₹{item.price}
                                                </div>

                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-muted">No items found</p>
                                    )}
                                </div>

                                {/* BUTTONS */}
                                <div className="d-grid gap-3">
                                    <a href="/orders" className="btn btn-dark">
                                        Track Order
                                    </a>

                                    <a href="/" className="btn btn-outline-secondary">
                                        Back to Shop
                                    </a>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};