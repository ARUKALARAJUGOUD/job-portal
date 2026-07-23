
import "./StudentApplicationItem.css";

const statusColors = {
  Applied: "student-application-item-status-applied",
  "Interview Scheduled": "student-application-item-status-interview",
  Selected: "student-application-item-status-selected",
  Rejected: "student-application-item-status-rejected",
};

const ApplicationItem = ({ application }) => {
  return (
    <div className="student-application-item-container">
      <div className="student-application-item-info">
        <h3 className="student-application-item-company">
          {application.job?.company?.name}
        </h3>

        <p className="student-application-item-job-title">
          {application.job?.title}
        </p>

        <p className="student-application-item-date">
          Applied on {new Date(application.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="student-application-item-actions">
        <span
          className={`student-application-item-status ${
            statusColors[application.status] ||
            "student-application-item-status-default"
          }`}
        >
          {application.status}
        </span>

        {/* <Link
          to={`/applications/${application._id}`}
          className="student-application-item-view-button"
        >
          View Details
        </Link> */}
      </div>
    </div>
  );
};

export default ApplicationItem;
