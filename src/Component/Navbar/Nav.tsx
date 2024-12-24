import { Link, useNavigate } from "react-router-dom";

export default function Nav() {
  let navigate = useNavigate();
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link
            style={{
              textDecoration: "none",
              color: "#feaf00",
              fontWeight: "bolder",
              fontSize: "1.2rem",
            }}
            to="/dashboard/home"
          >
            UMS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent1"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent1"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  style={{ textDecoration: "none" }}
                  to="/dashboard/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                  to="/dashboard/userslist"
                >
                  Users List
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                  to="/dashboard/form/adduser"
                >
                  Add User
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  style={{ textDecoration: "none" }}
                  to="/dashboard/form/profile"
                >
                  Profile
                </Link>
              </li>
            </ul>
            <button
              onClick={() => {
                localStorage.removeItem("userToken");
                localStorage.removeItem("userId");
                localStorage.removeItem("Users");
                localStorage.removeItem("userName");
                localStorage.removeItem("userImage");
                navigate("/login");
              }}
              type="button"
              className="btn btn-primary"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
