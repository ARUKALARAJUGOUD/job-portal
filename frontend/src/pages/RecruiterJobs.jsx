import { useEffect, useMemo, useState } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaEdit,
  FaLaptopHouse,
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../cssStyle/RecruiterJobs.css";
import API from "../services/api";

const RecruiterJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/job/recruiter-jobs");
        setJobs(res.data.jobs);
      } catch (err) {
        alert(err.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const deleteJob = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await API.delete(`/job/delete/${id}`);

      setJobs((prev) => prev.filter((job) => job._id !== id));

      alert("Job deleted successfully");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const stats = useMemo(() => {
    return {
      total: jobs.length,
      active: jobs.filter((j) => j.status === "Active").length,
      draft: jobs.filter((j) => j.status === "Draft").length,
      closed: jobs.filter((j) => j.status === "Closed").length,
    };
  }, [jobs]);

  if (loading) return <h2 className="recruiter-loading">Loading Jobs...</h2>;

  return (
    <div className="recruiter-page">
      <div className="recruiter-page-top">
        <div>
          <h1>Recruiter Jobs</h1>
          <p>Manage all jobs posted by you.</p>
        </div>

        <Link to="/create-job" className="recruiter-create-job-btn">
          <FaPlus />
          Create Job
        </Link>
      </div>

      <div className="recruiter-stats">
        <div className="recruiter-stat-card">
          <h2>{stats.total}</h2>
          <p>Total Jobs</p>
        </div>

        <div className="recruiter-stat-card active">
          <h2>{stats.active}</h2>
          <p>Active</p>
        </div>

        <div className="recruiter-stat-card draft">
          <h2>{stats.draft}</h2>
          <p>Draft</p>
        </div>

        <div className="recruiter-stat-card closed">
          <h2>{stats.closed}</h2>
          <p>Closed</p>
        </div>
      </div>

      <div className="recruiter-jobs-list">
        {jobs.map((job) => (
          <div className="recruiter-job-card" key={job._id}>
            <div className="recruiter-job-header">
              <div className="recruiter-company-section">
                <img
                  src={job.company.logo.url}
                  alt={job.company.companyName}
                  className="recruiter-company-logo"
                />

                <div>
                  <h2>{job.title}</h2>

                  <h4>{job.company.companyName}</h4>

                  <p>{job.company.industry}</p>

                  <span
                    className={`recruiter-badge ${job.status.toLowerCase()}`}
                  >
                    {job.status}
                  </span>
                </div>
              </div>

              <div className="recruiter-salary">
                ₹{job.salary.toLocaleString()}
              </div>
            </div>

            <p className="recruiter-description">{job.description}</p>

            <div className="recruiter-job-details">
              <span>
                <FaMapMarkerAlt />
                {job.location}
              </span>

              <span>
                <FaLaptopHouse />
                {job.workMode}
              </span>

              <span>
                <FaBriefcase />
                {job.employmentType}
              </span>

              <span>Experience: {job.experienceRequired} Years</span>

              <span>
                <FaUsers />
                {job.openings} Openings
              </span>

              <span>Applicants: {job.applicantsCount}</span>

              <span>
                <FaCalendarAlt />
                {new Date(job.applicationDeadline).toLocaleDateString()}
              </span>
            </div>

            <div className="recruiter-job-section">
              <h3>Responsibilities</h3>

              <ul>
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="recruiter-job-section">
              <h3>Requirements</h3>

              <ul>
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="recruiter-skills-container">
              {job.skillsRequired.map((skill) => (
                <span key={skill._id} className="recruiter-skill-chip">
                  {skill.name}
                </span>
              ))}
            </div>

            <div className="recruiter-actions">
              <Link
                to={`/application/get/${job._id}`}
                className="recruiter-view-btn"
              >
                View application
              </Link>

              <Link to={`/edit-job/${job._id}`} className="recruiter-edit-btn">
                <FaEdit />
                Edit
              </Link>

              <button
                className="recruiter-delete-btn"
                onClick={() => deleteJob(job._id)}
              >
                <FaTrash />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterJobs;
