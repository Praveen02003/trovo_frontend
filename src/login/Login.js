import React, { useContext, useEffect } from "react";
import "../login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import { maincontext } from "../App";
import { Verifyuser } from "../function/Verifyuser";
import { Authuser } from "../function/Authuser";

export const Login = () => {
    const {
        loginmail, Setloginmail,
        loginpassword, Setloginpassword,
    } = useContext(maincontext);

    const navigate = useNavigate();

    useEffect(() => { Authuser(); }, []);

    return (
        <div className="login-wrapper">

            {/* ══ LEFT — Brand Panel ══ */}
            <div className="brand-section">
                <div className="brand-orb"></div>
                <div className="brand-inner">

                    <h1 className="brand-name">
                        TROVO<span className="brand-dot">.</span>
                    </h1>
                    <p className="brand-tagline">
                        Your one-stop shop for everything premium.<br />
                        Sign in to continue your journey.
                    </p>

                    {/* Stats */}
                    <div className="brand-stats">
                        <div className="brand-stat-item">
                            <span className="bstat-num">50k+</span>
                            <span className="bstat-label">Happy Customers</span>
                        </div>
                        <div className="brand-stat-divider"></div>
                        <div className="brand-stat-item">
                            <span className="bstat-num">10k+</span>
                            <span className="bstat-label">Products</span>
                        </div>
                        <div className="brand-stat-divider"></div>
                        <div className="brand-stat-item">
                            <span className="bstat-num">98%</span>
                            <span className="bstat-label">Satisfaction</span>
                        </div>
                    </div>

                    {/* Trust pills */}
                    <div className="brand-pills">
                        <div className="brand-pill">
                            <i className="bi bi-shield-lock-fill"></i>
                            100% Secure Login
                        </div>
                        <div className="brand-pill">
                            <i className="bi bi-lightning-charge-fill"></i>
                            Instant Order Access
                        </div>
                        <div className="brand-pill">
                            <i className="bi bi-award-fill"></i>
                            Exclusive Member Deals
                        </div>
                    </div>

                </div>
            </div>

            {/* ══ RIGHT — Form Panel ══ */}
            <div className="form-section">
                <div className="login-card">

                    <div className="login-card-icon">
                        <i className="bi bi-person-fill"></i>
                    </div>

                    <h3 className="login-title">Welcome Back</h3>
                    <p className="login-sub">
                        Enter your credentials to access your account and continue shopping.
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
                                onChange={(e) => Setloginmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div className="field-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                            <label className="field-label" style={{ margin: 0 }}>Password</label>
                            <Link to="/forgetpassword" className="forgot-link">
                                Forgot Password?
                            </Link>
                        </div>
                        <div className="field-wrap">
                            <i className="bi bi-lock field-icon"></i>
                            <input
                                type="password"
                                className="field-input"
                                placeholder="Enter your password"
                                onChange={(e) => Setloginpassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        className="btn-trovo"
                        onClick={() => Verifyuser(loginmail, loginpassword, navigate)}
                    >
                        <i className="bi bi-box-arrow-in-right"></i>
                        Sign In
                    </button>

                    <p className="signup-prompt">
                        Don't have an account?{" "}
                        <Link to="/signup" className="trovo-link">Create one</Link>
                    </p>

                </div>
            </div>

        </div>
    );
};