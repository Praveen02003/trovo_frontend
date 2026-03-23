import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { Navbar } from '../navbar/Navbar';
import api from '../../axios/Axios';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import '../myorders/Myorder.css';
import { Deleteorder } from '../../function/Deleteorder';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';

const IMG_URL = `${IMAGES_URL}/`;

export const Myorder = () => {
    const navigate = useNavigate();
    const pdfRef = useRef();
    const { Setloginuser } = useContext(maincontext);

    const [latestOrder, setLatestOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    /* ── Fetch ── */
    const fetchOrders = useCallback(async (userId) => {
        try {
            const res = await api.get(`/getorders/${userId}`);
            if (!res.data || res.data.length === 0) { setLatestOrder(null); return; }

            const sorted = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            const lastOrderId = sorted[0].order_id;
            const items = sorted.filter(i => i.order_id === lastOrderId);

            setLatestOrder({
                order_id: lastOrderId,
                subtotal: Number(items[0].subtotal || 0),
                tax: Number(items[0].tax || 0),
                total_amount: Number(items[0].total_amount || 0),
                created_at: items[0].created_at,
                status: items[0].order_status || 'Placed',
                items: items.map(i => ({
                    product_name: i.product_name,
                    image: i.image,
                    quantity: Number(i.quantity),
                    price: Number(i.price),
                })),
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const loadData = async () => {
            const isUser = await Userauth();
            if (!isUser) return;
            const user = Getloginuser();
            Setloginuser(user);
            await fetchOrders(user.user_id);
        };
        loadData();
    }, [fetchOrders, Setloginuser]);

    /* ── PDF ── */
    const downloadPDF = async () => {
        const canvas = await html2canvas(pdfRef.current, { scale: 2, useCORS: true, backgroundColor: '#faf9ff' });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const w = pdf.internal.pageSize.getWidth();
        pdf.addImage(imgData, 'PNG', 0, 0, w, (canvas.height * w) / canvas.width);
        pdf.save(`Invoice_${latestOrder.order_id}.pdf`);
    };

    /* ── Stepper ── */
    const steps = ['Placed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentStep = latestOrder ? steps.indexOf(latestOrder.status) : 0;

    /* ── Status pill class ── */
    const spClass = (s) => {
        switch (s) {
            case 'Placed': return 'sp-placed';
            case 'Shipped': return 'sp-shipped';
            case 'Delivered': return 'sp-delivered';
            default: return 'sp-default';
        }
    };

    const fmt = (n) => Number(n).toLocaleString('en-IN');

    /* ── Loading ── */
    if (loading) return (
        <div className="loader-container">
            <div className="oh-spinner"></div>
        </div>
    );

    return (
        <div className="order-page-wrapper">
            <Navbar />

            <div className="container py-4 mt-2">

                {/* ── Header ── */}
                <div className="header-section">
                    <div>
                        <h2>Order Details</h2>
                        <p>Check the status and details of your recent purchase</p>
                    </div>
                    <button className="back-btn" onClick={() => navigate('/shop')}>
                        <i className="bi bi-arrow-left"></i> Back to Shop
                    </button>
                </div>

                {/* ── Empty ── */}
                {!latestOrder ? (
                    <div className="empty-state">
                        <i className="bi bi-bag-x"></i>
                        <h4>No orders found</h4>
                        <p>You haven't placed any orders yet.</p>
                        <button className="empty-state-btn" onClick={() => navigate('/')}>
                            <i className="bi bi-bag"></i> Start Shopping
                        </button>
                    </div>
                ) : (
                    <div className="row g-4" ref={pdfRef}>

                        {/* ══ LEFT ══ */}
                        <div className="col-lg-8">

                            {/* Items Card */}
                            <div className="items-card">
                                <div className="items-card-header">
                                    <span className="items-card-label">
                                        <i className="bi bi-bag-check me-1"></i>
                                        Items Summary
                                    </span>
                                    <span className="order-id-tag">
                                        <i className="bi bi-hash"></i>{latestOrder.order_id}
                                    </span>
                                </div>

                                {latestOrder.items.map((item, idx) => (
                                    <div key={idx} className="order-item-row">
                                        <img
                                            src={`${IMG_URL}${item.image}`}
                                            alt={item.product_name}
                                            className="item-img"
                                            loading="lazy"
                                        />
                                        <div className="flex-grow-1">
                                            <p className="item-name">{item.product_name}</p>
                                            <span className="item-qty-pill">
                                                <i className="bi bi-box-seam"></i> Qty: {item.quantity}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="item-total">₹{fmt(item.price * item.quantity)}</p>
                                            <p className="item-unit">₹{fmt(item.price)} / unit</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Delivery Progress Card */}
                            <div className="progress-card">
                                <span className="progress-card-label">
                                    <i className="bi bi-geo-alt me-1"></i> Delivery Progress
                                </span>
                                <div className="stepper-wrapper">
                                    {steps.map((step, idx) => (
                                        <div
                                            key={idx}
                                            className={`stepper-item ${idx <= currentStep ? 'completed' : ''}`}
                                        >
                                            <div className="step-counter">
                                                {idx < currentStep
                                                    ? <i className="bi bi-check-lg"></i>
                                                    : idx + 1
                                                }
                                            </div>
                                            <div className="step-name">{step}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* ══ RIGHT — Summary ══ */}
                        <div className="col-lg-4">
                            <div className="summary-card">
                                <h6 className="summary-card-title">Order Summary</h6>

                                <div className="summary-row">
                                    <span>Order Date</span>
                                    <span className="val">
                                        {new Date(latestOrder.created_at).toLocaleDateString('en-GB', {
                                            day: 'numeric', month: 'short', year: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className="summary-row">
                                    <span>Status</span>
                                    <span className={`status-pill-sm ${spClass(latestOrder.status)}`}>
                                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor', flexShrink: 0, display: 'inline-block' }}></span>
                                        {latestOrder.status}
                                    </span>
                                </div>
                                <div className="summary-row">
                                    <span>Shipping</span>
                                    <span style={{ color: 'var(--green)', fontWeight: 700, fontSize: '0.82rem' }}>
                                        <i className="bi bi-check-circle-fill me-1"></i>Free
                                    </span>
                                </div>

                                <hr className="summary-divider" />

                                <div className="summary-row">
                                    <span>Subtotal</span>
                                    <span className="val">₹{fmt(latestOrder.subtotal)}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Tax (GST)</span>
                                    <span className="val">₹{fmt(latestOrder.tax)}</span>
                                </div>

                                <div className="total-row">
                                    <span className="total-label">Grand Total</span>
                                    <span className="total-val">₹{fmt(latestOrder.total_amount)}</span>
                                </div>

                                {/* Download PDF */}
                                <button className="pdf-btn" onClick={downloadPDF}>
                                    <i className="bi bi-file-earmark-pdf"></i>
                                    Download Invoice
                                </button>

                                {/* Cancel order */}
                                {['Placed', 'Shipped', 'Processed'].includes(latestOrder.status) && (
                                    <button
                                        className="delete-btn"
                                        onClick={() => Deleteorder({
                                            order: latestOrder,
                                            allowedStatuses: ['Placed', 'Shipped', 'Processed'],
                                            onSuccess: () => setLatestOrder(null),
                                        })}
                                    >
                                        <i className="bi bi-x-circle"></i> Cancel Order
                                    </button>
                                )}
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};