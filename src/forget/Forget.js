import React, { useContext, useEffect } from "react";
import "../forget/Forget.css";
import { Link } from "react-router-dom";
import { maincontext } from "../App";
import { Updatepassword } from "../function/Updatepassword";
import { Authuser } from "../function/Authuser";

export const Forget = () => {
    const {
        forgetmail, Setforgetmail,
        forgetpassword, Setforgetpassword,
        forgetconfirmpassword, Setforgetconfirmpassword,
    } = useContext(maincontext);

    useEffect(() => { Authuser(); }, []);

    return (
        <div className="forget-wrapper">

            {/* ══ LEFT — Brand Panel ══ */}
            <div className="brand-section">
                <div className="brand-inner">

                    <h1 className="brand-name">
                        TROVO<span className="brand-dot">.</span>
                    </h1>
                    <p className="brand-tagline">
                        Don't worry — resetting your password is quick and secure.
                    </p>

                    {/* Security card */}
                    <div className="brand-security-card">
                        <div className="bsc-icon">
                            <i className="bi bi-shield-lock-fill"></i>
                        </div>
                        <p className="bsc-title">Your account is safe</p>
                        <p className="bsc-text">
                            We use industry-standard encryption to keep your data secure. Password resets are verified and instant.
                        </p>
                    </div>

                    {/* Steps */}
                    <div className="brand-steps">
                        <div className="brand-step">
                            <div className="step-num">1</div>
                            <span className="step-text">Enter your registered email address</span>
                        </div>
                        <div className="brand-step">
                            <div className="step-num">2</div>
                            <span className="step-text">Choose a strong new password</span>
                        </div>
                        <div className="brand-step">
                            <div className="step-num">3</div>
                            <span className="step-text">Confirm and regain access instantly</span>
                        </div>
                    </div>

                </div>
            </div>

            {/* ══ RIGHT — Form Panel ══ */}
            <div className="form-section">
                <div className="forget-card">

                    <div className="forget-card-icon">
                        <i className="bi bi-key-fill"></i>
                    </div>

                    <h3 className="forget-title">Reset Password</h3>
                    <p className="forget-sub">
                        Enter your registered email and choose a new secure password below.
                    </p>

                    {/* Email */}
                    <div className="field-group">
                        <label className="field-label">Email Address</label>
                        <div className="field-wrap">
                            <i className="bi bi-envelope field-icon"></i>
                            <input
                                type="email"
                                className="field-input"
                                placeholder="you@email.com"
                                onChange={(e) => Setforgetmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* New Password */}
                    <div className="field-group">
                        <label className="field-label">New Password</label>
                        <div className="field-wrap">
                            <i className="bi bi-lock field-icon"></i>
                            <input
                                type="password"
                                className="field-input"
                                placeholder="Create new password"
                                onChange={(e) => Setforgetpassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="field-group">
                        <label className="field-label">Confirm Password</label>
                        <div className="field-wrap">
                            <i className="bi bi-lock-fill field-icon"></i>
                            <input
                                type="password"
                                className="field-input"
                                placeholder="Re-enter new password"
                                onChange={(e) => Setforgetconfirmpassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        className="btn-trovo"
                        onClick={() =>
                            Updatepassword(forgetmail, forgetpassword, forgetconfirmpassword)
                        }
                    >
                        <i className="bi bi-arrow-clockwise"></i>
                        Reset My Password
                    </button>

                    <p className="login-prompt">
                        Remember your password?{" "}
                        <Link to="/login" className="trovo-link">Sign In</Link>
                    </p>

                </div>
            </div>

        </div>
    );
};