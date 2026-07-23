import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBriefcase,
  FaCheckCircle,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../cssStyle/AppliedJobs.css";
import API from "../services/api";

const AppliedJobs = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    const getAppliedJobs = async () => {
      try {
        const res = await API.get("/application/get", {
          withCredentials: true,
        });

        setApplications(res.data.applications);
      } catch (error) {
        console.log(error);

        alert(error.response?.data?.message || "Unable to fetch applied jobs.");
      } finally {
        setLoading(false);
      }
    };

    getAppliedJobs();
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="applied-page">
      <div className="applied-header">
        <h1>Applied Jobs</h1>
        <p>
          You have applied for <strong>{applications.length}</strong> jobs.
        </p>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <h2>No Applications Yet</h2>
          <p>Start applying to jobs and they will appear here.</p>

          <Link to="/jobs" className="browse-btn">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="applications-container">
          {applications.map((application) => (
            <div className="application-card" key={application._id}>
              <div className="application-top">
                <div className="company-box">
                  <img
                    src={application.job.company.logo.url}
                    className="applied-company-logo"
                  />

                  <div>
                    <h2>{application.job.title}</h2>

                    <p className="company-name">
                      {application.job.company.companyName}
                    </p>

                    <p className="company-location">
                      {application.job.company.location}
                    </p>
                  </div>
                </div>

                <span className={`status ${application.status.toLowerCase()}`}>
                  <FaCheckCircle />
                  {application.status}
                </span>
              </div>

              <p className="description">
                {application.job.description.length > 160
                  ? application.job.description.substring(0, 160) + "..."
                  : application.job.description}
              </p>

              <div className="job-info">
                <div>
                  <FaMapMarkerAlt />
                  {application.job.location}
                </div>

                <div>
                  <FaBriefcase />
                  {application.job.employmentType}
                </div>

                <div>
                  <FaMoneyBillWave />₹{application.job.salary.toLocaleString()}
                </div>

                <div>
                  <FaClock />
                  {application.job.workMode}
                </div>
              </div>

              <div className="application-footer">
                <small>
                  Applied on{" "}
                  {new Date(application.createdAt).toLocaleDateString()}
                </small>

                <div className="action-buttons">
                  <a
                    href={application?.candidate?.resumeUrl?.url}
                    target="_blank"
                    rel="noreferrer"
                    className="resume-btn"
                  >
                    Resume
                  </a>

                  <Link
                    to={`/jobs/${application.job._id}`}
                    className="view-btn"
                  >
                    View Details
                    <FaArrowRight />
                  </Link>
                  <button
                    onClick={() => {
                      navigate("/chat", {
                        state: {
                          receiverId: application.job.recruiter,
                          fullName: application?.job?.recruiter.fullName,
                        },
                      });
                    }}
                  >
                    message
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AppliedJobs;
