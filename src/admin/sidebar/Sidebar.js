import { Link, useLocation } from "react-router-dom";
import { Logout } from "../../function/Logout";

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
                        <i className="bi bi-speedometer2 me-3 text-white"></i>Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/allproduct'} className=
                        {location.pathname === "/allproduct" ? "nav-link text-white bg-primary rounded shadow-sm"
                            : "nav-link text-white-50"}>
                        <i className="bi bi-box-seam me-3 text-white"></i>All Products
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/allbrands'} className=
                        {location.pathname === "/allbrands" ? "nav-link text-white bg-primary rounded shadow-sm"
                            : "nav-link text-white-50"}>
                        <i className="bi bi-patch-check me-2 text-white"></i>All Brands
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/allcategories'} className=
                        {location.pathname === "/allcategories" ? "nav-link text-white bg-primary rounded shadow-sm"
                            : "nav-link text-white-50"}>
                        <i className="bi bi-grid-fill me-2 text-white"></i>All Categories
                    </Link>
                </li>

                <li className="nav-item">
                    <Link className=
                        {location.pathname === "/customers" ? "nav-link text-white bg-primary rounded shadow-sm"
                            : "nav-link text-white-50"} to={'/customers'}>
                        <i className="bi bi-people me-3 text-white"></i>Customers
                    </Link>
                </li>

                <li className="nav-item">
                    <Link to={'/orders'} className=
                        {location.pathname === "/orders" ? "nav-link text-white bg-primary rounded shadow-sm"
                            : "nav-link text-white-50"}>
                        <i className="bi bi-bag-check me-3 text-white"></i>Orders
                    </Link>
                </li>


                <hr className="text-secondary" />
                <li className="nav-item">
                    <Link to={'/'} className=
                        {location.pathname === "/" ? "nav-link text-white bg-primary rounded shadow-sm"
                            : "nav-link text-white-50"}>
                        <i className="bi bi-speedometer2 me-3 text-white"></i>UserDashboard
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to={'/myprofile/1'} className=
                        {location.pathname === "/myprofile/1" ? "nav-link text-white bg-primary rounded shadow-sm"
                            : "nav-link text-white-50"}>
                        <i className="bi bi-gear me-3 text-white"></i>Settings
                    </Link>
                </li>
                <li className="nav-item">
                    <button className="nav-link text-white-50" onClick={() => {
                        Logout();
                    }}>
                        <i className="bi bi-power me-3 text-white"></i>
                            Sign Out
                    </button>
                </li>
            </ul>
        </div>
    );
};