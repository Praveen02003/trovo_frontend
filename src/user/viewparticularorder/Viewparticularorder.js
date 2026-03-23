import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import api from '../../axios/Axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Deleteorder } from '../../function/Deleteorder';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';
import '../viewparticularorder/Viewparticularorder.css';

export const Viewparticularorder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const pdfRef = useRef();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const isUser = await Userauth();
            if (!isUser) return;
            if (orderId) await fetchOrder();
        };
        loadData();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const res = await api.get(`/getorder/${orderId}`);
            if (!res.data || res.data.length === 0) return;
            const items = res.data;
            const subtotal = items.reduce((acc, i) => acc + Number(i.price) * Number(i.quantity), 0);
            const tax = Number(items[0]?.tax || 0);
            const total = Number(items[0]?.total_amount || subtotal + tax);
            setOrder({
                order_id: items[0].order_id,
                created_at: items[0].created_at,
                status: items[0].order_status || 'Placed',
                subtotal, tax, total_amount: total, items,
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = async () => {
        const canvas = await html2canvas(pdfRef.current, { scale: 2, useCORS: true, backgroundColor: '#fff' });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const w = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 'PNG', 0, 0, w, (canvas.height * w) / canvas.width);
        pdf.save(`Invoice_${order.order_id}.pdf`);
    };

    const handleDeleteOrder = () => {
        Deleteorder({
            order,
            allowedStatuses: ['Placed', 'Shipped', 'Processed'],
            onSuccess: () => navigate(-1),
        });
    };

    /* Status pill class */
    const spClass = (s) => {
        switch (s) {
            case 'Delivered': return 'isp-delivered';
            case 'Placed': return 'isp-placed';
            case 'Shipped': return 'isp-shipped';
            default: return 'isp-default';
        }
    };

    const fmt = (n) => Number(n).toLocaleString('en-IN');

    /* Loading */
    if (loading) return (
        <div className="invoice-loading">
            <div className="inv-spinner"></div>
        </div>
    );

    return (
        <div className="invoice-page">
            <Navbar />

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-9 col-xl-8">

                        {/* ── Action Bar ── */}
                        <div className="inv-action-bar no-print">
                            <button className="inv-back-btn" onClick={() => navigate(-1)}>
                                <i className="bi bi-arrow-left"></i> Back
                            </button>
                            <div className="inv-actions">
                                <button className="inv-btn-pdf" onClick={downloadPDF}>
                                    <i className="bi bi-file-earmark-pdf"></i> Download Invoice
                                </button>
                                {['Placed', 'Shipped', 'Processed'].includes(order?.status) && (
                                    <button className="inv-btn-delete" onClick={handleDeleteOrder}>
                                        <i className="bi bi-x-circle"></i> Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* ── Invoice Card ── */}
                        <div className="invoice-card" ref={pdfRef}>

                            {/* Dark Banner Header */}
                            <div className="invoice-banner">
                                <div className="inv-brand">
                                    <h2 className="inv-brand-name">TROVO</h2>
                                    <p className="inv-brand-sub">Official Purchase Receipt</p>
                                </div>
                                <div className="inv-header-right">
                                    <div>
                                        <span className={`inv-status-pill ${spClass(order?.status)}`}>
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', display: 'inline-block', flexShrink: 0 }}></span>
                                            {order?.status}
                                        </span>
                                    </div>
                                    <div className="inv-order-id">
                                        Order <strong>#{order?.order_id}</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="invoice-body">

                                {/* Meta Grid */}
                                <div className="inv-meta-grid">
                                    <div className="inv-meta-block">
                                        <span className="inv-meta-label">Billed To</span>
                                        <span className="inv-meta-val">
                                            Customer #{order?.items[0]?.user_id || 'N/A'}
                                        </span>
                                        <span className="inv-meta-sub">Digital Transaction · Cash on Delivery</span>
                                    </div>
                                    <div className="inv-meta-block right">
                                        <span className="inv-meta-label">Order Date</span>
                                        <span className="inv-meta-val">
                                            {new Date(order?.created_at).toLocaleDateString('en-GB', {
                                                day: '2-digit', month: 'long', year: 'numeric'
                                            })}
                                        </span>
                                        <span className="inv-meta-sub">
                                            {new Date(order?.created_at).toLocaleTimeString('en-IN', {
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                </div>

                                {/* Table Header */}
                                <div className="inv-table-header">
                                    <span>Item Description</span>
                                    <span>Qty</span>
                                    <span>Total</span>
                                </div>

                                {/* Items */}
                                {order?.items.map((item, idx) => (
                                    <div key={idx} className="inv-item-row">
                                        {/* Product */}
                                        <div className="inv-item-product">
                                            <img
                                                crossOrigin="anonymous"
                                                src={`${IMAGES_URL}/${item.image}`}
                                                alt={item.product_name}
                                                className="inv-item-img"
                                                loading="lazy"
                                            />
                                            <div>
                                                <p className="inv-item-name">{item.product_name}</p>
                                                <p className="inv-item-unit-price">₹{fmt(item.price)} / unit</p>
                                            </div>
                                        </div>

                                        {/* Qty */}
                                        <div className="inv-item-qty">
                                            <span className="inv-qty-pill">{item.quantity}</span>
                                        </div>

                                        {/* Total */}
                                        <div className="inv-item-total">
                                            ₹{fmt(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}

                                {/* Summary */}
                                <div className="inv-summary-wrap">
                                    <div className="inv-summary-box">
                                        <div className="inv-sum-row">
                                            <span>Subtotal</span>
                                            <span className="sv">₹{fmt(order?.subtotal)}</span>
                                        </div>
                                        <div className="inv-sum-row">
                                            <span>Tax (GST)</span>
                                            <span className="sv">₹{fmt(order?.tax)}</span>
                                        </div>
                                        <div className="inv-sum-row">
                                            <span>Shipping</span>
                                            <span style={{ color: 'var(--green)', fontWeight: 700 }}>
                                                <i className="bi bi-check-circle-fill me-1"></i>Free
                                            </span>
                                        </div>
                                        <hr className="inv-sum-divider" />
                                        <div className="inv-total-row">
                                            <span className="inv-total-label">Grand Total</span>
                                            <span className="inv-total-val">₹{fmt(order?.total_amount)}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Footer note */}
                                <div className="inv-footer-note">
                                    <p>Thank you for shopping with <strong>TROVO</strong>.</p>
                                    <p className="tiny">This is a computer-generated invoice and does not require a physical signature.</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};