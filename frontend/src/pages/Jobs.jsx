

import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import API from "../services/api";
// import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  const [selectedJobId, setSelectedJobId] = useState(null);
  const [letterModal, setLetterModal] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await API.get("/job/getJobs");
        setJobs(res.data.jobs);
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, []);

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
    <div className="jobs-page">
      <h1>Latest Jobs</h1>

      <div className="jobs-container">
        {jobs.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            setSelectedJobId={setSelectedJobId}
            setLetterModal={setLetterModal}
          />
        ))}
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

              <button
                className="apply-submit-btn"
                onClick={submitApplication}
              >
                Send Application
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Jobs;