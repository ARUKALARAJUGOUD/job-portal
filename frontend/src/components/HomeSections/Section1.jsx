import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaBuilding,
  FaArrowRight,
} from "react-icons/fa";

import "../../cssStyle/Home.css";

const Section1 = () => {
  return (
    <div className="about-page">

      {/* ==========================================
          HERO SECTION
      ========================================== */}

      <section className="about-hero">

        {/* Left Side */}

        <div className="about-hero-left">

          {/* Small Badge */}

          <div className="about-badge">

            <FaBriefcase />

            <span>Trusted Career Platform</span>

          </div>

          {/* Main Heading */}

          <h1>

            Connecting

            <span> Talent </span>

            with

            <span> Opportunity</span>

          </h1>

          {/* Description */}

          <p>

            JobSphere is a modern recruitment platform designed to
            connect talented professionals with leading companies.
            Discover your dream career, explore top organizations,
            and build your future with confidence.

          </p>

          {/* Buttons */}

          <div className="about-buttons">

            <Link
              to="/jobs"
              className="primary-btn"
            >
              Browse Jobs

              <FaArrowRight />
            </Link>

            <Link
              to="/companies"
              className="secondary-btn"
            >
              <FaBuilding />

              Explore Companies
            </Link>

          </div>

        </div>

        {/* Right Side */}

        <div className="about-hero-right">

          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900"
            alt="Job Portal"
          />

        </div>

      </section>

    </div>
  );
};

export default Section1;