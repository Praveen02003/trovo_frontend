import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import '../orderhistory/Orderhistory.css';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { Deleteorder } from '../../function/Deleteorder';
import api from '../../axios/Axios';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';

export const Orderhistory = () => {
    const { loginuser, Setloginuser } = useContext(maincontext);
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const isUser = await Userauth();
            if (!isUser) return;
            const user = Getloginuser();
            Setloginuser(user);
            if (user?.user_id) await fetchOrders(user.user_id);
        };
        loadData();
    }, []);

    const fetchOrders = async (userId) => {
        try {
            const res = await api.get(`/getorders/${userId}`);
            const data = Array.isArray(res.data) ? res.data : [];
            const grouped = {};
            data.forEach(row => {
                if (!grouped[row.order_id]) {
                    grouped[row.order_id] = {
                        order_id: row.order_id,
                        total_amount: row.total_amount,
                        order_status: row.order_status,
                        created_at: row.created_at,
                        items: [],
                    };
                }
                grouped[row.order_id].items.push({
                    product_name: row.product_name,
                    image: row.image,
                    quantity: row.quantity,
                    price: row.price,
                });
            });
            setOrders(Object.values(grouped).reverse());
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteOrder = (order) => {
        Deleteorder({
            order,
            allowedStatuses: ['Placed', 'Shipped', 'Processed'],
            onSuccess: () => setOrders(prev => prev.filter(o => o.order_id !== order.order_id)),
        });
    };

    /* Status pill class */
    const statusClass = (s) => {
        switch (s) {
            case 'Placed': return 'status-placed';
            case 'Shipped': return 'status-shipped';
            case 'Delivered': return 'status-delivered';
            case 'Processed': return 'status-processed';
            default: return 'status-default';
        }
    };

    /* Loading */
    if (loading) return (
        <div className="oh-loading">
            <div className="oh-spinner"></div>
            <p>Loading Orders…</p>
        </div>
    );

    return (
        <div className="orderhistory-page">
            <Navbar />

            <div className="container py-4 mt-2">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-xl-9">

                        {/* ── Header ── */}
                        <div className="oh-header">
                            <div>
                                <h2 className="oh-title">
                                    Your Orders
                                    <span className="oh-count-badge">{orders.length}</span>
                                </h2>
                                <p className="oh-sub">Review your past purchases and track deliveries</p>
                            </div>
                            <button className="oh-back-btn" onClick={() => navigate('/')}>
                                <i className="bi bi-arrow-left"></i> Back to Shop
                            </button>
                        </div>

                        {/* ── Empty ── */}
                        {orders.length === 0 ? (
                            <div className="oh-empty">
                                <i className="bi bi-bag-x oh-empty-icon"></i>
                                <h5>No orders yet</h5>
                                <p>Looks like you haven't placed any orders. Start shopping!</p>
                                <button className="oh-empty-btn" onClick={() => navigate('/')}>
                                    <i className="bi bi-bag"></i> Start Shopping
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex flex-column gap-3">
                                {orders.map(order => {
                                    const totalQty = order.items.reduce((a, i) => a + i.quantity, 0);
                                    const canDelete = ['Placed', 'Shipped', 'Processed'].includes(order.order_status);

                                    return (
                                        <div key={order.order_id} className="order-card">

                                            {/* ── Card Header ── */}
                                            <div className="order-card-header">
                                                <div>
                                                    <span className="oh-field-label">Order ID</span>
                                                    <span className="order-id-pill">
                                                        <i className="bi bi-hash"></i>{order.order_id}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="oh-field-label">Date Placed</span>
                                                    <span className="oh-field-val">
                                                        {new Date(order.created_at).toLocaleDateString('en-GB', {
                                                            day: 'numeric', month: 'short', year: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="oh-field-label">Total</span>
                                                    <span className="oh-field-val accent">
                                                        ₹{Number(order.total_amount).toLocaleString('en-IN')}
                                                    </span>
                                                </div>
                                                <div>
                                                    <span className="oh-field-label">Status</span>
                                                    <span className={`status-pill ${statusClass(order.order_status)}`}>
                                                        <span className="status-dot"></span>
                                                        {order.order_status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* ── Card Body ── */}
                                            <div className="order-card-body">

                                                {/* Product preview */}
                                                <div className="d-flex align-items-center gap-4 flex-grow-1 min-w-0">
                                                    <div className="order-img-stack">
                                                        {order.items.slice(0, 3).map((item, idx) => (
                                                            <img
                                                                key={idx}
                                                                src={`${IMAGES_URL}/${item.image}`}
                                                                alt={item.product_name}
                                                                className="order-stack-img"
                                                                loading="lazy"
                                                                style={{ zIndex: 3 - idx }}
                                                            />
                                                        ))}
                                                    </div>

                                                    <div className="order-prod-info">
                                                        <p className="order-prod-name">
                                                            {order.items[0].product_name}
                                                            {order.items.length > 1 && (
                                                                <span className="order-more-tag">
                                                                    +{order.items.length - 1} more
                                                                </span>
                                                            )}
                                                        </p>
                                                        <p className="order-items-count">
                                                            <i className="bi bi-box-seam"></i>
                                                            {totalQty} item{totalQty > 1 ? 's' : ''} in this order
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Actions */}
                                                <div className="order-actions">
                                                    <button
                                                        className="oh-btn oh-btn-outline"
                                                        onClick={() => navigate(`/orderdetails/${order.order_id}`)}
                                                    >
                                                        <i className="bi bi-eye"></i> Details
                                                    </button>
                                                    <button
                                                        className="oh-btn oh-btn-dark"
                                                        onClick={() => navigate(`/orderdetails/${order.order_id}`)}
                                                    >
                                                        <i className="bi bi-receipt"></i> Invoice
                                                    </button>
                                                    {canDelete && (
                                                        <button
                                                            className="oh-btn oh-btn-danger"
                                                            onClick={() => handleDeleteOrder(order)}
                                                        >
                                                            <i className="bi bi-trash3"></i> Cancel
                                                        </button>
                                                    )}
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