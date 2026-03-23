import React, { useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Sidebar } from "../sidebar/Sidebar";
import { maincontext } from "../../App";
import { useParams } from "react-router-dom";
import { Getmyprofile } from "../../function/Getmyprofile";
import '../profile/Profile.css';
import { Updateprofile } from "../../function/Updateprofile";
import { IMAGES_URL } from "../../axios/Imageurl";
import { Adminauth } from "../../function/Adminauth";

export const Profile = () => {
    const { userprofile, Setuserprofile } = useContext(maincontext);
    const { id } = useParams();
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const loadProfile = async () => {
            const isAdmin = await Adminauth();
            if (!isAdmin) return;
            await Getmyprofile(id, Setuserprofile);
        };
        loadProfile();
    }, [id]);

    if (!userprofile) return (
        <div className="profile-loading">
            <div className="profile-spinner"></div>
            <p>Loading Profile…</p>
        </div>
    );

    const avatarSrc = preview || `${IMAGES_URL}/${userprofile.profileimage}`;

    return (
        <div className="container-fluid p-0 admin-profile-page">
            <div className="d-flex">
                <Sidebar />

                <div className="flex-grow-1">

                    {/* ── Top Navbar ── */}
                    <nav className="navbar admin-topbar">
                        <div className="container-fluid p-0">
                            <h5 className="admin-topbar-title">
                                <i className="bi bi-person-circle"></i> My Account
                            </h5>
                            <button
                                className="edit-profile-btn ms-auto"
                                data-bs-toggle="modal"
                                data-bs-target="#editProfileModal"
                            >
                                <i className="bi bi-pencil-fill"></i> Edit Profile
                            </button>
                        </div>
                    </nav>

                    <div className="p-4">
                        <div className="row justify-content-center">
                            <div className="col-lg-7 col-xl-6">

                                <div className="profile-card">

                                    {/* Banner */}
                                    <div className="profile-banner">
                                        <div className="banner-orb"></div>
                                    </div>

                                    {/* Avatar + name */}
                                    <div className="profile-avatar-section">
                                        <div className="profile-avatar-ring">
                                            <img src={avatarSrc} alt={userprofile.name} />
                                        </div>
                                        <h4 className="profile-name">{userprofile.name}</h4>
                                        <p className="profile-role">Super Administrator</p>
                                        <span className="profile-status-badge">
                                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></span>
                                            {userprofile.status} Account
                                        </span>
                                    </div>

                                    {/* Info grid */}
                                    <div className="profile-info-grid">
                                        <div className="profile-info-item">
                                            <span className="info-label">Full Name</span>
                                            <span className="info-value">{userprofile.name}</span>
                                        </div>
                                        <div className="profile-info-item">
                                            <span className="info-label">Email Address</span>
                                            <span className="info-value">{userprofile.email}</span>
                                        </div>
                                        <div className="profile-info-item">
                                            <span className="info-label">Mobile Number</span>
                                            <span className="info-value">{userprofile.mobilenumber || '—'}</span>
                                        </div>
                                        <div className="profile-info-item">
                                            <span className="info-label">Office Address</span>
                                            <span className="info-value">{userprofile.address || '—'}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ Edit Profile Modal ══ */}
            <div className="modal fade admin-modal" id="editProfileModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Update Profile</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">

                            {/* Avatar upload */}
                            <div className="avatar-upload-wrap mb-4">
                                <div className="avatar-upload-ring">
                                    <img src={avatarSrc} alt="Preview" />
                                    <label htmlFor="fileInput" className="avatar-cam-btn">
                                        <i className="bi bi-camera-fill"></i>
                                    </label>
                                </div>
                                <span className="avatar-upload-hint">Click camera to change photo</span>
                                <input
                                    type="file" id="fileInput" className="d-none" accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        Setuserprofile({ ...userprofile, newimage: file });
                                        setPreview(URL.createObjectURL(file));
                                    }}
                                />
                            </div>

                            <div className="mb-3">
                                <label className="modal-field-label">Full Name</label>
                                <input
                                    type="text" className="modal-field-input"
                                    value={userprofile.name}
                                    onChange={(e) => Setuserprofile({ ...userprofile, name: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="modal-field-label">Email Address</label>
                                <input
                                    type="email" className="modal-field-input"
                                    value={userprofile.email}
                                    onChange={(e) => Setuserprofile({ ...userprofile, email: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="modal-field-label">Mobile Number</label>
                                <input
                                    type="text" className="modal-field-input"
                                    value={userprofile.mobilenumber || ''}
                                    placeholder="+91 00000 00000"
                                    onChange={(e) => Setuserprofile({ ...userprofile, mobilenumber: e.target.value })}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="modal-field-label">Office Address</label>
                                <textarea
                                    className="modal-field-textarea" rows="3"
                                    value={userprofile.address || ''}
                                    placeholder="Your office address…"
                                    onChange={(e) => Setuserprofile({ ...userprofile, address: e.target.value })}
                                ></textarea>
                            </div>

                            <button className="modal-save-btn" onClick={() => Updateprofile(userprofile)}>
                                <i className="bi bi-check-lg"></i> Save Changes
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};