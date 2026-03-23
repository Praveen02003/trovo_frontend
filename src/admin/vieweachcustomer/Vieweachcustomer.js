import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Sidebar } from "../sidebar/Sidebar";
import { maincontext } from "../../App";
import { Getcurrentcustomer } from "../../function/Getcurrentcustomer";
import { Blockcustomer } from "../../function/Blockcustomer";
import { IMAGES_URL } from "../../axios/Imageurl";
import { Adminauth } from "../../function/Adminauth";
import '../vieweachcustomer/Vieweachcustomer.css';

/* Initials helper */
const initials = (name = '') =>
    name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

/* Status pill class */
const spClass = (s) => {
    switch ((s || '').toLowerCase()) {
        case 'active': return 'sp-active';
        case 'blocked': return 'sp-blocked';
        default: return 'sp-inactive';
    }
};

export const Vieweachcustomer = () => {
    const { id } = useParams();
    const { eachcustomer, Seteachcustomer, Setallcustomers } = useContext(maincontext);

    useEffect(() => {
        const loadData = async () => {
            const isAdmin = await Adminauth();
            if (!isAdmin) return;
            await Getcurrentcustomer(id, Seteachcustomer);
        };
        loadData();
    }, [id]);

    if (!eachcustomer) return (
        <div className="viewcustomer-loading">
            <div className="vc-spinner"></div>
            <p>Loading Customer…</p>
        </div>
    );

    const isBlocked = eachcustomer?.status === 'blocked';

    return (
        <div className="container-fluid p-0 viewcustomer-page">
            <div className="d-flex">
                <Sidebar />

                <div className="flex-grow-1">

                    {/* ── Top Navbar ── */}
                    <nav className="navbar admin-topbar">
                        <div className="admin-topbar-inner container-fluid p-0">
                            <Link to="/customers" className="back-btn">
                                <i className="bi bi-arrow-left"></i> Back
                            </Link>
                            <h5 className="topbar-title">
                                <i className="bi bi-person-circle"></i> Customer Details
                            </h5>
                        </div>
                    </nav>

                    <div className="p-4 p-lg-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-9 col-xl-7">

                                <div className="customer-card">

                                    {/* ── Dark Banner ── */}
                                    <div className="customer-banner">
                                        <div className="banner-orb-1"></div>
                                        <div className="banner-orb-2"></div>

                                        <div className="customer-avatar-wrap">
                                            {eachcustomer.profileimage ? (
                                                <div className="customer-avatar-ring">
                                                    <img
                                                        src={`${IMAGES_URL}/${eachcustomer.profileimage}`}
                                                        alt={eachcustomer.name}
                                                    />
                                                </div>
                                            ) : (
                                                <div className="customer-avatar-initials">
                                                    {initials(eachcustomer.name)}
                                                </div>
                                            )}
                                        </div>

                                        <h3 className="customer-banner-name">
                                            {eachcustomer.name || 'Loading…'}
                                        </h3>
                                        <p className="customer-banner-id">
                                            Customer ID: <strong style={{ color: 'rgba(255,255,255,0.7)' }}>#{eachcustomer.user_id || id}</strong>
                                        </p>
                                    </div>

                                    {/* ── Info grid ── */}
                                    <div className="customer-body">
                                        <div className="info-grid">

                                            {/* Name */}
                                            <div className="info-cell">
                                                <div className="info-label">
                                                    <i className="bi bi-person"></i> Full Name
                                                </div>
                                                <span className="info-value">{eachcustomer.name || '—'}</span>
                                            </div>

                                            {/* Email */}
                                            <div className="info-cell">
                                                <div className="info-label">
                                                    <i className="bi bi-envelope"></i> Email Address
                                                </div>
                                                <span className="info-value">{eachcustomer.email || '—'}</span>
                                            </div>

                                            {/* Mobile */}
                                            <div className="info-cell">
                                                <div className="info-label">
                                                    <i className="bi bi-phone"></i> Mobile Number
                                                </div>
                                                <span className="info-value">{eachcustomer.mobilenumber || '—'}</span>
                                            </div>

                                            {/* Status */}
                                            <div className="info-cell">
                                                <div className="info-label">
                                                    <i className="bi bi-shield-check"></i> Account Status
                                                </div>
                                                <span className={`status-pill ${spClass(eachcustomer.status)}`}>
                                                    <span className="status-dot"></span>
                                                    {eachcustomer.status?.toUpperCase() || 'UNKNOWN'}
                                                </span>
                                            </div>

                                            {/* Address */}
                                            <div className="info-cell full">
                                                <div className="info-label">
                                                    <i className="bi bi-geo-alt"></i> Shipping Address
                                                </div>
                                                <span className="info-value">
                                                    {eachcustomer.address || 'No address provided.'}
                                                </span>
                                            </div>

                                        </div>

                                        {/* ── Action button ── */}
                                        <div className="customer-action-area">
                                            <button
                                                className={`block-btn ${isBlocked ? 'unblock' : 'block'}`}
                                                onClick={() =>
                                                    Blockcustomer(
                                                        eachcustomer.user_id,
                                                        Setallcustomers, 1, 'all', '', Seteachcustomer
                                                    )
                                                }
                                            >
                                                <i className={`bi ${isBlocked ? 'bi-check-circle' : 'bi-slash-circle'}`}></i>
                                                {isBlocked ? 'Unblock Account' : 'Block Account'}
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};