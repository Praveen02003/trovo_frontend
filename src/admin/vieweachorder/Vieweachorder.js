import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Sidebar } from "../sidebar/Sidebar";
import Swal from "sweetalert2";
export const Vieweachorder = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState([]);
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = () => {
        axios.get(`http://localhost:5000/getorder/${id}`)
            .then((res) => {
                setOrderDetails(res.data);
                setStatus(res.data[0]?.order_status || res.data[0]?.status);
            })
            .catch((err) => console.error(err));
    };

    const handleStatusUpdate = (newStatus) => {
        // We pass both ID and Status in the URL string
        axios.get(`http://localhost:5000/updateorderstatus/${id}/${newStatus}`)
            .then(() => {
                setStatus(newStatus); // Update local state for UI
                Swal.fire({
                    icon: 'success',
                    title: 'Status Updated',
                    text: `Order is now ${newStatus}`,
                    timer: 1500,
                    showConfirmButton: false
                });
            })
            .catch(err => {
                console.error("Update failed:", err);
                Swal.fire({ icon: 'error', title: 'Error updating status' });
            });
    };


    if (!orderDetails || orderDetails.length === 0)
        return <div className="p-5 text-center fw-bold text-primary">Loading...</div>;

    const mainInfo = orderDetails[0];

    return (
        <div className="d-flex" style={{ backgroundColor: "#F4F7FE", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            <Sidebar />
            <div className="flex-grow-1 p-4 p-md-5">

                <div className="d-flex justify-content-between align-items-center mb-4 d-print-none">
                    <button onClick={() => navigate(-1)} className="btn btn-white shadow-sm border-0 rounded-3 px-3">
                        <i className="bi bi-arrow-left me-2"></i>Back to List
                    </button>
                    <div className="d-flex gap-2">
                        {/* Status Update Dropdown */}
                        <div className="dropdown">
                            <button className="btn btn-white shadow-sm border-0 dropdown-toggle fw-bold" type="button" data-bs-toggle="dropdown">
                                Update Status: <span className="text-primary ms-1">{status}</span>
                            </button>
                            <ul className="dropdown-menu border-0 shadow-lg p-2 rounded-3">
                                <li><button className="dropdown-item rounded-2" onClick={() => handleStatusUpdate('Processed')}>Processed</button></li>
                                <li><button className="dropdown-item rounded-2" onClick={() => handleStatusUpdate('Shipped')}>Shipped</button></li>
                                <li><button className="dropdown-item rounded-2 text-success" onClick={() => handleStatusUpdate('Delivered')}>Delivered</button></li>
                                <li><button className="dropdown-item rounded-2 text-danger" onClick={() => handleStatusUpdate('Cancelled')}>Cancelled</button></li>
                            </ul>
                        </div>
                        <button className="btn btn-primary shadow-sm rounded-3 px-4" onClick={() => window.print()}>
                            <i className="bi bi-printer me-2"></i>Print
                        </button>
                    </div>
                </div>

                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                    <div className="card-body p-5 bg-white">
                        {/* Header Info */}
                        <div className="row mb-5 border-bottom pb-4">
                            <div className="col-md-6">
                                <h6 className="text-uppercase text-muted small fw-bold tracking-wider mb-2">Customer Info</h6>
                                <h4 className="fw-bold mb-1">{mainInfo.name || mainInfo.customer_name}</h4>
                                <p className="text-muted small mb-0">ID: {mainInfo.user_id} | Order: #{mainInfo.order_id}</p>
                            </div>
                            <div className="col-md-6 text-md-end mt-4 mt-md-0">
                                <h6 className="text-uppercase text-muted small fw-bold mb-2">Order Date</h6>
                                <p className="fw-bold mb-0">{new Date(mainInfo.created_at).toDateString()}</p>
                                <span className={`badge rounded-pill mt-2 px-3 py-2 ${status === 'Delivered' ? 'bg-success-subtle text-success' : 'bg-primary-subtle text-primary'}`}>
                                    ● {status}
                                </span>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="table-responsive">
                            <table className="table table-borderless align-middle">
                                <thead className="text-muted small text-uppercase">
                                    <tr className="border-bottom">
                                        <th className="pb-3 ps-0">Product</th>
                                        <th className="pb-3 text-center">Price</th>
                                        <th className="pb-3 text-center">Qty</th>
                                        <th className="pb-3 text-center">Tax</th>
                                        <th className="pb-3 text-end pe-0">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orderDetails.map((item, idx) => (
                                        <tr key={idx} className="border-bottom-subtle">
                                            <td className="py-4 ps-0">
                                                <div className="d-flex align-items-center">
                                                    <img src={`http://localhost:5000/images/${item.image}`} className="rounded-3 me-3" style={{ width: "50px", height: "50px", objectFit: "cover" }} alt="" />
                                                    <span className="fw-bold">{item.product_name}</span>
                                                </div>
                                            </td>
                                            <td className="text-center">${item.price}</td>
                                            <td className="text-center fw-semibold">{item.quantity}</td>
                                            <td className="text-center text-muted">${item.tax}</td>
                                            <td className="text-end pe-0 fw-bold">${parseFloat(mainInfo.total_amount).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer Summary */}
                        <div className="row mt-5">
                            <div className="col-md-7">
                                <div className="p-4 bg-light rounded-4">
                                    <h6 className="fw-bold mb-2">Admin Notes</h6>
                                    <p className="small text-muted mb-0">Order status was updated to <b>{status}</b> on {new Date().toLocaleDateString()}. Please ensure tracking details are updated in the shipping log.</p>
                                </div>
                            </div>
                            <div className="col-md-5 text-end">
                                <div className="d-inline-block text-start w-75">
                                    <div className="d-flex justify-content-between mb-2">
                                        <span className="text-muted">Grand Total</span>
                                        <h3 className="fw-bold text-primary mb-0">${parseFloat(mainInfo.total_amount).toLocaleString()}</h3>
                                    </div>
                                    <p className="small text-muted text-end">Inclusive of 3% VAT</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
