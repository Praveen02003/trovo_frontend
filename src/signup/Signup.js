import React, { useContext, useEffect } from "react";
import "../signup/Signup.css";
import { Link } from "react-router-dom";
import { Createuser } from "../function/Createuser";
import { maincontext } from "../App";
import { Authuser } from "../function/Authuser";

export const Signup = () => {
    const {
        signupname, Setsignupname,
        signupmail, Setsignupmail,
        signuppassword, Setsignuppassword,
        signupconfirmpassword, Setsignupconfirmpassword,
        signupaddress, Setsignupaddress,
        signupmobilenumber, Setsignupmobilenumber,
    } = useContext(maincontext);

    useEffect(() => { Authuser(); }, []);

    return (
        <div className="signup-wrapper">

            {/* ══ LEFT — Brand Panel ══ */}
            <div className="brand-section">
                <div className="brand-inner">
                    <h1 className="brand-name">
                        TROVO<span className="brand-dot">.</span>
                    </h1>
                    <p className="brand-tagline">
                        Your one-stop shop for everything premium.<br />
                        Join thousands of happy shoppers today.
                    </p>
                    <div className="brand-pills">
                        <div className="brand-pill">
                            <i className="bi bi-shield-lock-fill"></i>
                            100% Secure Checkout
                        </div>
                        <div className="brand-pill">
                            <i className="bi bi-truck"></i>
                            Free Worldwide Shipping
                        </div>
                        <div className="brand-pill">
                            <i className="bi bi-arrow-repeat"></i>
                            30-Day Easy Returns
                        </div>
                        <div className="brand-pill">
                            <i className="bi bi-headset"></i>
                            24/7 Expert Support
                        </div>
                    </div>
                </div>
            </div>

            {/* ══ RIGHT — Form Panel ══ */}
            <div className="form-section">
                <div className="signup-card">

                    <div className="signup-card-icon">
                        <i className="bi bi-person-plus-fill"></i>
                    </div>
                    <h3 className="signup-title">Create Account</h3>
                    <p className="signup-sub">Join TROVO and start shopping today.</p>

                    {/* Name + Email */}
                    <div className="field-row">
                        <div>
                            <label className="field-label">Full Name</label>
                            <div className="field-wrap">
                                <i className="bi bi-person field-icon"></i>
                                <input
                                    type="text"
                                    className="field-input"
                                    placeholder="John Doe"
                                    onChange={(e) => Setsignupname(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="field-label">Email Address</label>
                            <div className="field-wrap">
                                <i className="bi bi-envelope field-icon"></i>
                                <input
                                    type="email"
                                    className="field-input"
                                    placeholder="you@email.com"
                                    onChange={(e) => Setsignupmail(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Password + Confirm */}
                    <div className="field-row">
                        <div>
                            <label className="field-label">Password</label>
                            <div className="field-wrap">
                                <i className="bi bi-lock field-icon"></i>
                                <input
                                    type="password"
                                    className="field-input"
                                    placeholder="Create password"
                                    onChange={(e) => Setsignuppassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="field-label">Confirm Password</label>
                            <div className="field-wrap">
                                <i className="bi bi-lock-fill field-icon"></i>
                                <input
                                    type="password"
                                    className="field-input"
                                    placeholder="Re-enter password"
                                    onChange={(e) => Setsignupconfirmpassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mobile */}
                    <div className="field-group">
                        <label className="field-label">Mobile Number</label>
                        <div className="field-wrap">
                            <i className="bi bi-phone field-icon"></i>
                            <input
                                type="text"
                                className="field-input"
                                placeholder="+91 00000 00000"
                                onChange={(e) => Setsignupmobilenumber(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="field-group">
                        <label className="field-label">Delivery Address</label>
                        <div className="field-wrap">
                            <i className="bi bi-geo-alt field-icon"></i>
                            <input
                                type="text"
                                className="field-input"
                                placeholder="Your delivery address"
                                onChange={(e) => Setsignupaddress(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        className="btn-trovo"
                        onClick={() =>
                            Createuser(
                                signupname, signupmail, signuppassword,
                                signupconfirmpassword, signupmobilenumber, signupaddress
                            )
                        }
                    >
                        <i className="bi bi-person-check-fill"></i>
                        Create My Account
                    </button>

                    <p className="signin-prompt">
                        Already have an account?{" "}
                        <Link to="/login" className="trovo-link">Sign In</Link>
                    </p>

                </div>
            </div>

        </div>
    );
};