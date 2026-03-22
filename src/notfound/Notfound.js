import React from "react";
import { Link } from "react-router-dom";
import '../notfound/Notfound.css'

export const NotFound = () => {
    return (
        <div className="notfound-container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
            <h1 className="display-1 fw-bold text-danger mb-3">404</h1>
            <h2 className="fw-bold mb-2">Oops! Page Not Found</h2>
            <p className="text-muted mb-4">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link to="/" className="btn btn-primary btn-lg shadow-lg">
                Go Back Home
            </Link>
        </div>
    );
};


