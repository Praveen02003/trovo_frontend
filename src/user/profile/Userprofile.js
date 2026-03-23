import React, { useContext, useEffect, useState } from 'react';
import { Navbar } from '../navbar/Navbar';
import '../profile/Userprofile.css';
import { maincontext } from '../../App';
import { Getloginuser } from '../../function/Getloginuser';
import { Updateprofile } from '../../function/Updateprofile';
import { Logout } from '../../function/Logout';
import { IMAGES_URL } from '../../axios/Imageurl';
import { Userauth } from '../../function/Userauth';

export const Userprofile = () => {
    const { loginuser, Setloginuser } = useContext(maincontext);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        const loadUser = async () => {
            const isUser = await Userauth();
            if (!isUser) return;
            Setloginuser(Getloginuser());
        };
        loadUser();
    }, []);

    /* Loading state */
    if (!loginuser) return (
        <div className="profile-loading">
            <div className="profile-loading-spinner"></div>
            <p>Loading Profile…</p>
        </div>
    );

    const avatarSrc = preview || `${IMAGES_URL}/${loginuser.profileimage}`;

    return (
        <div className="profile-page">
            <Navbar />

            <div className="container py-4 mt-2">
                <div className="row g-4 align-items-start">

                    {/* ══ LEFT — Profile Card ══ */}
                    <div className="col-lg-4 profile-left">
                        <div className="profile-card">

                            {/* Dark banner */}
                            <div className="profile-card-banner"></div>

                            {/* Avatar + info */}
                            <div className="profile-avatar-wrap">
                                <div className="profile-avatar-ring">
                                    <img src={avatarSrc} alt={loginuser.name} />
                                </div>
                                <h5 className="profile-name">{loginuser.name}</h5>
                                <p className="profile-email">{loginuser.email}</p>
                                <span className="profile-badge">
                                    <i className="bi bi-award-fill"></i> Gold Member
                                </span>

                                <div className="profile-divider"></div>

                                {/* Quick stats */}
                                {/* <div className="profile-stats w-100">
                                    <div className="profile-stat">
                                        <span className="stat-val">12</span>
                                        <span className="stat-lbl">Orders</span>
                                    </div>
                                    <div className="profile-stat">
                                        <span className="stat-val">5</span>
                                        <span className="stat-lbl">Wishlist</span>
                                    </div>
                                    <div className="profile-stat">
                                        <span className="stat-val">4.9</span>
                                        <span className="stat-lbl">Rating</span>
                                    </div>
                                </div> */}

                                <div className="profile-divider"></div>

                                {/* Buttons */}
                                <button
                                    className="profile-btn-edit"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editModal"
                                >
                                    <i className="bi bi-pencil-fill"></i>
                                    Edit Profile
                                </button>
                                <button className="profile-btn-logout" onClick={Logout}>
                                    <i className="bi bi-power"></i>
                                    Sign Out
                                </button>
                            </div>

                        </div>
                    </div>

                    {/* ══ RIGHT — Details Card ══ */}
                    <div className="col-lg-8 profile-right">
                        <div className="details-card">
                            <h5 className="details-heading">Account Details</h5>
                            <p className="details-sub">Your personal information is read-only. Click Edit Profile to update.</p>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="profile-field-label">Full Name</label>
                                    <input
                                        className="profile-field-input"
                                        value={loginuser.name || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="profile-field-label">Email Address</label>
                                    <input
                                        className="profile-field-input"
                                        value={loginuser.email || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="profile-field-label">Phone Number</label>
                                    <input
                                        className="profile-field-input"
                                        value={loginuser.mobilenumber || '—'}
                                        readOnly
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="profile-field-label">Member Since</label>
                                    <input
                                        className="profile-field-input"
                                        value="2024"
                                        readOnly
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="profile-field-label">Delivery Address</label>
                                    <textarea
                                        className="profile-field-input"
                                        rows="3"
                                        value={loginuser.address || '—'}
                                        readOnly
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ══ EDIT MODAL ══ */}
            <div className="modal fade profile-modal" id="editModal" tabIndex="-1">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h5 className="modal-title">Edit Profile</h5>
                            <button className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div className="modal-body">
                            {/* Avatar upload */}
                            <div className="avatar-upload-wrap mb-4">
                                <div className="avatar-upload-ring">
                                    <img src={avatarSrc} alt="Profile" />
                                    <label htmlFor="fileInput" className="avatar-cam-btn">
                                        <i className="bi bi-camera-fill"></i>
                                    </label>
                                </div>
                                <span className="avatar-upload-hint">Click camera to change photo</span>
                                <input
                                    type="file" id="fileInput" className="d-none" accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        Setloginuser({ ...loginuser, newimage: file });
                                        setPreview(URL.createObjectURL(file));
                                    }}
                                />
                            </div>

                            <div className="row g-3">
                                <div className="col-md-6">
                                    <label className="modal-field-label">Full Name</label>
                                    <input
                                        className="modal-field-input"
                                        value={loginuser.name || ''}
                                        onChange={(e) => Setloginuser({ ...loginuser, name: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="modal-field-label">Email Address</label>
                                    <input
                                        className="modal-field-input"
                                        value={loginuser.email || ''}
                                        onChange={(e) => Setloginuser({ ...loginuser, email: e.target.value })}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="modal-field-label">Phone Number</label>
                                    <input
                                        className="modal-field-input"
                                        value={loginuser.mobilenumber || ''}
                                        onChange={(e) => Setloginuser({ ...loginuser, mobilenumber: e.target.value })}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="modal-field-label">Delivery Address</label>
                                    <textarea
                                        className="modal-field-input"
                                        rows="3"
                                        value={loginuser.address || ''}
                                        onChange={(e) => Setloginuser({ ...loginuser, address: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="modal-btn-cancel" data-bs-dismiss="modal">
                                Cancel
                            </button>
                            <button
                                className="modal-btn-save"
                                data-bs-dismiss="modal"
                                onClick={() => Updateprofile(loginuser)}
                            >
                                <i className="bi bi-check-lg"></i>
                                Save Changes
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};