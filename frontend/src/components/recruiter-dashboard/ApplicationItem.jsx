
import { Link } from "react-router-dom";
import "./ApplicationItem.css";

const ApplicationItem = ({ application }) => {
  return (
    <div className="application-item-container">
      <div className="application-item-info">
        <img
          src={application.candidate?.profile?.url || "/default-avatar.png"}
          alt={application.candidate?.fullName}
          className="application-item-avatar"
        />

        <div className="application-item-details">
          <h3 className="application-item-name">
            {application.candidate?.fullName}
          </h3>

          <p className="application-item-job-title">
            {application.job?.title || "Unknown Job"}
          </p>

          <p className="application-item-date">
            {new Date(application.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="application-item-actions">
        <span
          className={`application-item-status ${application.status
            ?.toLowerCase()
            .replace(/\s+/g, "-")}`}
        >
          {application.status}
        </span>

        <Link
          to={`/applications/${application._id}`}
          className="application-item-view-button"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ApplicationItem;