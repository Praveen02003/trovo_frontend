import React, { useContext } from "react";
import "../login/Login.css";
import { useNavigate } from 'react-router-dom';

import { Link } from "react-router-dom";
import { maincontext } from "../App";
import { Verifyuser } from "../function/Verifyuser";
import { Closetoast } from "../function/Closetoast";

export const Login = () => {
    const {
        loginmail,
        Setloginmail,
        loginpassword,
        Setloginpassword
    } = useContext(maincontext)

    const navigate = useNavigate();
    return (
        <div className="container-fluid vh-100 login-wrapper">
            <div className="row h-100">

                {/* Left Brand Section */}
                <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center brand-section">
                    <div className="text-center text-white">
                        <h1 className="fw-bold">Trovo</h1>
                        <p className="mt-3">Your one-stop shop for everything.</p>
                    </div>
                </div>

                {/* Login Form */}
                <div className="col-lg-6 d-flex align-items-center justify-content-center bg-white">
                    <div className="login-card shadow">

                        <h3 className="fw-bold mb-3">Welcome Back</h3>
                        <p className="text-muted mb-4">
                            Please enter your details to continue shopping
                        </p>


                        <div className="mb-3">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Email Address"
                                onChange={(event) => {
                                    Setloginmail(event.target.value)
                                }}
                                required
                            />
                        </div>

                        <div className="mb-2">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Password"
                                onChange={(event) => {
                                    Setloginpassword(event.target.value)
                                }}
                                required
                            />
                        </div>

                        {/* Forgot Password */}
                        <div className="text-end mb-3">
                            <Link to="/forgetpassword" className="trovo-link small">
                                Forgot Password?
                            </Link>
                        </div>

                        <button type="submit" className="btn btn-trovo w-100 mb-3" onClick={() => {
                            Verifyuser(loginmail, loginpassword, navigate)
                        }}>
                            Login
                        </button>

                        <p className="text-center small">
                            Create an account?{" "}
                            <Link to="/signup" className="trovo-link">
                                Signup
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};