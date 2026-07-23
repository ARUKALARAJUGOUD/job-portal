import { useEffect, useState } from "react";
import { FaEnvelope, FaFilePdf, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../cssStyle/JobApplications.css";
import API from "../services/api";
const JobApplications = () => {
  const [applications, setApplications] = useState([]);

  const navigate = useNavigate();
  const [showInterviewModal, setShowInterviewModal] = useState(false);

  const [selectedApplication, setSelectedApplication] = useState(null);

  const [interviewData, setInterviewData] = useState({
    scheduleAt: "",
    time: "",
    mode: "Online",
    link: "",
    venue: "",
    interviewStatus: "Scheduled",
  });

  const updateStatus = async (applicationId, status) => {
    if (status === "Interview") {
      setSelectedApplication(applicationId);
      setShowInterviewModal(true);
      return;
    }

    try {
      await API.patch(`/application/update/${applicationId}`, {
        status,
      });

      alert("Status Updated");

      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  const interviewChangeHandler = (e) => {
    setInterviewData((prev) => ({
      ...prev,

      [e.target.name]: e.target.value,
    }));
  };

  const scheduleInterview = async () => {
    try {
      await API.patch(
        `/application/update/${selectedApplication}`,

        {
          status: "Interview",

          ...interviewData,
        },
      );

      alert("Interview Scheduled Successfully");

      setShowInterviewModal(false);

      window.location.reload();
    } catch (err) {
      // alert(err.response?.data?.message);
      console.log(err.response?.data);
      alert(err.response?.data?.errorMessage);
    }
  };

  useEffect(() => {
    const fetchedData = async () => {
      try {
        const response = await API.get(
          "/application/get-recruiter-application",
        );
        setApplications(response?.data?.applications);
      } catch (error) {
        alert(error?.response?.data.message);
      }
    };

    fetchedData();
  }, []);

  return (
    <div>
      <h1>Job applications </h1>
      {applications.map((applicant) => (
        // <p>{applicant.candidate.fullName}</p>
        <div className="recruiter-app-card" key={applicant._id}>
          <div className="recruiter-app-header">
            <div className="candidate-profile">
              <img
                src={
                  applicant.candidate.profile?.url ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={applicant.candidate.fullName}
                className="candidate-avatar"
              />

              <div>
                <h2>{applicant.candidate.fullName}</h2>

                <p>{applicant.candidate.headline}</p>

                <span>
                  <FaMapMarkerAlt />
                  {applicant.candidate.location}
                </span>
              </div>
            </div>

            <span className={`status-badge ${applicant.status.toLowerCase()}`}>
              {applicant.status}
            </span>
          </div>

          <div className="candidate-contact">
            <span>
              <FaEnvelope />
              {applicant.candidate.email}
            </span>

            <span>
              <FaPhone />
              {applicant.candidate.phoneNumber}
            </span>
          </div>

          <div className="job-information">
            <div>
              <strong>Job</strong>
              <p>{applicant.job.title}</p>
            </div>

            <div>
              <strong>Company</strong>
              <p>{applicant.company.companyName}</p>
            </div>

            <div>
              <strong>Experience</strong>
              <p>{applicant.candidate.experienceYears} Years</p>
            </div>

            <div>
              <strong>Expected Salary</strong>
              <p>₹{applicant?.candidate?.expectedSalary?.toLocaleString()}</p>
            </div>

            <div>
              <strong>Applied On</strong>
              <p>{new Date(applicant.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="candidate-about">
            <h4>About</h4>

            <p>{applicant.candidate.about}</p>
          </div>

          <div className="candidate-cover">
            <h4>Cover Letter</h4>

            <p>{applicant.coverLetter}</p>
          </div>

          <div className="candidate-buttons action-buttons">
            <a
              href={applicant.candidate?.resumeUrl?.url}
              target="_blank"
              rel="noreferrer"
              className="resume-btn"
            >
              <FaFilePdf />
              Resume
            </a>

            <button
              onClick={() =>
                navigate("/chat", {
                  state: {
                    receiverId: applicant.candidate._id,
                    fullName: applicant?.candidate.fullName,
                  },
                })
              }
            >
              message
            </button>
            {/* <Link to={`/applications/${applicant._id}`} className="details-btn">
              View Details
            </Link> */}

            {/* <button className="interview-btn">
              <FaCalendarAlt />
              Interview
            </button> */}

            <select
              value={applicant.status}
              onChange={(e) => updateStatus(applicant._id, e.target.value)}
            >
              <option>Applied</option>

              {/* <option>Under Review</option> */}

              <option value="Shortlisted">Shortlisted</option>

              <option value="Interview">Interview</option>

              <option value="Selected">Selected</option>

              <option value="Rejected">Rejected</option>
            </select>

            {/* <button className="profile-btn">
              <FaUserTie />
              Profile
            </button> */}
          </div>
        </div>
      ))}

      {showInterviewModal && (
        <div className="interview-modal">
          <div className="interview-box">
            <h2>Schedule Interview</h2>

            <label>Date</label>

            <input
              type="date"
              name="scheduleAt"
              value={interviewData.scheduleAt}
              onChange={interviewChangeHandler}
            />

            <label>Time</label>

            <input
              type="time"
              name="time"
              value={interviewData.time}
              onChange={interviewChangeHandler}
            />

            <label>Mode</label>

            <select
              name="mode"
              value={interviewData.mode}
              onChange={interviewChangeHandler}
            >
              <option>Online</option>

              <option>Offline</option>
            </select>

            {interviewData.mode === "Online" && (
              <input
                type="text"
                name="link"
                placeholder="Meeting Link"
                value={interviewData.link}
                onChange={interviewChangeHandler}
              />
            )}

            {interviewData.mode === "Offline" && (
              <textarea
                name="venue"
                placeholder="Interview Venue"
                value={interviewData.venue}
                onChange={interviewChangeHandler}
              />
            )}

            <div className="modal-buttons">
              <button onClick={scheduleInterview}>Schedule</button>

              <button onClick={() => setShowInterviewModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplications;
