import { useEffect, useState } from "react";
import { FaEnvelope, FaFilePdf, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "../cssStyle/ApplicationsPage.css";
import API from "../services/api";

const ApplicationsPage = () => {
  const { id } = useParams();

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

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
        const response = await API.get(`/application/get/${id}`);
        setApplications(response.data.applications);
      } catch (error) {
        alert(error?.response?.data?.message);
      } finally {
        setLoading(false);
      }
    };

    fetchedData();
    // updateStatus();
  }, [id]);

  if (loading) {
    return <h2 className="applications-loading">Loading Applications...</h2>;
  }

  if (applications.length === 0) {
    return (
      <div className="applications-empty">
        <h2>No Applications Yet</h2>
      </div>
    );
  }

  return (
    <div className="applications-page">
      <div className="applications-header">
        <h1>{applications[0].job.title}</h1>

        <p>
          Total Applications : <strong>{applications.length}</strong>
        </p>
      </div>

      {applications.map((application) => (
        <div className="application-card" key={application._id}>
          <div className="candidate-top">
            <img
              src={application?.candidate?.profile.url}
              alt={application.candidate.fullName}
              className="candidate-image"
            />

            <div className="candidate-info">
              <h2>{application.candidate.fullName}</h2>

              <p>{application.candidate.headline}</p>

              <div className="candidate-meta">
                <span>
                  <FaMapMarkerAlt />
                  {application.candidate.location}
                </span>

                <span>
                  <FaEnvelope />
                  {application.candidate.email}
                </span>

                <span>
                  <FaPhone />
                  {application.candidate.phoneNumber}
                </span>
              </div>
            </div>
          </div>

          <div className="application-grid">
            <div>
              <strong>Experience</strong>

              <p>{application.candidate.experienceYears} Years</p>
            </div>

            <div>
              <strong>Expected Salary</strong>

              <p>₹{application?.candidate?.expectedSalary?.toLocaleString()}</p>
            </div>

            <div>
              <strong>Status</strong>

              <p className={`status-badge ${application.status}`}>
                {application.status}
              </p>
              {/* <p>{application.status}</p> */}
            </div>

            <div>
              <strong>Applied On</strong>

              <p>{new Date(application.createdAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="application-section">
            <h3>About</h3>

            <p>{application.candidate.about}</p>
          </div>

          <div className="application-section">
            <h3>Cover Letter</h3>

            <p>{application.coverLetter}</p>
          </div>

          <div className="application-actions">
            <a
              href={application?.candidate?.resumeUrl?.url}
              target="_blank"
              rel="noreferrer"
              className="resume-btn"
            >
              <FaFilePdf />
              View Resume
            </a>

            {/* <button className="shortlist-btn">Shortlist</button>

            <button className="reject-btn">Reject</button> */}

            <select
              value={application.status}
              onChange={(e) => updateStatus(application._id, e.target.value)}
            >
              <option>Applied</option>

              {/* <option>Under Review</option> */}

              <option value="Shortlisted">Shortlisted</option>

              <option value="Interview">Interview</option>

              <option value="Selected">Selected</option>

              <option value="Rejected">Rejected</option>
            </select>
          </div>

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
      ))}
    </div>
  );
};

export default ApplicationsPage;
