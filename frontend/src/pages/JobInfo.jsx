
import { useEffect, useState } from "react";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaClock,
  FaGlobe,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUsers,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import "../cssStyle/JobInfo.css";
import API from "../services/api";

const JobInfo = () => {
  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await API.get(`/job/get-job/${id}`);
        setJob(response.data.jobs);
      } catch (error) {
        alert(error.response?.data?.message);
      }
    };

    fetchedData();
  }, [id]);

  if (!job) return <h2 className="job-loading">Loading...</h2>;

  return (
    <div className="job-info-page">
      {/* Company */}

      <div className="company-card">
        <img src={job.company.logo.url} alt="" className="jobInfo-company-logo" />

        <div>
          <h2>{job.company.companyName}</h2>

          <p>{job.company.industry}</p>

          <a href={job.company.website} target="_blank" rel="noreferrer">
            <FaGlobe />
            {job.company.website}
          </a>
        </div>
      </div>

      {/* Job */}

      <div className="job-main-card">
        <h1>{job.title}</h1>

        <div className="job-meta">
          <span>
            <FaMapMarkerAlt />
            {job.location}
          </span>

          <span>
            <FaMoneyBillWave />₹{job.salary.toLocaleString()}
          </span>

          <span>
            <FaBriefcase />
            {job.employmentType}
          </span>

          <span>
            <FaClock />
            {job.workMode}
          </span>

          <span>
            <FaUsers />
            {job.experienceRequired} Years
          </span>

          <span>
            <FaCalendarAlt />
            Deadline :{new Date(job.applicationDeadline).toLocaleDateString()}
          </span>
        </div>

       
      </div>

      {/* Description */}

      <div className="job-section">
        <h2>Description</h2>

        <p>{job.description}</p>
      </div>

      {/* Responsibilities */}

      <div className="job-section">
        <h2>Responsibilities</h2>

        <ul>
          {job.responsibilities.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Requirements */}

      <div className="job-section">
        <h2>Requirements</h2>

        <ul>
          {job.requirements.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>

      {/* Skills */}

      <div className="job-section">
        <h2>Required Skills</h2>

        <div className="skills-container">
          {job.skillsRequired.map((skill, index) => (
            <span className="skill-chip" key={index}>
              {skill.name}
            </span>
          ))}
        </div>
      </div>

      {/* Recruiter */}

      {/* <div  className="recruiter-card"> */}
      {/* <h1>Recruiter Details : </h1>  */}
      {/* <div className="recruiter-card">
        <img
          src={job.recruiter.profile.url}
          alt=""
          className="recruiter-image"
        />

        <div>
          <h2>{job.recruiter.fullName}  </h2>
          <p>{job.recruiter.headline}</p>
          <span>
            <FaEnvelope />
            {job.recruiter.email}
          </span>
          <span>
            <FaPhone />
            {job.recruiter.phoneNumber}
          </span>
        </div>
      </div> */}
      {/* </div> */}
    </div>
  );
};

export default JobInfo;
