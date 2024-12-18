import { Link } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { CiBellOn } from "react-icons/ci";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid nav-Style">
          <Link style={{ textDecoration: "none" }} to="/dashboard/home">
            <FaRegArrowAltCircleLeft size={30} style={{ color: "#C4C4C4" }} />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent2"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent2"
          >
            <form className="d-flex p-3" role="search">
              <input
                className="input-form-login input-form-Navbar me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <CiBellOn size={38} style={{ color: "#C4C4C4" }} />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}
