import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";
import { maincontext } from "../../App";
import { Getcurrentcustomer } from "../../function/Getcurrentcustomer";
import { Blockcustomer } from "../../function/Blockcustomer";
import { Closetoast } from "../../function/Closetoast";

export const Vieweachcustomer = () => {
    const { id } = useParams();
    const {
        eachcustomer, Seteachcustomer,
        Settoastmessage, Setshowtoast, Settoastcolor, Setallcustomers,
        showtoast, toastcolor, toastmessage,
    } = useContext(maincontext);

    useEffect(() => {
        Getcurrentcustomer(id, Seteachcustomer);
    }, [id]);

    return (
        <div className="d-flex bg-light min-vh-100">
            <Sidebar />

            <div className="flex-grow-1">
                {/* Top Navbar */}
                <nav className="navbar bg-white border-bottom px-4 py-3 sticky-top shadow-sm">
                    <div className="container-fluid p-0 d-flex align-items-center">
                        <Link to={'/customers'} className="btn btn-outline-primary btn-sm me-3 rounded-pill px-3">
                            <i className="bi bi-arrow-left me-1"></i> Back
                        </Link>
                        <h5 className="fw-bold m-0 text-dark">Customer Details</h5>
                    </div>
                </nav>

                <div className="p-4 p-lg-5">
                    <div className="row g-4 justify-content-center">
                        <div className="col-lg-10 col-xl-8">

                            {/* Profile Card */}
                            <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                <div className="bg-primary p-5 text-center">
                                    <img
                                        src={eachcustomer?.profileimage ? `http://localhost:5000/images/${eachcustomer.profileimage}` : `https://ui-avatars.com{eachcustomer?.name || 'User'}&background=random&size=128`}
                                        className="rounded-circle border border-4 border-white shadow-lg bg-white mb-3"
                                        width="130" height="130" alt="Avatar"
                                    />
                                    <h3 className="fw-bold text-white mb-0">{eachcustomer?.name || "Loading..."}</h3>
                                    <p className="text-white text-opacity-75 mb-0">Customer ID: #{eachcustomer?.user_id || id}</p>
                                </div>

                                <div className="card-body p-4 p-md-5">
                                    <div className="row g-4">
                                        {/* Name Field */}
                                        <div className="col-md-6 border-bottom pb-3">
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Full Name</label>
                                            <div className="text-dark fw-bold fs-5">{eachcustomer?.name || "N/A"}</div>
                                        </div>

                                        {/* Email Field */}
                                        <div className="col-md-6 border-bottom pb-3">
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Email Address</label>
                                            <div className="text-dark fw-bold fs-5">{eachcustomer?.email || "N/A"}</div>
                                        </div>

                                        {/* Mobile Field */}
                                        <div className="col-md-6 border-bottom pb-3">
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Mobile Number</label>
                                            <div className="text-dark fw-bold fs-5">{eachcustomer?.mobilenumber || "N/A"}</div>
                                        </div>

                                        {/* Status Field */}
                                        <div className="col-md-6 border-bottom pb-3">
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Account Status</label>
                                            <span className={`badge rounded-pill px-3 py-2 fw-bold ${eachcustomer?.status === 'active' ? 'bg-success-subtle text-success border border-success' : 'bg-danger-subtle text-danger border border-danger'}`}>
                                                ● {eachcustomer?.status?.toUpperCase() || "UNKNOWN"}
                                            </span>
                                        </div>

                                        {/* Address Field */}
                                        <div className="col-12 border-bottom pb-3">
                                            <label className="text-muted small fw-bold text-uppercase d-block mb-1">Shipping Address</label>
                                            <div className="text-dark fw-semibold lh-base">
                                                {eachcustomer?.address || "No specific address provided for this user."}
                                            </div>
                                        </div>

                                        {/* Action Button */}

                                        <div className="col-12 pt-3">
                                            <button
                                                className={`btn w-100 rounded-pill py-3 fw-bold shadow-sm ${eachcustomer?.status === 'blocked' ? 'btn-success' : 'btn-danger'}`}
                                                onClick={() => Blockcustomer(
                                                    eachcustomer.user_id,
                                                    Settoastmessage, Setshowtoast, Settoastcolor,
                                                    Setallcustomers, 1, 'all', '', Seteachcustomer// Defaulting refresh params
                                                )}
                                            >
                                                <i className={`bi ${eachcustomer?.status === 'blocked' ? 'bi-check-circle' : 'bi-slash-circle'} me-2`}></i>
                                                {eachcustomer.status === 'blocked' ? 'Unblock Account' : 'Block Account'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification Toast */}
            {showtoast && (
                <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div className={`toast show align-items-center text-white bg-${toastcolor} border-0 shadow-lg rounded-3`}>
                        <div className="d-flex">
                            <div className="toast-body fw-bold">{toastmessage}</div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => Closetoast(Setshowtoast)}></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
