
import {
  CalendarDays,
  Clock,
  Video,
  MapPin,
  Building2,
} from "lucide-react";

import "./StudentInterviewItem.css";

const InterviewItem = ({ interview }) => {
  const companyName =
    interview?.company?.name || "Unknown Company";

  const jobTitle =
    interview?.job?.title || "Unknown Position";

  const interviewDate = interview?.interviewDate
    ? new Date(interview.interviewDate).toLocaleDateString()
    : "Not Scheduled";

  const interviewTime =
    interview?.interviewTime || "Not Available";

  const interviewMode =
    interview?.interviewMode || "Not Specified";

  return (
    <div className="student-interview-item-container">
      <div className="student-interview-item-header">

        <div className="student-interview-item-company">

          <div className="student-interview-item-company-icon">
            <Building2 size={20} />
          </div>

          <div>

            <h3 className="student-interview-item-company-name">
              {companyName}
            </h3>

            <p className="student-interview-item-job-title">
              {jobTitle}
            </p>

          </div>

        </div>

      </div>

      <div className="student-interview-item-meta">

        <div className="student-interview-item-meta-card">

          <CalendarDays size={16} />

          <div>

            <span>Date</span>

            <strong>{interviewDate}</strong>

          </div>

        </div>

        <div className="student-interview-item-meta-card">

          <Clock size={16} />

          <div>

            <span>Time</span>

            <strong>{interviewTime}</strong>

          </div>

        </div>

        <div className="student-interview-item-meta-card">

          {interviewMode === "Online" ? (
            <Video size={16} />
          ) : (
            <MapPin size={16} />
          )}

          <div>

            <span>Mode</span>

            <strong>{interviewMode}</strong>

          </div>

        </div>

      </div>
    </div>
  );
};

export default InterviewItem;