

import {
  CalendarDays,
  Clock,
  Video,
  MapPin,
} from "lucide-react";
import "./InterviewItem.css";

const InterviewItem = ({ interview }) => {
  const candidate = interview.application?.candidate;
  const job = interview.application?.job;

  return (
    <div className="interview-item-container">
      <div className="interview-item-info">
        <img
          src={candidate?.profile?.url || "/default-avatar.png"}
          alt={candidate?.fullName}
          className="interview-item-avatar"
        />

        <div className="interview-item-details">
          <h3 className="interview-item-name">
            {candidate?.fullName}
          </h3>

          <p className="interview-item-job-title">
            {job?.title}
          </p>

          <div className="interview-item-meta">

            <div className="interview-item-meta-item">
              <CalendarDays size={15} />

              <span>
                {new Date(
                  interview.scheduleAt
                ).toLocaleDateString()}
              </span>
            </div>

            <div className="interview-item-meta-item">
              <Clock size={15} />

              <span>{interview.time}</span>
            </div>

            <div className="interview-item-meta-item">

              {interview.mode === "Online" ? (
                <Video size={15} />
              ) : (
                <MapPin size={15} />
              )}

              <span>{interview.mode}</span>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewItem;