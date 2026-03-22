import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { Navbar } from '../navbar/Navbar';
import '../orderhistory/Orderhistory.css';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { Deleteorder } from '../../function/Deleteorder'; // Correct import
import api from '../../axios/Axios';
import { IMAGES_URL } from '../../axios/Imageurl';

export const Orderhistory = () => {
    const { loginuser, Setloginuser } = useContext(maincontext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const user = Getloginuser();
        Setloginuser(user);
        if (user?.user_id) fetchOrders(user.user_id);
    }, []);

    const fetchOrders = async (userId) => {
        try {
            const res = await api.get(`/getorders/${userId}`);
            const grouped = {};
            const data = Array.isArray(res.data) ? res.data : [];

            data.forEach(row => {
                if (!grouped[row.order_id]) {
                    grouped[row.order_id] = {
                        order_id: row.order_id,
                        total_amount: row.total_amount,
                        order_status: row.order_status,
                        created_at: row.created_at,
                        items: []
                    };
                }
                grouped[row.order_id].items.push({
                    product_name: row.product_name,
                    image: row.image,
                    quantity: row.quantity,
                    price: row.price
                });
            });
            setOrders(Object.values(grouped).reverse()); // Newest first
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Use the common Deleteorder function
    const handleDeleteOrder = (order) => {
        Deleteorder({
            order,
            allowedStatuses: ['Placed', 'Shipped', 'Processed'],
            onSuccess: () => setOrders(prev => prev.filter(o => o.order_id !== order.order_id))
        });
    };
    const getStatusStyles = (status) => {
        switch (status) {
            case 'Placed': return { bg: '#fff4e5', color: '#b76e00' };
            case 'Shipped': return { bg: '#e5f6fd', color: '#014361' };
            case 'Delivered': return { bg: '#edf7ed', color: '#1e4620' };
            default: return { bg: '#f5f5f5', color: '#616161' };
        }
    };

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-white">
            <div className="spinner-border text-dark" role="status"></div>
        </div>
    );

    return (
        <div className="bg-light min-vh-100 pb-5">
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-9">

                        <div className="d-flex align-items-end justify-content-between mb-4">
                            <div>
                                <h2 className="fw-bold mb-1">Your Orders</h2>
                                <p className="text-muted mb-0 small uppercase tracking-wider">Review your past purchases and tracking</p>
                            </div>
                            <button onClick={() => navigate('/')} className="btn btn-link text-dark text-decoration-none fw-bold p-0">
                                <i className="bi bi-arrow-left me-2"></i>Back to Shop
                            </button>
                        </div>

                        {orders.length === 0 ? (
                            <div className="card border-0 shadow-sm p-5 text-center rounded-4">
                                <i className="bi bi-bag-x text-muted display-4 mb-3"></i>
                                <h5>No orders found yet</h5>
                                <button onClick={() => navigate('/')} className="btn btn-dark mt-3 px-4 rounded-pill">Start Shopping</button>
                            </div>
                        ) : (
                            <div className="d-grid gap-4">
                                {orders.map(order => {
                                    const status = getStatusStyles(order.order_status);
                                    return (
                                        <div key={order.order_id} className="card border-0 shadow-sm rounded-4 overflow-hidden order-card-hover">

                                            {/* HEADER SECTION */}
                                            <div className="bg-white px-4 py-3 border-bottom border-light">
                                                <div className="row align-items-center">
                                                    <div className="col-6 col-md-3">
                                                        <label className="text-muted tiny-label d-block text-uppercase">Order ID</label>
                                                        <span className="fw-bold">#{order.order_id}</span>
                                                    </div>
                                                    <div className="col-6 col-md-3">
                                                        <label className="text-muted tiny-label d-block text-uppercase">Date Placed</label>
                                                        <span className="fw-medium">{new Date(order.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                                    </div>
                                                    <div className="col-6 col-md-3 mt-3 mt-md-0">
                                                        <label className="text-muted tiny-label d-block text-uppercase">Total Amount</label>
                                                        <span className="fw-bold text-dark">₹{Number(order.total_amount).toLocaleString()}</span>
                                                    </div>
                                                    <div className="col-6 col-md-3 mt-3 mt-md-0 text-md-end">
                                                        <span className="px-3 py-1 rounded-pill small fw-bold" style={{ backgroundColor: status.bg, color: status.color, fontSize: '0.75rem' }}>
                                                            {order.order_status.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* BODY SECTION */}
                                            <div className="card-body p-4 bg-white">
                                                <div className="row align-items-center">
                                                    <div className="col-md-8">
                                                        <div className="d-flex align-items-center">
                                                            {/* Stacked Images for multiple items */}
                                                            <div className="position-relative me-4" style={{ height: '70px', width: '85px' }}>
                                                                {order.items.slice(0, 3).map((item, idx) => (
                                                                    <img
                                                                        key={idx}
                                                                        src={`${IMAGES_URL}/${item.image}`}
                                                                        className="rounded shadow-sm border bg-white position-absolute"
                                                                        style={{
                                                                            width: '60px',
                                                                            height: '60px',
                                                                            objectFit: 'cover',
                                                                            left: `${idx * 12}px`,
                                                                            zIndex: 3 - idx,
                                                                            top: `${idx * 2}px`
                                                                        }}
                                                                        alt={item.product_name}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <div>
                                                                <h6 className="mb-1 fw-bold text-truncate" style={{ maxWidth: '250px' }}>
                                                                    {order.items[0].product_name}
                                                                    {order.items.length > 1 && <span className="text-muted small"> +{order.items.length - 1} more</span>}
                                                                </h6>
                                                                <p className="text-muted small mb-0">Total items: {order.items.reduce((acc, curr) => acc + curr.quantity, 0)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-4 text-md-end mt-3 mt-md-0 d-flex justify-content-end gap-2 flex-wrap">
                                                        <button
                                                            className="btn btn-outline-dark btn-sm rounded-pill px-4 fw-bold"
                                                            onClick={() => navigate(`/orderdetails/${order.order_id}`)}
                                                        >
                                                            View Details
                                                        </button>
                                                        <button
                                                            className="btn btn-dark btn-sm rounded-pill px-4 fw-bold shadow-sm"
                                                            onClick={() => navigate(`/orderdetails/${order.order_id}`)}
                                                        >
                                                            Invoice
                                                        </button>

                                                        {/* Delete button using common Deleteorder */}
                                                        {['Placed', 'Shipped', 'Processed'].includes(order.order_status) && (
                                                            <button
                                                                className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm"
                                                                onClick={() => handleDeleteOrder(order)}
                                                            >
                                                                Delete
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};