import { Link } from "react-router-dom";
import "../cssStyle/Footer.css"
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* logo and Description */}
        <div className="footer-section">
          <h2 className="footer-logo">JobSphere</h2>
          <p>
            find your dream job and connect with top companies across the world
            .Build your career with confidence
          </p>
        </div>
        {/* Quick links  */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <Link to="/"> Home </Link>
          <Link to="/jobs"> Jobs </Link>
          <Link to="/companies"> Companies </Link>
          <Link to="/about"> About </Link>
          <Link to="/Contact"> Contact </Link>
        </div>

        {/* contact */}

        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email:support@jobsphere.com</p>
          <p>Phone:+91 1234567890</p>
          <p>India</p>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p>2026 JobSphere. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
