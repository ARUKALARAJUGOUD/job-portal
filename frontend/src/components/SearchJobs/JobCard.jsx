// import {
//   FaBriefcase,
//   FaBuilding,
//   FaClock,
//   FaMapMarkerAlt,
//   FaMoneyBillWave,
// } from "react-icons/fa";

// import { Link } from "react-router-dom";

// import "../../cssStyle/Search/JobCard.css";

// const JobCard = ({ job }) => {
//   const postedDate = new Date(job.createdAt).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

//   return (
//     <div className="job-card">

//       {/* Company Logo */}

//       <div className="job-card-logo">

//         <img
//           src={job.company?.logo?.url}
//           alt={job.company?.companyName}
//         />

//       </div>

//       {/* Content */}

//       <div className="job-card-content">

//         <div className="job-card-header">

//           <div>

//             <h2>{job.title}</h2>

//             <h4>
//               <FaBuilding />
//               {job.company?.companyName}
//             </h4>

//           </div>

//           <span
//             className={`job-status ${job.status.toLowerCase()}`}
//           >
//             {job.status}
//           </span>

//         </div>

//         {/* Job Information */}

//         <div className="job-card-info">

//           <span>
//             <FaMapMarkerAlt />
//             {job.location}
//           </span>

//           <span>
//             <FaMoneyBillWave />
//             ₹{(job.salary / 100000).toFixed(1)} LPA
//           </span>

//           <span>
//             <FaBriefcase />
//             {job.experienceRequired} Years
//           </span>

//           <span>
//             <FaClock />
//             {job.workMode}
//           </span>

//         </div>

//         {/* Skills */}

//         <div className="job-card-skills">

//           {job.skillsRequired?.map((skill) => (
//             <span key={skill._id}>
//               {skill.name}
//             </span>
//           ))}

//         </div>

//         {/* Footer */}

//         <div className="job-card-footer">

//           <p>
//             Posted on {postedDate}
//           </p>

//           <div className="job-card-buttons">

//             <Link
//               to={`/jobs/${job._id}`}
//               className="job-details-btn"
//             >
//               View Details
//             </Link>

//             <Link
//               to={`/jobs/${job._id}`}
//               className="job-apply-btn"
//             >
//               Apply Now
//             </Link>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// };

// export default JobCard;

import {
  FaBriefcase,
  FaBuilding,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import { useState } from "react";
import "../../cssStyle/Search/JobCard.css";
import API from "../../services/api"
const JobCard = ({ job }) => {
  const postedDate = new Date(job.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

 const [selectedJobId, setSelectedJobId] = useState(null);
  const [letterModal, setLetterModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");


  const openApplyModal = () => {
    setSelectedJobId(job._id);
    setLetterModal(true);
  };


   const submitApplication = async () => {
      try {
        const response = await API.post(
          `/application/create/${selectedJobId}`,
          {
            coverLetter,
          }
        );
  
        alert(response.data.message);
  
        setLetterModal(false);
        setCoverLetter("");
        setSelectedJobId(null);
      } catch (err) {
        alert(err.response?.data?.message);
      }
    };



  return (
    <>
      <div className="job-search-card-container">
        {/* Company Logo */}

        <div className="job-search-card-logo">
          <img src={job.company?.logo?.url} alt={job.company?.companyName} />
        </div>

        {/* Content */}

        <div className="job-search-card-content">
          <div className="job-search-card-header">
            <div>
              <h2>{job.title}</h2>

              <h4>
                <FaBuilding />
                {job.company?.companyName}
              </h4>
            </div>

            <span
              className={`job-search-card-status ${job.status.toLowerCase()}`}
            >
              {job.status}
            </span>
          </div>

          {/* Information */}

          <div className="job-search-card-info">
            <span>
              <FaMapMarkerAlt />
              {job.location}
            </span>

            <span>
              <FaMoneyBillWave />₹{(job.salary / 100000).toFixed(1)} LPA
            </span>

            <span>
              <FaBriefcase />
              {job.experienceRequired} Years
            </span>

            <span>
              <FaClock />
              {job.workMode}
            </span>
          </div>

          {/* Skills */}

          <div className="job-search-card-skills">
            {job.skillsRequired?.map((skill) => (
              <span key={skill._id}>{skill.name}</span>
            ))}
          </div>

          {/* Footer */}

          <div className="job-search-card-footer">
            <p>Posted on {postedDate}</p>

            <div className="job-search-card-actions">
              <Link
                to={`/jobs/${job._id}`}
                className="job-search-card-details-btn"
              >
                View Details
              </Link>

              {/* <button
              // to={`/jobs/${job._id}`}
              onClick={()=>{alert("successfully applied job ")}}
              className="job-search-card-apply-btn"
            >
              Apply Now
            </button> */}

              <button className="save-btn" onClick={openApplyModal}>
                Apply Job
              </button>
            </div>
          </div>
        </div>
      </div>
      {letterModal && (
        <>
          <div
            className="apply-overlay"
            onClick={() => setLetterModal(false)}
          ></div>

          <div className="apply-modal">
            <h2>Apply for Job</h2>

            <p>Write your cover letter.</p>

            <textarea
              placeholder="Write your cover letter..."
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
            />

            <div className="apply-modal-buttons">
              <button
                className="apply-cancel-btn"
                onClick={() => setLetterModal(false)}
              >
                Cancel
              </button>

              <button className="apply-submit-btn" onClick={submitApplication}>
                Send Application
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobCard;
