import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import '../profile/Userprofile.css';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { Updateprofile } from '../../function/Updateprofile';
import { Closetoast } from '../../function/Closetoast';
import { Logout } from '../../function/Logout';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';

export const Userprofile = () => {
    const {
        loginuser,
        Setloginuser
    } = useContext(maincontext);

    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const isUser = await Userauth(); // check authentication
            if (!isUser) return;            // stop if not logged in

            // set login user
            Setloginuser(Getloginuser());
        };

        loadUser();
    }, []);
    if (!loginuser) return <div className="text-center mt-5 p-5">Loading Profile...</div>;

    return (
        <div className="bg-light min-vh-100">
            <Navbar />

            <div className="container py-4">
                <div className="row g-4">
                    {/* LEFT PROFILE */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 text-center p-4">
                            <img
                                src={preview ? preview : `${IMAGES_URL}/${loginuser.profileimage}`}
                                className="rounded-circle mx-auto mb-3"
                                style={{ width: "100px", objectFit: 'contain' }}
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

                            <button className="btn btn-outline-danger w-100" onClick={Logout}>
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
                                    <input className="form-control" value={loginuser.mobilenumber || ""} readOnly />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Address</label>
                                    <textarea className="form-control" rows="2" value={loginuser.address || ""} readOnly />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- EDIT PROFILE MODAL --- */}
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
                                        className="form-control"
                                        value={loginuser.name || ''}
                                        onChange={(e) => Setloginuser({ ...loginuser, name: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Email</label>
                                    <input
                                        className="form-control"
                                        value={loginuser.email || ''}
                                        onChange={(e) => Setloginuser({ ...loginuser, email: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label">Phone</label>
                                    <input
                                        className="form-control"
                                        value={loginuser.mobilenumber || ''}
                                        onChange={(e) => Setloginuser({ ...loginuser, mobilenumber: e.target.value })}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label">Address</label>
                                    <textarea
                                        className="form-control"
                                        rows="3"
                                        value={loginuser.address || ''}
                                        onChange={(e) => Setloginuser({ ...loginuser, address: e.target.value })}
                                    />
                                </div>

                                <div className="col-12 text-center mt-3">
                                    <label className="form-label d-block">Profile Image</label>
                                    <div className="position-relative d-inline-block">
                                        <img
                                            src={preview ? preview : `${IMAGES_URL}/${loginuser.profileimage}`}
                                            className="rounded-circle border border-2 border-primary p-1 shadow-sm mb-2"
                                            width="100"
                                            height="100"
                                            style={{ objectFit: 'contain' }}
                                        />
                                        <label
                                            htmlFor="fileInput"
                                            className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-1 cursor-pointer shadow"
                                        >
                                            <i className="bi bi-camera-fill small"></i>
                                        </label>
                                    </div>
                                    <input
                                        type="file"
                                        id="fileInput"
                                        className="d-none"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            Setloginuser({ ...loginuser, newimage: file });
                                            setPreview(URL.createObjectURL(file));
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
                                onClick={() => Updateprofile(loginuser)}
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