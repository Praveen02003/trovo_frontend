import React, { useContext } from "react";
import "../forget/Forget.css";
import { Link } from "react-router-dom";
import { maincontext } from "../App";
import { Closetoast } from "../function/Closetoast";
import { Updatepassword } from "../function/Updatepassword";

export const Forget = () => {
    const {
        showtoast,
        Setshowtoast,
        toastcolor,
        Settoastcolor,
        toastmessage,
        Settoastmessage,
        forgetmail,
        Setforgetmail,
        forgetpassword,
        Setforgetpassword,
        forgetconfirmpassword,
        Setforgetconfirmpassword
    } = useContext(maincontext)
    return (
        <div className="forget-wrapper container-fluid">
            <div className="row vh-100">

                {/* Left Section */}
                <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center brand-section">
                    <div className="text-center text-white">
                        <h1 className="fw-bold">Trovo</h1>
                        <p>Your one-stop shop for everything</p>
                    </div>
                </div>

                {/* Right Section */}
                <div className="col-lg-6 d-flex align-items-center justify-content-center">

                    <div className="forget-card shadow">

                        <h3 className="fw-bold mb-3">Forgot Password</h3>

                        <p className="text-muted mb-4">
                            Enter your email address and we will send you a reset link.
                        </p>



                        <div className="mb-3">
                            <label className="form-label small fw-bold">
                                Email Address
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                onChange={(event) => {
                                    Setforgetmail(event.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                onChange={(event) => {
                                    Setforgetpassword(event.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">
                                Confirm-Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter your confirm-password"
                                onChange={(event) => {
                                    Setforgetconfirmpassword(event.target.value)
                                }}
                                required
                            />
                        </div>

                        <button className="btn btn-trovo w-100 mb-3" onClick={() => {
                            Updatepassword(forgetmail, forgetpassword, forgetconfirmpassword, Setshowtoast, Settoastmessage, Settoastcolor)
                        }}>
                            Send Reset Link
                        </button>

                        <p className="text-center small">
                            Remember your password?{" "}
                            <Link to="/" className="trovo-link">
                                Login
                            </Link>
                        </p>


                    </div>

                </div>

            </div>
            {showtoast && (
                <div className="toast-container position-fixed top-0 end-0 p-3">

                    <div className={`toast show text-bg-${toastcolor} border-0`}>

                        <div className="d-flex">

                            <div className="toast-body">
                                {toastmessage}
                            </div>

                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => {
                                    Closetoast(Setshowtoast)
                                }}
                            ></button>

                        </div>

                    </div>

                </div>
            )}
        </div>
    );
};