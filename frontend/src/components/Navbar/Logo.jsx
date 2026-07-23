import { FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../cssStyle/Navbar/NavbarLogo.css"
const Logo = () => {
  return (
    <Link to="/" className="navbar-logo">

      <div className="navbar-logo-icon">
        <FaBriefcase />
      </div>

      <div className="navbar-logo-text">
        <h2>JobSphere</h2>
        <span>Find Your Dream Career</span>
      </div>

    </Link>
  );
};

export default Logo;