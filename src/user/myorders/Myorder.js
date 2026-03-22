import React, { useEffect, useState, useContext, useCallback, useRef } from 'react';
import { Navbar } from '../navbar/Navbar';
import api from '../../axios/Axios';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import '../myorders/Myorder.css';
import { Deleteorder } from '../../function/Deleteorder';
import { IMAGES_URL } from '../../axios/Imageurl';

const IMG_URL = `${IMAGES_URL}/`;

export const Myorder = () => {
    const navigate = useNavigate();
    const pdfRef = useRef();
    const { Setloginuser } = useContext(maincontext);
    const [latestOrder, setLatestOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchOrders = useCallback(async (userId) => {
        try {
            const res = await api.get(`/getorders/${userId}`);
            if (!res.data || res.data.length === 0) {
                setLatestOrder(null);
                return;
            }
            const sortedData = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            const lastOrderId = sortedData[0].order_id;
            const lastOrderItems = sortedData.filter(item => item.order_id === lastOrderId);

            setLatestOrder({
                order_id: lastOrderId,
                subtotal: Number(lastOrderItems[0].subtotal || 0),
                tax: Number(lastOrderItems[0].tax || 0),
                total_amount: Number(lastOrderItems[0].total_amount || 0),
                created_at: lastOrderItems[0].created_at,
                status: lastOrderItems[0].order_status || 'Placed',
                items: lastOrderItems.map(item => ({
                    product_name: item.product_name,
                    image: item.image,
                    quantity: Number(item.quantity),
                    price: Number(item.price)
                }))
            });
        } catch (err) {
            console.error("Order fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const user = Getloginuser();
        if (user) {
            Setloginuser(user);
            fetchOrders(user.user_id);
        } else {
            navigate('/login');
        }
    }, [fetchOrders, navigate, Setloginuser]);

    // ✅ Download PDF Logic
    const downloadPDF = async () => {
        const element = pdfRef.current;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: "#f8fafc" });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice_${latestOrder.order_id}.pdf`);
    };

    // ✅ Delete Order Logic


    const steps = ['Placed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentStepIndex = latestOrder ? steps.indexOf(latestOrder.status) : 0;

    if (loading) return (
        <div className="loader-container">
            <div className="spinner-grow text-primary" role="status"></div>
        </div>
    );

    return (
        <div className="order-page-wrapper">
            <Navbar />
            <div className="container py-5">
                <div className="header-section d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold tracking-tight mb-1">Order Details</h2>
                        <p className="text-muted small mb-0">Check the status of your recent purchase</p>
                    </div>
                    <button onClick={() => navigate('/shop')} className="btn btn-outline-dark rounded-pill px-4 btn-sm fw-bold">
                        Back to Shop
                    </button>
                </div>

                {!latestOrder ? (
                    <div className="empty-state card border-0 p-5 text-center rounded-4 shadow-sm">
                        <i className="bi bi-box-seam display-4 text-muted mb-3"></i>
                        <h4>No orders found</h4>
                    </div>
                ) : (
                    <div className="row g-4" ref={pdfRef}>
                        <div className="col-lg-8">
                            {/* Items Card */}
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden mb-4">
                                <div className="card-header d-flex justify-content-between align-items-center bg-white border-bottom py-3">
                                    <span className="fw-bold text-uppercase small text-muted tracking-wider">Items Summary</span>
                                    <div className="order-id-tag px-3 py-1 rounded-pill bg-light border small fw-bold">
                                        Order ID: #{latestOrder.order_id}
                                    </div>
                                </div>

                                <div className="card-body p-0">
                                    {latestOrder.items.map((item, idx) => (
                                        <div key={idx} className="order-item-row p-4 d-flex align-items-center border-bottom">
                                            <img src={`${IMG_URL}${item.image}`} alt={item.product_name} className="item-img shadow-sm rounded-3" style={{ width: '70px', height: '70px', objectFit: 'cover' }} />
                                            <div className="ms-4 flex-grow-1">
                                                <h6 className="fw-bold mb-1">{item.product_name}</h6>
                                                <span className="text-muted small bg-light px-2 py-1 rounded">Qty: {item.quantity}</span>
                                            </div>
                                            <div className="text-end">
                                                <p className="fw-bold mb-0">₹{(item.price * item.quantity).toLocaleString()}</p>
                                                <span className="text-muted smallest">₹{item.price.toLocaleString()} / unit</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Delivery Progress Card */}
                            <div className="card border-0 shadow-sm rounded-4 p-5 mb-4">
                                <h6 className="fw-bold mb-5 text-center text-uppercase small text-muted tracking-widest">Delivery Progress</h6>
                                <div className="stepper-wrapper">
                                    {steps.map((step, index) => (
                                        <div key={index} className={`stepper-item ${index <= currentStepIndex ? 'completed' : ''}`}>
                                            <div className="step-counter shadow-sm">
                                                {index < currentStepIndex ? <i className="bi bi-check-lg"></i> : index + 1}
                                            </div>
                                            <div className="step-name text-center mt-3">{step}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Summary & Actions */}
                        <div className="col-lg-4">
                            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
                                <h5 className="fw-bold mb-4">Order Summary</h5>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted small">Order Date</span>
                                    <span className="fw-bold small">{new Date(latestOrder.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted small">Status</span>
                                    <span className={`badge rounded-pill px-3 py-1 ${latestOrder.status === 'Delivered' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'}`}>{latestOrder.status}</span>
                                </div>
                                <hr className="opacity-10" />
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-bold text-dark">₹{latestOrder.subtotal.toLocaleString()}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <span className="text-muted">Tax (GST)</span>
                                    <span className="fw-bold text-dark">₹{latestOrder.tax.toLocaleString()}</span>
                                </div>
                                <div className="bg-light p-3 rounded-3 mb-4 d-flex justify-content-between align-items-center border">
                                    <span className="h6 fw-bold mb-0">Grand Total</span>
                                    <span className="h5 fw-bold mb-0 text-primary">₹{latestOrder.total_amount.toLocaleString()}</span>
                                </div>

                                {/* PDF Download Button */}
                                <button className="btn btn-dark w-100 py-3 rounded-3 fw-bold shadow-sm mb-2 d-flex align-items-center justify-content-center gap-2" onClick={downloadPDF}>
                                    <i className="bi bi-file-earmark-pdf"></i> Download Invoice
                                </button>

                                {/* Delete Order Button (only for Placed, Shipped, Processed) */}
                                {['Placed', 'Shipped', 'Processed'].includes(latestOrder.status) && (
                                    <button
                                        className="btn btn-danger btn-sm rounded-pill px-4 fw-bold shadow-sm"
                                        onClick={() => Deleteorder({
                                            order: latestOrder,
                                            allowedStatuses: ['Placed', 'Shipped', 'Processed'],
                                            onSuccess: () => setLatestOrder(null)
                                        })}
                                    >
                                        Delete
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