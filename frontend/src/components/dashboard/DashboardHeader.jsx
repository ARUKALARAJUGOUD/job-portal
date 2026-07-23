
import { Plus } from "lucide-react";
import "./DashboardHeader.css";

const DashboardHeader = ({ fullName, role, buttonText, onButtonClick }) => {
  const greeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";

    if (hour < 17) return "Good Afternoon";

    return "Good Evening";
  };

  return (
    <div className="dashboard-header-container">
      <div className="dashboard-header-left">
        <h2>{greeting()} 👋</h2>

        <p>
          Welcome back,
          <span> {fullName}</span>
        </p>

        <small>
          {role === "recruiter"
            ? "Manage jobs and applications."
            : "Let's find your next opportunity."}
        </small>
      </div>

      <div className="dashboard-header-right">
        {/* <button className="notification-btn">
          <Bell size={20} />
        </button> */}

        {buttonText && (
          <button className="primary-btn" onClick={onButtonClick}>
            <Plus size={18} />

            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default DashboardHeader;
