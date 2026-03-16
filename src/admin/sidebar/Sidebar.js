import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
    const location = useLocation();
    return (
        <div
            className="bg-dark text-white vh-100 p-3 d-none d-md-block shadow"
            style={{ width: "260px", position: "sticky", top: 0 }}
        >
            {/* Sidebar */}

            <div className="d-flex align-items-center mb-4 ps-2">
                <i className="bi bi-lightning-charge-fill fs-3 text-warning me-2"></i>
                <h4 className="m-0 fw-bold">Trovo Admin</h4>
            </div>

            <ul className="nav flex-column gap-2">
                <li className="nav-item">
                    <Link to={'/admindashboard'} className=
                        {location.pathname === "/admindashboard" ? "nav-link text-white bg-primary rounded shadow-sm"
                            : "nav-link text-white-50"}>
                        <i className="bi bi-speedometer2 me-3"></i>Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/allproduct'} className=
                        {location.pathname === "/allproduct" ? "nav-link text-white bg-primary rounded shadow-sm"
                            : "nav-link text-white-50"}>
                        <i className="bi bi-box-seam me-3"></i>All Products
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/addproduct'} className=
                        {location.pathname === "/addproduct" ? "nav-link text-white bg-primary rounded shadow-sm"
                            : "nav-link text-white-50"}>
                        <i className="bi bi-box-seam me-3"></i>Add Product
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white-50">
                        <i className="bi bi-bag-check me-3"></i>Orders
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white-50">
                        <i className="bi bi-people me-3"></i>Customers
                    </Link>
                </li>

                <hr className="text-secondary" />

                <li className="nav-item">
                    <Link className="nav-link text-white-50">
                        <i className="bi bi-graph-up me-3"></i>Reports
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className="nav-link text-white-50">
                        <i className="bi bi-gear me-3"></i>Settings
                    </Link>
                </li>
            </ul>
        </div>
    );
};