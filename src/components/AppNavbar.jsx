import { Link } from "react-router-dom";

function AppNavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
            <Link className="navbar-brand fw-bold" to="/">
            Job Tracker
            </Link>

            <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav ms-auto">
                    <Link className="nav-link" to="/">
                    Dashboard
                    </Link>
                    <Link className="nav-link" to="/applications">
                    Applications
                    </Link>
                </div>
            </div>
        </div>
    </nav>
  );
}

export default AppNavBar;  
