import React, { useContext, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Sidebar } from "../sidebar/Sidebar";
import { Getallcustomers } from "../../function/Getallcustomers";
import { maincontext } from "../../App";
import { Link } from "react-router-dom";
import { Blockcustomer } from "../../function/Blockcustomer";
import { Closetoast } from "../../function/Closetoast";

export const Customers = () => {
    const {
        page, Setpage, status, Setstatus, search, Setsearch,
        allcustomers, Setallcustomers, showtoast, Setshowtoast,
        toastcolor, Settoastcolor, toastmessage, Settoastmessage
    } = useContext(maincontext);

    useEffect(() => {
        Getallcustomers(Setallcustomers, page, status, search);
    }, [page, status, search]);

    return (
        <div className="container-fluid p-0 bg-light min-vh-100">
            <div className="d-flex">
                <Sidebar />

                <div className="flex-grow-1">
                    {/* Modern Top Navbar */}
                    <nav className="navbar bg-white border-bottom px-4 py-3 sticky-top shadow-sm">
                        <div className="container-fluid p-0">
                            <div className="d-flex align-items-center">
                                <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                                    <i className="bi bi-people-fill text-primary fs-5"></i>
                                </div>
                                <h5 className="fw-bold m-0 text-dark">Customer Management</h5>
                            </div>
                            <div className="ms-auto d-flex align-items-center gap-3">
                                <div className="text-end d-none d-sm-block">
                                    <p className="m-0 small fw-bold">Alex Rivera</p>
                                    <p className="m-0 text-muted" style={{ fontSize: '0.7rem' }}>Super Admin</p>
                                </div>
                                <img src="https://ui-avatars.com" alt="Profile" className="rounded-circle border border-2 border-white shadow-sm" width="40" height="40" />
                            </div>
                        </div>
                    </nav>

                    <div className="p-4 p-lg-5">
                        {/* Page Header */}
                        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 gap-3">
                            <div>
                                <h3 className="fw-bold text-dark mb-1">Users Directory</h3>
                                <p className="text-muted small mb-0">Monitor user activity and manage account permissions.</p>
                            </div>
                        </div>

                        {/* Search & Filter Card */}
                        <div className="card border-0 shadow-sm mb-4 rounded-4">
                            <div className="card-body p-3 p-lg-4">
                                <div className="row g-3">
                                    <div className="col-lg-9">
                                        <div className="input-group bg-light rounded-pill px-3 border-0">
                                            <span className="input-group-text bg-transparent border-0"><i className="bi bi-search text-muted"></i></span>
                                            <input type="text" className="form-control bg-transparent border-0 shadow-none py-2" placeholder="Search by name, email, or phone number..."
                                                onChange={(e) => { Setsearch(e.target.value); Setpage(1); }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-3">
                                        <select className="form-select border-0 bg-light rounded-pill px-4 shadow-none fw-bold text-muted py-2"
                                            value={status} onChange={(e) => { Setstatus(e.target.value); Setpage(1); }}>
                                            <option value="all">All Statuses</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="blocked">Blocked</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table Card */}
                        <div className="card border-0 shadow-sm rounded-4 overflow-hidden bg-white">
                            <div className="table-responsive">
                                <table className="table align-middle table-hover mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th className="ps-4 py-3 text-uppercase text-muted fw-bold border-0" style={{ fontSize: '0.7rem' }}>Customer Profile</th>
                                            <th className="py-3 text-uppercase text-muted fw-bold border-0" style={{ fontSize: '0.7rem' }}>Contact & Email</th>
                                            <th className="py-3 text-uppercase text-muted fw-bold border-0 text-center" style={{ fontSize: '0.7rem' }}>Account Status</th>
                                            <th className="pe-4 py-3 text-uppercase text-muted fw-bold border-0 text-end" style={{ fontSize: '0.7rem' }}>Management</th>
                                        </tr>
                                    </thead>
                                    <tbody className="border-top-0">
                                        {Array.isArray(allcustomers) && allcustomers.length > 0 ? (
                                            allcustomers.map((cust) => (
                                                <tr key={cust.user_id}>
                                                    <td className="ps-4 py-3">
                                                        <div className="d-flex align-items-center">
                                                            <div className="position-relative">
                                                                <img
                                                                    src={cust.profileimage ? `http://localhost:5000/images/${cust.profileimage}` : `https://ui-avatars.com{cust.name}&background=random`}
                                                                    className="rounded-circle border shadow-sm" width="48" height="48" alt="Avatar"
                                                                />
                                                                <span className={`position-absolute bottom-0 end-0 p-1 border border-2 border-white rounded-circle ${cust.status === 'active' ? 'bg-success' : 'bg-secondary'}`}></span>
                                                            </div>
                                                            <div className="ms-3">
                                                                <div className="fw-bold text-dark mb-0">{cust.name}</div>
                                                                <div className="text-muted extra-small" style={{ fontSize: '0.7rem' }}>ID: #{cust.user_id}</div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-3">
                                                        <div className="small fw-bold text-dark">{cust.email}</div>
                                                        <div className="text-muted small">{cust.mobilenumber || "No Phone"}</div>
                                                    </td>
                                                    <td className="py-3 text-center">
                                                        <span className={`badge rounded-pill px-3 py-2 fw-bold 
                                                            ${cust.status === 'active' ? 'bg-success-subtle text-success border border-success' :
                                                                cust.status === 'blocked' ? 'bg-danger-subtle text-danger border border-danger' :
                                                                    'bg-warning-subtle text-warning border border-warning'}`}
                                                            style={{ fontSize: '0.65rem' }}>
                                                            ● {cust.status.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td className="pe-4 py-3 text-end">
                                                        {/* Use "dropdown" with "position-static" if the table clips it */}
                                                        <div className="dropdown">
                                                            <button
                                                                className="btn btn-light btn-sm rounded-circle border shadow-sm"
                                                                type="button"
                                                                data-bs-toggle="dropdown"
                                                                aria-expanded="false"
                                                            >
                                                                <i className="bi bi-three-dots-vertical"></i>
                                                            </button>
                                                            <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3">
                                                                <li>
                                                                    <Link className="dropdown-item py-2" to={`/vieweachcustomer/${cust.user_id}`}>
                                                                        <i className="bi bi-eye me-2 text-primary"></i> View Details
                                                                    </Link>
                                                                </li>
                                                                <li><hr className="dropdown-divider opacity-50" /></li>
                                                                <li>
                                                                    <button
                                                                        className="dropdown-item py-2 text-danger fw-bold"
                                                                        onClick={() => Blockcustomer(cust.user_id, Settoastmessage, Setshowtoast, Settoastcolor, Setallcustomers, page, status, search)}
                                                                    >
                                                                        <i className={`bi ${cust.status === 'blocked' ? 'bi-unlock' : 'bi-slash-circle'} me-2`}></i>
                                                                        {cust.status === 'blocked' ? 'Unblock User' : 'Block User'}
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr><td colSpan="4" className="text-center py-5 text-muted">No customers found.</td></tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>

                            {/* SaaS Style Pagination Bar */}
                            <div className="px-4 py-3 bg-light bg-opacity-25 border-top d-flex justify-content-between align-items-center">
                                <p className="mb-0 small text-muted font-monospace">SHOWING <b>{allcustomers.length}</b> USERS</p>
                                <div className="btn-group shadow-sm border rounded overflow-hidden">
                                    <button className="btn btn-white btn-sm border-0 bg-white px-3" disabled={page === 1} onClick={() => Setpage(page - 1)}>
                                        <i className="bi bi-chevron-left text-primary"></i>
                                    </button>
                                    <button className="btn btn-white btn-sm border-0 bg-white px-3 border-start" disabled={allcustomers.length < 10} onClick={() => Setpage(page + 1)}>
                                        <i className="bi bi-chevron-right text-primary"></i>
                                    </button>
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
                            <div className="toast-body fw-bold">
                                {toastcolor === "success" ? <i className="bi bi-check-circle-fill me-2"></i> : <i className="bi bi-exclamation-triangle-fill me-2"></i>}
                                {toastmessage}
                            </div>
                            <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={() => Closetoast(Setshowtoast)}></button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
