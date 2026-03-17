import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Sidebar } from "../sidebar/Sidebar";
import { maincontext } from "../../App";
import { useParams } from "react-router-dom";
import { Getmyprofile } from "../../function/Getmyprofile";
import '../profile/Profile.css'
import { Updateprofile } from "../../function/Updateprofile";
import { Closetoast } from "../../function/Closetoast";

export const Profile = () => {
    const {
        userprofile,
        Setuserprofile,
        showtoast,
        Setshowtoast,
        toastcolor,
        Settoastcolor,
        toastmessage,
        Settoastmessage
    } = useContext(maincontext);
    const { id } = useParams();

    useEffect(() => {
        Getmyprofile(id, Setuserprofile);
    }, [id]);

    // Internal state for image preview in modal
    const [preview, setPreview] = useState(null);

    // Guard clause to prevent crashing while data is fetching
    if (!userprofile) return <div className="text-center mt-5 p-5">Loading Profile...</div>;

    return (
        <div className="container-fluid p-0">
            <div className="d-flex text-dark">
                <Sidebar />

                <div className="flex-grow-1 bg-light min-vh-100">
                    {/* Top Navbar */}
                    <nav className="navbar navbar-white bg-white border-bottom px-4 py-3 sticky-top shadow-sm text-dark">
                        <div className="container-fluid p-0">
                            <h5 className="fw-bold m-0"><i className="bi bi-person-circle me-2 text-primary"></i>My Account</h5>
                            <button
                                className="btn btn-primary btn-sm rounded-pill px-4 shadow-sm fw-bold ms-auto"
                                data-bs-toggle="modal"
                                data-bs-target="#editProfileModal"
                            >
                                <i className="bi bi-pencil-square me-2"></i>Edit Profile
                            </button>
                        </div>
                    </nav>

                    <div className="p-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
                                    <div className="bg-primary bg-gradient" style={{ height: '120px' }}></div>

                                    <div className="card-body p-4 pt-0">
                                        <div className="text-center" style={{ marginTop: '-60px' }}>
                                            <img
                                                src={userprofile.profileimage ? `http://localhost:5000/images/${userprofile.profileimage}` : "https://ui-avatars.com"}
                                                className="rounded-circle border border-4 border-white shadow mb-3"
                                                width="120" height="120" alt="Admin"
                                                style={{ objectFit: 'contain' }}
                                            />
                                            <h4 className="fw-bold mb-1 text-dark">{userprofile.name}</h4>
                                            <p className="text-muted small">Super Administrator</p>
                                            <span className="badge bg-success bg-opacity-10 text-success rounded-pill px-3 py-2">
                                                ● <span className="text-capitalize">{userprofile.status}</span> Account
                                            </span>
                                        </div>

                                        <div className="row g-4 mt-4 border-top pt-4 text-dark">
                                            <div className="col-md-6">
                                                <label className="text-muted small fw-bold text-uppercase d-block mb-1">Full Name</label>
                                                <p className="fw-bold fs-6">{userprofile.name}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="text-muted small fw-bold text-uppercase d-block mb-1">Email Address</label>
                                                <p className="fw-bold fs-6">{userprofile.email}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="text-muted small fw-bold text-uppercase d-block mb-1">Mobile Number</label>
                                                <p className="fw-bold fs-6">{userprofile.mobilenumber || "N/A"}</p>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="text-muted small fw-bold text-uppercase d-block mb-1">Office Address</label>
                                                <p className="fw-bold fs-6">{userprofile.address || "No address added"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Edit Profile Modal --- */}
            <div className="modal fade text-dark" id="editProfileModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border-0 shadow rounded-4">
                        <div className="modal-header border-bottom-0 pt-4 px-4">
                            <h5 className="modal-title fw-bold">Update Profile</h5>
                            <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body px-4 pb-4">
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Full Name</label>
                                <input type="text" className="form-control bg-light border-0 py-2 shadow-none rounded-3"
                                    value={userprofile.name} onChange={(e) => Setuserprofile({ ...userprofile, name: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Email</label>
                                <input type="text" className="form-control bg-light border-0 py-2 shadow-none rounded-3"
                                    value={userprofile.email} onChange={(e) => Setuserprofile({ ...userprofile, email: e.target.value })} />
                            </div>
                            <div className="mb-3 text-center">
                                <label className="form-label d-block small fw-bold text-muted text-start">Profile Image</label>
                                <div className="position-relative d-inline-block">
                                    <img
                                        src={preview ? preview : `http://localhost:5000/images/${userprofile.profileimage}`}
                                        className="rounded-circle border border-2 border-primary p-1 shadow-sm mb-2"
                                        width="100" height="100" alt="Preview"
                                        style={{ objectFit: 'contain' }}
                                    />
                                    <label htmlFor="fileInput" className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1 cursor-pointer shadow">
                                        <i className="bi bi-camera-fill small"></i>
                                    </label>
                                </div>
                                <input type="file" id="fileInput" className="d-none" accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        Setuserprofile({ ...userprofile, newimage: file });
                                        setPreview(URL.createObjectURL(file));
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Mobile Number</label>
                                <input type="text" className="form-control bg-light border-0 py-2 shadow-none rounded-3"
                                    value={userprofile.mobilenumber || ""} onChange={(e) => Setuserprofile({ ...userprofile, mobilenumber: e.target.value })} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label small fw-bold text-muted">Office Address</label>
                                <textarea className="form-control bg-light border-0 py-2 shadow-none rounded-3" rows="2"
                                    value={userprofile.address || ""} onChange={(e) => Setuserprofile({ ...userprofile, address: e.target.value })}></textarea>
                            </div>
                            <div className="d-grid mt-4">
                                <button type="button" className="btn btn-primary py-2 fw-bold rounded-3 shadow-sm" onClick={() => {
                                    Updateprofile(userprofile, Settoastcolor, Settoastmessage, Setshowtoast);
                                }}>
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showtoast && (
                <div className="toast-container position-fixed top-0 end-0 p-3">
                    <div className={`toast show text-bg-${toastcolor} border-0`}>
                        <div className="d-flex">
                            <div className="toast-body">{toastmessage}</div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => Closetoast(Setshowtoast)}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
