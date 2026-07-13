import { useEffect, useRef, useState } from "react";
import {
  FaBars,
  FaBookmark,
  FaBriefcase,
  FaBuilding,
  FaCog,
  FaFileAlt,
  FaKey,
  FaPlusCircle,
  FaSignOutAlt,
  FaTimes,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";
import API from "../services/api";
import "./Navbar.css";
import Logo from "./Navbar/Logo";
// import NavbarSearch from "./Navbar/NavbarSearch";
import NavigationLinks from "./Navbar/NavigationLinks";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const commonMenus = [
    {
      title: "My Profile",
      path: "/profile",
      icon: <FaUser />,
    },
    {
      title: "My Resume",
      path: "/resume",
      icon: <FaFileAlt />,
    },
    {
      title: "Applied Jobs",
      path: "/applied-jobs",
      icon: <FaBriefcase />,
    },
    {
      title: "Saved Jobs",
      path: "/saved-jobs",
      icon: <FaBookmark />,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
    {
      title: "Change Password",
      path: "/change-password",
      icon: <FaKey />,
    },
  ];

  const recruiterMenus = [
    {
      title: "Companies",
      path: "/companies",
      icon: <FaBuilding />,
    },
    {
      title: "Create Job",
      path: "/create-job",
      icon: <FaPlusCircle />,
    },
    {
      title: "My Jobs",
      path: "/my-jobs",
      icon: <FaBriefcase />,
    },
    {
      title: "Applications",
      path: "/job-applications",
      icon: <FaUsers />,
    },
  ];

  const { user } = useAuth();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuRef = useRef();

  const logoutHandler = async () => {
    try {
      const response = await API.post("/user/logout");
      alert(response?.data?.message);
      navigate("/login");
    } catch (error) {
      alert(error?.response?.data.message);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <header className="navbar">
      {/* <div className="logo">
        <Link to="/">JobPortal</Link>
      </div> */}

      <Logo />
     
      {/* <NavbarSearch /> */}
      <NavigationLinks  />
      {/* <NavbarSearch /> */}
     

      <div className="navbar-auth-section">

         <div className="navbar-mobile-button">
        <button onClick={() => setMobileMenuOpen(true)}>
          <FaBars />
        </button>
      </div>

        {!user ? (
          <>
            {/* <Link to="/login" className="navbar-login-btn">
              Login
            </Link> */}

            <Link to="/register" className="navbar-register-btn">
              Register
            </Link>
          </>
        ) : (
          <div className="navbar-profile-menu" ref={menuRef}>
            <button
              className="navbar-profile-button"
              onClick={() => setOpen(!open)}
            >
              <img
                src={user.profile?.url}
                alt={user.fullName}
                className="navbar-profile-image"
              />

              <div className="navbar-profile-info">
                <h4>{user.fullName}</h4>

                <span>{user.role}</span>
              </div>
            </button>

            {open && (
              <div className="navbar-dropdown">
                {/* Common Menu */}

                {commonMenus.map((menu) => (
                  <Link
                    key={menu.path}
                    to={menu.path}
                    className="navbar-dropdown-link"
                  >
                    {menu.icon}

                    <span>{menu.title}</span>
                  </Link>
                ))}

                {user.role === "recruiter" && (
                  <>
                    <div className="navbar-dropdown-divider"></div>

                    <div className="navbar-dropdown-heading">Recruiter</div>

                    {recruiterMenus.map((menu) => (
                      <Link
                        key={menu.path}
                        to={menu.path}
                        className="navbar-dropdown-link"
                      >
                        {menu.icon}

                        <span>{menu.title}</span>
                      </Link>
                    ))}
                  </>
                )}

                <div className="navbar-dropdown-divider"></div>

                <button
                  className="navbar-dropdown-logout"
                  onClick={logoutHandler}
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      
      {mobileMenuOpen && (
        <>
          <div
            className="mobile-nav-overlay"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          <div className="mobile-nav-menu">
            <div className="mobile-nav-header">
              <h3>Navigation</h3>

              <button onClick={() => setMobileMenuOpen(false)}>
                <FaTimes />
              </button>
            </div>

            <NavigationLinks />
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
