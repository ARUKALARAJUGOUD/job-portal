import { FaArrowRight, FaBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import API from "../services/api";
import "./JobCard.css";

const JobCard = ({ job, setSelectedJobId, setLetterModal }) => {
  const saveButton = async (jobId) => {
    try {
      const res = await API.post(`/saved-job/add/${jobId}`);
      alert(res.data.message);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const openApplyModal = () => {
    setSelectedJobId(job._id);
    setLetterModal(true);
  };

  return (
    <div className="job-card">
      <div className="job-header">
        <div className="logo-wrapper">
          <img
            src={job.company.logo.url}
            alt={job.company.companyName}
            className="company-logo"
          />
        </div>

        <div className="job-info">
          <h2>{job.title}</h2>
          <h4>{job.company.companyName}</h4>
        </div>
      </div>

      <div className="job-details">
        <div className="job-description">
          <h5>Job Description</h5>

          <p>
            {job.description.length > 140
              ? job.description.substring(0, 140) + "..."
              : job.description}
          </p>
        </div>

        <p>
          <strong>Location :</strong> {job.location}
        </p>

        <p>
          <strong>Experience :</strong> {job.experienceRequired}
        </p>

        <p>
          <strong>Salary :</strong> ₹{job.salary}
        </p>

        <p>
          <strong>Job Type :</strong> {job.employmentType}
        </p>

        <p>
          <strong>Posted :</strong> {job.createdAt.substring(0, 10)}
        </p>
      </div>

      <div className="job-actions">
        <Link to={`/jobs/${job._id}`} className="details-btn">
          View Details <FaArrowRight />
        </Link>

        <button className="save-btn" onClick={openApplyModal}>
          Apply Job
        </button>

        <button className="save-btn" onClick={() => saveButton(job._id)}>
          <FaBookmark />
          Save Job
        </button>
      </div>
    </div>
  );
};

export default JobCard;
