import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Logout } from "../../function/Logout";
import '../sidebar/Sidebar.css';

const NAV_MAIN = [
    { to: '/admindashboard', icon: 'bi-speedometer2', label: 'Dashboard' },
    { to: '/allproduct', icon: 'bi-box-seam', label: 'All Products' },
    { to: '/allbrands', icon: 'bi-patch-check', label: 'All Brands' },
    { to: '/allcategories', icon: 'bi-grid-fill', label: 'Categories' },
    { to: '/customers', icon: 'bi-people', label: 'Customers' },
    { to: '/orders', icon: 'bi-bag-check', label: 'Orders' },
];

const NAV_SYSTEM = [
    { to: '/', icon: 'bi-house', label: 'User Dashboard' },
    { to: '/myprofile/1', icon: 'bi-gear', label: 'Settings' },
];

export const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="admin-sidebar d-none d-md-flex flex-column">

            {/* ── Brand ── */}
            <Link to="/admindashboard" className="sidebar-brand">
                <div className="sidebar-brand-icon">
                    <i className="bi bi-lightning-charge-fill"></i>
                </div>
                <div>
                    <span className="sidebar-brand-text">TROVO</span>
                    <span className="sidebar-brand-sub">Admin Panel</span>
                </div>
            </Link>

            {/* ── Nav ── */}
            <nav className="sidebar-nav">

                {/* Main */}
                <span className="sidebar-section-label">Main Menu</span>
                {NAV_MAIN.map(({ to, icon, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`sidebar-link ${isActive(to) ? 'active' : ''}`}
                    >
                        <i className={`bi ${icon}`}></i>
                        {label}
                    </Link>
                ))}

                <div className="sidebar-divider"></div>

                {/* System */}
                <span className="sidebar-section-label">System</span>
                {NAV_SYSTEM.map(({ to, icon, label }) => (
                    <Link
                        key={to}
                        to={to}
                        className={`sidebar-link ${isActive(to) ? 'active' : ''}`}
                    >
                        <i className={`bi ${icon}`}></i>
                        {label}
                    </Link>
                ))}

                <button
                    className="sidebar-link danger"
                    onClick={Logout}
                >
                    <i className="bi bi-power"></i>
                    Sign Out
                </button>

            </nav>

            {/* ── Footer strip ── */}
            <div className="sidebar-footer">
                <div className="sidebar-footer-icon"></div>
                <span className="sidebar-footer-label">TROVO © 2024</span>
            </div>

        </aside>
    );
};