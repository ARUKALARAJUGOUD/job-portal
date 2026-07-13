// import { useEffect } from "react";
// import API from "../services/api";
// const GetCompanies = () => {
//   useEffect(() => {
//     const FetchedData = async () => {
//       const response = await API.get("/company/get-all-companies");
//       const data = response?.data;
//       console.log(data);
//     };
//     FetchedData();
//   }, []);
//   return (
//     <div>
//       <h1>here we fetch the total companies </h1>
//     </div>
//   );
// };

// export default GetCompanies;



import { useEffect, useState } from "react";
import {
  FaGlobe,
  FaEnvelope,
  FaCalendarAlt,
  FaUserTie,
  FaArrowRight,
} from "react-icons/fa";
import API from "../services/api";
import "../cssStyle/GetCompanies.css";
import { useNavigate } from "react-router-dom";

const GetCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await API.get("/company/get-all-companies");

        setCompanies(response.data.companies);
      } catch (error) {
        alert(error.response?.data?.message || "Unable to fetch companies");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return (
      <div className="get-companies-loading">
        <h2>Loading Companies...</h2>
      </div>
    );
  }

  return (
    <div className="get-companies-page">
      <div className="get-companies-header">
        <h1>Explore Companies</h1>

        <p>
          Discover companies and find your next career opportunity.
        </p>
      </div>

      <div className="get-companies-grid">
        {companies.map((company) => (
          <div
            className="get-company-card"
            key={company._id}
          >
            {/* Company */}

            <div className="get-company-top">
              <img
                src={company.logo?.url}
                alt={company.companyName}
                className="get-company-logo"
              />

              <div>
                <h2>{company.companyName}</h2>

                <span>{company.industry}</span>
              </div>
            </div>

            {/* Recruiter */}

            <div className="get-recruiter-box">
              <img
                src={company.userId.profile?.url}
                alt={company.userId.fullName}
                className="get-recruiter-img"
              />

              <div>
                <h4>{company.userId.fullName}</h4>

                <p>{company.userId.headline}</p>
              </div>
            </div>

            {/* Details */}

            <div className="get-company-details">
              <div>
                <FaEnvelope />

                <span>{company.companyEmail}</span>
              </div>

              <div>
                <FaGlobe />

                <a
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit Website
                </a>
              </div>

              <div>
                <FaCalendarAlt />

                <span>Founded {company.foundedYear}</span>
              </div>

              <div>
                <FaUserTie />

                <span>{company.userId.email}</span>
              </div>
            </div>

            {/* Button */}

            <button
              className="company-view-btn"
              onClick={() =>
                // console.log(company._id)
                navigate(`/company/${company._id}`)
              }
            >
              View Company

              <FaArrowRight />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetCompanies;