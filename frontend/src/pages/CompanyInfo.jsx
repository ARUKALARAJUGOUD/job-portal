// import { useParams } from "react-router-dom";

// const CompanyInfo = () => {
//   const { id } = useParams();
//   return (
//     <div>
//       <h1>company id : {id} </h1>
//     </div>
//   );
// };

// export default CompanyInfo;

import { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaEnvelope,
  FaGithub,
  FaGlobe,
  FaIndustry,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
  FaUsers,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

import "../cssStyle/CompanyInfo.css";
import API from "../services/api";

const CompanyInfo = () => {
  const { id } = useParams();

  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        setLoading(true);

        // Temporary
        // Later change this to:
        // const response = await API.get(`/company/${id}`);

        const response = await API.get("/company/get-all-companies");

        const foundCompany = response.data.companies.find(
          (item) => item._id === id,
        );

        setCompany(foundCompany);
      } catch (error) {
        alert(error.response?.data?.message || "Unable to fetch company");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <div className="company-info-loading">
        <h2>Loading Company...</h2>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="company-not-found">
        <h2>Company Not Found</h2>
      </div>
    );
  }

  return (
    <div className="company-info-page">
      {/* ================= HERO ================= */}

      <div className="company-banner">
        <div className="company-banner-left">
          <img
            src={company.logo?.url}
            alt={company.companyName}
            className="company-main-logo"
          />

          <div>
            <h1>{company.companyName}</h1>

            <span>{company.industry}</span>

            <a href={company.website} target="_blank" rel="noreferrer">
              {company.website}
            </a>
          </div>
        </div>
      </div>

      {/* ================= ABOUT ================= */}

      <div className="company-section">
        <h2>About Company</h2>

        <p>
          {company.description ||
            "No description has been added for this company yet."}
        </p>
      </div>

      {/* ================= DETAILS ================= */}

      <div className="company-section">
        <h2>Company Details</h2>

        <div className="company-details-grid">
          <div>
            <FaIndustry />

            <span>
              <strong>Industry</strong>

              {company.industry}
            </span>
          </div>

          <div>
            <FaEnvelope />

            <span>
              <strong>Email</strong>

              {company.companyEmail}
            </span>
          </div>

          <div>
            <FaCalendarAlt />

            <span>
              <strong>Founded</strong>

              {company.foundedYear}
            </span>
          </div>

          <div>
            <FaUsers />

            <span>
              <strong>Employees</strong>

              {company.totalEmployees || "Not Available"}
            </span>
          </div>

          <div>
            <FaUsers />

            <span>
              <strong>Company Size</strong>

              {company.companySize || "Not Available"}
            </span>
          </div>

          <div>
            <FaMapMarkerAlt />

            <span>
              <strong>Headquarters</strong>

              {company.headquarters || "Not Available"}
            </span>
          </div>

          <div>
            <FaMapMarkerAlt />

            <span>
              <strong>Locations</strong>

              {company.location?.length
                ? company.location.join(", ")
                : "Not Available"}
            </span>
          </div>

          <div>
            <FaGlobe />

            <span>
              <strong>Website</strong>

              <a href={company.website} target="_blank" rel="noreferrer">
                Visit Website
              </a>
            </span>
          </div>
        </div>
      </div>

      {/* ================= RECRUITER ================= */}

      <div className="company-section">
        <h2>Recruiter</h2>

        <div className="recruiter-card">
          <img
            src={company.userId.profile?.url}
            alt={company.userId.fullName}
            className="recruiter-profile"
          />

          <div>
            <h3>{company.userId.fullName}</h3>

            <p>{company.userId.headline}</p>

            <div className="recruiter-contact">
              <div>
                <FaEnvelope />

                {company.userId.email}
              </div>

              <div>
                <FaPhone />

                {company.userId.phoneNumber}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SOCIAL ================= */}

      <div className="company-section">
        <h2>Social Links</h2>

        <div className="social-links">
          {company.socialLinks?.linkedin && (
            <a
              href={company.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin />
              LinkedIn
            </a>
          )}

          {company.socialLinks?.twitter && (
            <a
              href={company.socialLinks.twitter}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter />
              Twitter
            </a>
          )}

          {company.socialLinks?.github && (
            <a
              href={company.socialLinks.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub />
              GitHub
            </a>
          )}

          {!company.socialLinks?.linkedin &&
            !company.socialLinks?.twitter &&
            !company.socialLinks?.github && <p>No social links available.</p>}
        </div>
      </div>
    </div>
  );
};

export default CompanyInfo;
