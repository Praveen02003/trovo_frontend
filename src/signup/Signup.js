import React, { useContext } from "react";
import "../signup/Signup.css";
import { Link } from "react-router-dom";
import { Createuser } from "../function/Createuser";
import { maincontext } from "../App";
import { Closetoast } from "../function/Closetoast";

export const Signup = () => {
    const {
        signupname,
        Setsignupname,
        signupmail,
        Setsignupmail,
        signuppassword,
        Setsignuppassword,
        signupconfirmpassword,
        Setsignupconfirmpassword,
        signupaddress,
        Setsignupaddress,
        signupmobilenumber,
        Setsignupmobilenumber
    } = useContext(maincontext)
    return (
        <div className="signup-wrapper container-fluid">
            <div className="row vh-100">

                <div className="col-lg-6 d-none d-lg-flex align-items-center justify-content-center brand-section">
                    <div className="text-center text-white">
                        <h1 className="fw-bold">Trovo</h1>
                        <p>Your one-stop shop for everything</p>
                    </div>
                </div>

                <div className="col-lg-6 d-flex align-items-center justify-content-center">

                    <div className="signup-card shadow">

                        <h3 className="fw-bold mb-3">Create Account</h3>

                        <p className="text-muted mb-4">
                            Join Trovo and start shopping today.
                        </p>



                        <div className="mb-3">
                            <label className="form-label small fw-bold">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your name"
                                onChange={(event) => {
                                    Setsignupname(event.target.value)
                                }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-bold">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Enter your email"
                                onChange={(event) => {
                                    Setsignupmail(event.target.value)
                                }}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-bold">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Create password"
                                onChange={(event) => {

                                    Setsignuppassword(event.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Re-Enter Password"
                                onChange={(event) => {
                                    Setsignupconfirmpassword(event.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Mobile Number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Mobile Number"
                                onChange={(event) => {
                                    Setsignupmobilenumber(event.target.value)
                                }}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label small fw-bold">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Address"
                                onChange={(event) => {
                                    Setsignupaddress(event.target.value)
                                }}
                                required
                            />
                        </div>

                        <button className="btn btn-trovo w-100 mb-3" onClick={() => {
                            Createuser(signupname, signupmail, signuppassword, signupconfirmpassword, signupmobilenumber, signupaddress);
                        }}>
                            Create Account
                        </button>
                        <p className="text-center small">
                            Already have an account?{" "}
                            <Link to="/login" className="trovo-link">
                                Login
                            </Link>
                        </p>


                    </div>

                </div>

            </div>
        </div>


    );
};