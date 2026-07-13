import { Link } from "react-router-dom";
import "../components/Navbar.css"
const StudentDashboardNavbar = () => {
  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">JobPortal</Link>
      </div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        <Link to="/companies">Companies</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className="auth-buttons">
        <Link to="/profile" className="login-btn">
          profile
        </Link>

        <button className="register-btn">logout</button>
      </div>
    </header>
  );
};

export default StudentDashboardNavbar;
