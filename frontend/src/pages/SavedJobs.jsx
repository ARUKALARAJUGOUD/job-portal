import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBookmark,
  FaBriefcase,
  FaClock,
  FaMapMarkerAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../cssStyle/SavedJobs.css";
import API from "../services/api";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);


  const removeSavedJob = async (jobId) => {
  try {
    await API.delete(`/saved-job/remove/${jobId}`);

    setSavedJobs((prev) =>
      prev.filter((item) => item.job?._id !== jobId)
    );
  } catch (error) {
    alert(error.response?.data?.message);
  }
};
  
  useEffect(() => {
    const getSavedJobs = async () => {
      try {
        const res = await API.get("/saved-job/get-saved-jobs");

        setSavedJobs(res.data.jobs);
      } catch (err) {
        alert(err.response?.data?.message || "Unable to fetch saved jobs.");
      } finally {
        setLoading(false);
      }
    };

    getSavedJobs();
  }, []);

  if (loading) return null;

  return (
    <div className="saved-page">
      <div className="saved-header">
        <h1>Saved Jobs</h1>

        <p>
          You have <strong>{savedJobs?.length}</strong> saved jobs.
        </p>
      </div>

      {savedJobs?.length === 0 ? (
        <div className="saved-empty">
          <FaBookmark className="empty-icon" />

          <h2>No Saved Jobs</h2>

          <p>Save interesting jobs and apply later.</p>

          <Link to="/jobs" className="browse-btn">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="saved-container">
          {savedJobs?.map((item) => {
            const job = item.job;

            return (
              <div className="saved-card" key={item._id}>
                <div className="saved-top">
                  <div className="saved-company">
                    <img
                      src={job?.company.logo.url}
                      alt={job?.company.companyName}
                      className="saved-logo"
                    />

                    <div>
                      <h2>{job?.title}</h2>

                      <h4>{job?.company?.companyName}</h4>

                      <span>{job?.company?.location}</span>
                    </div>
                  </div>

                  {/* <div className="saved-badge">
                    <FaBookmark />
                    Saved
                  </div> */}
                </div>

                <p className="saved-description">
                  {job?.description?.length > 180
                    ? job?.description.substring(0, 180) + "..."
                    : job?.description}
                </p>

                <div className="saved-info">
                  <div>
                    <FaMapMarkerAlt />

                    {job?.location}
                  </div>

                  <div>
                    <FaBriefcase />

                    {job?.employmentType}
                  </div>

                  <div>
                    {/* <FaMoneyBillWave />₹{job.salary.toLocaleString()} */}
                  </div>

                  <div>
                    <FaClock />

                    {job.workMode}
                  </div>
                </div>

                <div className="saved-footer">
                  <small>
                    Saved on {new Date(item.createdAt).toLocaleDateString()}
                  </small>

                  <div className="saved-actions">
                    <Link to={`/jobs/${job._id}`} className="view-btn">
                      View Details
                      <FaArrowRight />
                    </Link>

                    <button
                      className="remove-save-btn"
                      onClick={() => removeSavedJob(job._id)}
                    >
                      <FaTrashAlt />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
