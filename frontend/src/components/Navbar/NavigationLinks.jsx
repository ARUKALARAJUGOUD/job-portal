import {
  FaBriefcase,
  FaBuilding,
  FaChartBar,
  FaHome,
  FaInfoCircle,
  FaSearch,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";
import "../../cssStyle/Navbar/NavigationLinks.css";
const NavigationLinks = () => {
  const { user } = useAuth();
  const navLinks = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Jobs",
      path: "/jobs",
      icon: <FaBriefcase />,
    },
    {
      name: "Companies",
      path: "/get-companies",
      icon: <FaBuilding />,
    },
    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle />,
    },
  ];

  // Dashboard
  if (user?.role === "student") {
    navLinks.push({
      name: "Dashboard",
      path: "/student-dashboard",
      icon: <FaChartBar />,
    });
  }

  if (user?.role === "recruiter") {
    navLinks.push({
      name: "Dashboard",
      path: "/recruiter-dashboard",
      icon: <FaChartBar />,
    });
  }

  if (user?.role === "admin") {
    navLinks.push({
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <FaChartBar />,
    });
  }

  // Search is always last
  navLinks.push({
    name: "Search",
    path: "/search",
    icon: <FaSearch />,
  });
  return (
    <nav className="navbar-navigation">
      {navLinks.map((link) => (
        <NavLink
          key={link.path}
          to={link.path}
          className={({ isActive }) =>
            isActive
              ? "navbar-navigation-link active"
              : "navbar-navigation-link"
          }
        >
          <span className="navbar-navigation-icon">{link.icon}</span>

          <span>{link.name}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default NavigationLinks;
