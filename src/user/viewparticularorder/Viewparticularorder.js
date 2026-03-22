import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '../navbar/Navbar';
import api from '../../axios/Axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Swal from "sweetalert2";
import { Deleteorder } from '../../function/Deleteorder';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';

export const Viewparticularorder = () => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const pdfRef = useRef();

    useEffect(() => {
        const loadData = async () => {
            // 1️⃣ Check if user is authenticated
            const isUser = await Userauth();
            if (!isUser) return; // stop if not logged in

            // 2️⃣ Fetch order if orderId exists
            if (orderId) {
                await fetchOrder();
            }
        };

        loadData();
    }, [orderId]);

    const fetchOrder = async () => {
        try {
            const res = await api.get(`/getorder/${orderId}`);
            if (!res.data || res.data.length === 0) return;

            const items = res.data;
            const subtotal = items.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
            const tax = Number(items[0]?.tax || 0);
            const total = Number(items[0]?.total_amount || (subtotal + tax));

            setOrder({
                order_id: items[0].order_id,
                created_at: items[0].created_at,
                status: items[0].order_status || 'Placed',
                subtotal, tax, total_amount: total, items
            });
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const downloadPDF = async () => {
        const element = pdfRef.current;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice_${order.order_id}.pdf`);
    };

    const handleDeleteOrder = () => {
        Deleteorder({
            order,
            allowedStatuses: ['Placed', 'Shipped', 'Processed'],
            onSuccess: () => navigate(-1)  // Go back after deletion
        });
    }

    if (loading) return <div className="d-flex justify-content-center align-items-center vh-100"><div className="spinner-border text-dark"></div></div>;

    return (
        <div className="bg-white min-vh-100 pb-5">
            <Navbar />

            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">

                        {/* TOP ACTION BAR */}
                        <div className="d-flex justify-content-between align-items-center mb-5 no-print">
                            <button onClick={() => navigate(-1)} className="btn btn-link text-dark fw-bold text-decoration-none p-0">
                                <i className="bi bi-arrow-left me-2"></i>BACK
                            </button>
                            <div>
                                <button onClick={downloadPDF} className="btn btn-dark rounded-0 px-4 fw-bold shadow-sm me-2">
                                    DOWNLOAD INVOICE
                                </button>

                                {/* Show Delete button only for Placed, Shipped, or Processed */}
                                {['Placed', 'Shipped', 'Processed'].includes(order.status) && (
                                    <button onClick={handleDeleteOrder} className="btn btn-danger rounded-0 px-4 fw-bold shadow-sm">
                                        DELETE ORDER
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* INVOICE CONTENT */}
                        <div ref={pdfRef} className="p-4 p-md-5 border shadow-sm bg-white" style={{ borderRadius: '2px' }}>
                            {/* LOGO & STATUS */}
                            <div className="d-flex justify-content-between border-bottom border-2 border-dark pb-4 mb-5">
                                <div>
                                    <h2 className="fw-black mb-0 letter-spacing-tight">YOUR BRAND</h2>
                                    <p className="text-muted small mb-0">Official Purchase Receipt</p>
                                </div>
                                <div className="text-end">
                                    <div className={`badge rounded-0 px-3 py-2 ${order.status === 'Delivered' ? 'bg-success' : 'bg-dark'}`}>
                                        {order.status.toUpperCase()}
                                    </div>
                                    <div className="mt-2 small fw-bold">#{order.order_id}</div>
                                </div>
                            </div>

                            {/* ORDER METADATA */}
                            <div className="row mb-5">
                                <div className="col-6">
                                    <h6 className="text-uppercase fw-bold small text-muted mb-3">Billed To</h6>
                                    <p className="fw-bold mb-1">Customer ID: {order.items[0]?.user_id || 'N/A'}</p>
                                    <p className="text-muted small">Digital Transaction</p>
                                </div>
                                <div className="col-6 text-end">
                                    <h6 className="text-uppercase fw-bold small text-muted mb-3">Order Date</h6>
                                    <p className="fw-bold mb-0">{new Date(order.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                                </div>
                            </div>

                            {/* PRODUCT TABLE */}
                            <table className="table table-borderless mb-5">
                                <thead className="border-bottom border-dark">
                                    <tr className="small text-uppercase fw-bold">
                                        <th className="ps-0 py-3">Item Description</th>
                                        <th className="text-center py-3">Qty</th>
                                        <th className="text-end pe-0 py-3">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item, index) => (
                                        <tr key={index} className="border-bottom border-light align-middle">
                                            <td className="ps-0 py-4">
                                                <div className="d-flex align-items-center">
                                                    <img
                                                        crossOrigin="anonymous"
                                                        src={`${IMAGES_URL}/${item.image}`}
                                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                                        className="border me-3" alt=""
                                                    />
                                                    <div>
                                                        <div className="fw-bold">{item.product_name}</div>
                                                        <div className="text-muted small">₹{Number(item.price).toLocaleString()} / unit</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center">{item.quantity}</td>
                                            <td className="text-end pe-0 fw-bold">₹{(item.price * item.quantity).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* SUMMARY BOX */}
                            <div className="row justify-content-end mt-5">
                                <div className="col-md-5">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted small">Subtotal</span>
                                        <span className="fw-medium">₹{order.subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span className="text-muted small">Tax (GST 18%)</span>
                                        <span className="fw-medium">₹{order.tax.toLocaleString()}</span>
                                    </div>
                                    <div className="border-top border-2 border-dark pt-3 d-flex justify-content-between align-items-center">
                                        <h5 className="fw-black mb-0">TOTAL</h5>
                                        <h4 className="fw-black mb-0 text-primary">₹{order.total_amount.toLocaleString()}</h4>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-5 pt-5 text-center text-muted border-top border-light">
                                <p className="small mb-0 fw-bold">Thank you for your purchase.</p>
                                <p className="tiny" style={{ fontSize: '10px' }}>This is a computer generated invoice and does not require a physical signature.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};