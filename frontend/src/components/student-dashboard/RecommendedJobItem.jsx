
import {
  Building2,
  MapPin,
  IndianRupee,
  Flame,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./RecommendedJobItem.css";

const RecommendedJobItem = ({ job }) => {
  const companyName = job?.company?.companyName || "Unknown Company";

  const jobTitle = job?.title || "Job Title";

  const location = job?.location || "Not Specified";

  const salary = job?.salary
    ? `₹${job.salary.toLocaleString()}`
    : "Negotiable";

  const matchPercentage = job?.matchPercentage ?? 0;

  return (
    <div className="recommended-job-item-container">
      <div className="recommended-job-item-content">

        <div className="recommended-job-item-company">

          <div className="recommended-job-item-company-icon">
            <Building2 size={20} />
          </div>

          <div>

            <h3 className="recommended-job-item-company-name">
              {companyName}
            </h3>

            <p className="recommended-job-item-title">
              {jobTitle}
            </p>

          </div>

        </div>

        <div className="recommended-job-item-meta">

          <div className="recommended-job-item-meta-card">
            <MapPin size={16} />

            <span>{location}</span>
          </div>

          <div className="recommended-job-item-meta-card">
            <IndianRupee size={16} />

            <span>{salary}</span>
          </div>

          <div className="recommended-job-item-meta-card recommended-job-item-match">
            <Flame size={16} />

            <span>{matchPercentage}% Match</span>
          </div>

        </div>

      </div>

      <Link
        to={`/jobs/${job?._id || ""}`}
        className="recommended-job-item-button"
      >
        View Job
      </Link>
    </div>
  );
};

export default RecommendedJobItem;