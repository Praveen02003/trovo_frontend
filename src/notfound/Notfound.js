import React from "react";
import { Link } from "react-router-dom";
import '../notfound/Notfound.css';

export const NotFound = () => {
    return (
        <div className="notfound-container">

            {/* Floating orbs */}
            <div className="nf-orb nf-orb-1"></div>
            <div className="nf-orb nf-orb-2"></div>

            <div className="nf-content">

                {/* 404 */}
                <h1 className="nf-number">404</h1>

                {/* Title */}
                <h2 className="nf-title">Page Not Found</h2>

                {/* Subtitle */}
                <p className="nf-sub">
                    The page you're looking for might have been removed, renamed,
                    or is temporarily unavailable.
                </p>

                {/* Buttons */}
                <div className="nf-actions">
                    <Link to="/" className="nf-btn-primary">
                        <i className="bi bi-house-fill"></i>
                        Go Back Home
                    </Link>
                    <Link to="/shop" className="nf-btn-ghost">
                        <i className="bi bi-bag"></i>
                        Browse Shop
                    </Link>
                </div>

            </div>
        </div>
    );
};