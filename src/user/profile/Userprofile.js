import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar'; // Adjust path
import '../profile/Userprofile.css'
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { Logout } from '../../function/Logout';
export const Userprofile = () => {

    const {
        loginuser,
        Setloginuser
    } = useContext(maincontext);

    useEffect(() => {
        Setloginuser(Getloginuser());
    }, [])

    return (
        <div className="bg-light min-vh-100">
            <Navbar />

            <div className="container py-4">
                <div className="row g-4">

                    {/* LEFT PROFILE */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 text-center p-4">
                            <img
                                src={`http://localhost:5000/images/${loginuser.profileimage}`}
                                className="rounded-circle mx-auto mb-3"
                                style={{ width: "100px" }}
                                alt="profile"
                            />

                            <h5 className="fw-bold">{loginuser.name}</h5>
                            <p className="text-muted small">{loginuser.email}</p>

                            <button
                                className="btn btn-primary w-100 mb-2"
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                            >
                                Edit Profile
                            </button>

                            <button className="btn btn-outline-danger w-100" onClick={() => {
                                Logout();
                            }}>
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* RIGHT DETAILS */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 p-4">

                            <h5 className="fw-bold mb-4">Account Details</h5>

                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label">Full Name</label>
                                    <input className="form-control" value={loginuser.name} readOnly />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input className="form-control" value={loginuser.email} readOnly />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Phone</label>
                                    <input className="form-control" value={loginuser.mobilenumber} readOnly />
                                </div>


                                {/* NEW ADDRESS FIELD */}
                                <div className="col-12">
                                    <label className="form-label">Address</label>
                                    <textarea className="form-control" rows="2" value={loginuser.address} readOnly />
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ✅ MODAL */}
            <div className="modal fade" id="editModal" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content rounded-4 border-0">

                        <div className="modal-header">
                            <h5 className="modal-title fw-bold">Edit Profile</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            <div className="row g-3">

                                <div className="col-md-6">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        name="name" // Matches the key in your loginuser object
                                        className="form-control"
                                        value={loginuser.name || ''}
                                        onChange={(e) => {
                                            Setloginuser({ ...loginuser, name: e.target.value });
                                        }}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        name="email"
                                        className="form-control"
                                        value={loginuser.email || ''}
                                        onChange={(e) => {
                                            Setloginuser({ ...loginuser, email: e.target.value });
                                        }}
                                    />
                                </div>

                                <div className="col-md-6">
                                    <label className="form-label">Phone</label>
                                    <input
                                        name="phone"
                                        className="form-control"
                                        value={loginuser.mobilenumber || ''}
                                        onChange={(e) => {
                                            Setloginuser({ ...loginuser, mobilenumber: e.target.value });
                                        }}
                                    />
                                </div>

                                <div className="col-12">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        rows="3"
                                        value={loginuser.address || ''}
                                        onChange={(e) => {
                                            Setloginuser({ ...loginuser, address: e.target.value });
                                        }}
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-outline-secondary" data-bs-dismiss="modal">
                                Cancel
                            </button>

                            <button
                                className="btn btn-primary"
                                data-bs-dismiss="modal"
                            >
                                Save Changes
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

