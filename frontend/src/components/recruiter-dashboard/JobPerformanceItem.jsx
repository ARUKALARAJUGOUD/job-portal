
import "./JobPerformanceItem.css";

const JobPerformanceItem = ({ job }) => {
  return (
    <div className="job-performance-item-container">
      <div className="job-performance-item-header">
        <div className="job-performance-item-job-info">
          <h3 className="job-performance-item-title">
            {job.title}
          </h3>

          <p className="job-performance-item-location">
            {job.location}
          </p>
        </div>

        <span
          className={`job-performance-item-status ${job.status.toLowerCase()}`}
        >
          {job.status}
        </span>
      </div>

      <div className="job-performance-item-stats-grid">

        <Stat
          label="Applications"
          value={job.totalApplications}
        />

        <Stat
          label="Interviewed"
          value={job.interviewed}
        />

        <Stat
          label="Selected"
          value={job.selected}
        />

        <Stat
          label="Rejected"
          value={job.rejected}
        />

      </div>
    </div>
  );
};

const Stat = ({ label, value }) => {
  return (
    <div className="job-performance-item-stat-card">
      <p className="job-performance-item-stat-label">
        {label}
      </p>

      <h3 className="job-performance-item-stat-value">
        {value || 0}
      </h3>
    </div>
  );
};

export default JobPerformanceItem;