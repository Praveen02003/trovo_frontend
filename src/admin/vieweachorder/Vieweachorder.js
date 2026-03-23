import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";
import Swal from "sweetalert2";
import api from "../../axios/Axios";
import { IMAGES_URL } from "../../axios/Imageurl";
import { Adminauth } from "../../function/Adminauth";
import '../vieweachorder/Vieweachorder.css';

/* Status pill class */
const spClass = (s) => {
    switch ((s || '').toLowerCase()) {
        case 'delivered': case 'completed': return 'vsp-delivered';
        case 'pending': return 'vsp-pending';
        case 'shipped': return 'vsp-shipped';
        case 'processed': return 'vsp-processed';
        case 'cancelled': return 'vsp-cancelled';
        default: return 'vsp-default';
    }
};

const fmt = (n) => parseFloat(n || 0).toLocaleString('en-IN');

export const Vieweachorder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const load = async () => {
            const isAdmin = await Adminauth();
            if (!isAdmin) return;
            fetchOrder();
        };
        load();
    }, [id]);

    const fetchOrder = () => {
        api.get(`/getorder/${id}`)
            .then(res => {
                setOrderDetails(res.data);
                setStatus(res.data[0]?.order_status || res.data[0]?.status || '');
            })
            .catch(console.error);
    };

    const handleStatusUpdate = (newStatus) => {
        api.get(`/updateorderstatus/${id}/${newStatus}`)
            .then(() => {
                setStatus(newStatus);
                Swal.fire({
                    icon: 'success', title: 'Status Updated',
                    text: `Order is now ${newStatus}`,
                    timer: 1500, showConfirmButton: false,
                });
            })
            .catch(() => Swal.fire({ icon: 'error', title: 'Error updating status' }));
    };

    if (!orderDetails || orderDetails.length === 0) return (
        <div className="vieworder-loading">
            <div className="vo-spinner"></div>
            <p>Loading Order…</p>
        </div>
    );

    const info = orderDetails[0];
    const subtotal = orderDetails.reduce((a, i) => a + parseFloat(i.price || 0) * parseInt(i.quantity || 1), 0);
    const tax = parseFloat(info.tax || 0);

    return (
        <div className="container-fluid p-0 vieworder-page">
            <div className="d-flex">
                <div className="sidebar-wrap"><Sidebar /></div>

                <div className="flex-grow-1">

                    {/* ── Sticky Action Bar ── */}
                    <div className="vo-action-bar d-print-none">
                        <button className="vo-back-btn" onClick={() => navigate(-1)}>
                            <i className="bi bi-arrow-left"></i> Back to Orders
                        </button>

                        <div className="vo-actions">
                            {/* Status dropdown */}
                            <div className="dropdown">
                                <button className="vo-status-btn dropdown-toggle" data-bs-toggle="dropdown">
                                    Status <span className="vo-current-status">{status}</span>
                                </button>
                                <ul className="dropdown-menu vo-dropdown-menu">
                                    {[
                                        { label: 'Processed', cls: 'processed', si: 'si-processed' },
                                        { label: 'Shipped', cls: 'shipped', si: 'si-shipped' },
                                        { label: 'Delivered', cls: 'delivered', si: 'si-delivered' },
                                        { label: 'Cancelled', cls: 'cancelled', si: 'si-cancelled' },
                                    ].map(({ label, cls, si }) => (
                                        <li key={label}>
                                            <button className={`vo-dropdown-item ${cls}`} onClick={() => handleStatusUpdate(label)}>
                                                <span className={`si ${si}`}></span> {label}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <button className="vo-print-btn" onClick={() => window.print()}>
                                <i className="bi bi-printer"></i> Print
                            </button>
                        </div>
                    </div>

                    {/* ── Two-column layout ── */}
                    <div className="vo-layout">

                        {/* ════ LEFT ════ */}
                        <div className="vo-left">

                            {/* Info Card */}
                            <div className="vo-info-card">

                                {/* Dark header */}
                                <div className="vo-info-header">
                                    <div className="banner-orb"></div>
                                    <div className="vo-customer-block">
                                        <span className="vo-customer-label">Customer Info</span>
                                        <h4 className="vo-customer-name">{info.name || info.customer_name}</h4>
                                        <span className="vo-customer-sub">
                                            User ID: {info.user_id} &nbsp;·&nbsp; Order&nbsp;
                                            <strong style={{ color: 'rgba(255,255,255,.75)' }}>#{info.order_id}</strong>
                                        </span>
                                    </div>
                                    <div className="vo-date-block">
                                        <span className="vo-date-label">Order Date</span>
                                        <span className="vo-date-val">
                                            {new Date(info.created_at).toLocaleDateString('en-GB', {
                                                day: 'numeric', month: 'long', year: 'numeric'
                                            })}
                                        </span>
                                        <span className={`vo-status-pill ${spClass(status)}`}>
                                            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'currentColor', display: 'inline-block' }}></span>
                                            {status}
                                        </span>
                                    </div>
                                </div>

                                {/* Table */}
                                <div className="vo-items-body">
                                    <div className="vo-table-head">
                                        <span>Product</span>
                                        <span>Price</span>
                                        <span>Qty</span>
                                        <span>Tax</span>
                                        <span>Subtotal</span>
                                    </div>

                                    {orderDetails.map((item, idx) => (
                                        <div key={idx} className="vo-item-row">
                                            <div className="vo-item-product">
                                                <img
                                                    src={`${IMAGES_URL}/${item.image}`}
                                                    alt={item.product_name}
                                                    className="vo-item-img"
                                                    loading="lazy"
                                                />
                                                <p className="vo-item-name">{item.product_name}</p>
                                            </div>
                                            <div className="vo-cell price">$ {item.price}</div>
                                            <div className="vo-cell qty">
                                                <span className="vo-qty-badge">{item.quantity}</span>
                                            </div>
                                            <div className="vo-cell">$ {item.tax}</div>
                                            <div className="vo-cell total">
                                                $ {fmt(parseFloat(item.price) * parseInt(item.quantity || 1))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Admin Notes */}
                            <div className="vo-notes-card">
                                <p className="vo-notes-title">
                                    <i className="bi bi-sticky-fill"></i> Admin Notes
                                </p>
                                <p className="vo-notes-text">
                                    Order status was updated to <strong>{status}</strong> on{' '}
                                    {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}.
                                    Please ensure tracking details are updated in the shipping log.
                                </p>
                            </div>
                        </div>

                        {/* ════ RIGHT ════ */}
                        <div className="vo-right">
                            <div className="vo-summary-card">

                                {/* Summary dark header */}
                                <div className="vo-summary-header">
                                    <h6 className="vo-summary-header-title">Order Summary</h6>
                                    <span className="vo-summary-header-sub">#{info.order_id}</span>
                                </div>

                                <div className="vo-summary-body">

                                    {/* Rows */}
                                    <div className="vo-sum-row">
                                        <span>Subtotal</span>
                                        <span className="sv">₹ {fmt(subtotal)}</span>
                                    </div>
                                    <div className="vo-sum-row">
                                        <span>Tax (GST 3%)</span>
                                        <span className="sv">₹ {fmt(tax)}</span>
                                    </div>
                                    <div className="vo-sum-row">
                                        <span>Shipping</span>
                                        <span className="free"><i className="bi bi-check-circle-fill me-1"></i>Free</span>
                                    </div>

                                    <hr className="vo-sum-divider" />

                                    {/* Total */}
                                    <div className="vo-total-box">
                                        <span className="vo-total-label">Grand Total</span>
                                        <span className="vo-total-val">₹ {fmt(info.total_amount)}</span>
                                    </div>

                                    {/* Quick status change */}
                                    <span className="vo-sum-status-label">Update Status</span>
                                    <div className="vo-status-grid">
                                        {[
                                            { label: 'Processed', cls: 'vsb-processed' },
                                            { label: 'Shipped', cls: 'vsb-shipped' },
                                            { label: 'Delivered', cls: 'vsb-delivered' },
                                            { label: 'Cancelled', cls: 'vsb-cancelled' },
                                        ].map(({ label, cls }) => (
                                            <button
                                                key={label}
                                                className={`vo-mini-status-btn ${cls}`}
                                                onClick={() => handleStatusUpdate(label)}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};