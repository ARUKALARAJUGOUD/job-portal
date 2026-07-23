import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

import DashboardHeader from "../components/dashboard/DashboardHeader.jsx";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import JobsPerformance from "../components/recruiter-dashboard/JobsPerformance.jsx";
import RecentApplications from "../components/recruiter-dashboard/RecentApplications.jsx";
import RecruiterStats from "../components/recruiter-dashboard/RecruiterStats.jsx";
import UpcomingInterviews from "../components/recruiter-dashboard/UpcomingInterviews.jsx";
// import Sidebar from "../components/sidebar/Sidebar.jsx";

const RecruiterDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <DashboardLayout
    // sidebar={<Sidebar />}
      header={
        <DashboardHeader
          fullName={user.fullName}
          role={user.role}
          buttonText="Post Job"
          onButtonClick={() => navigate("/create-job")}
        />
      }
      stats={<RecruiterStats />}
      leftSection={<RecentApplications />}
      // rightSection={<div>Upcoming Interviews</div>}
      rightSection={<UpcomingInterviews />}
      // bottomSection={<div>Jobs Performance</div>}
      bottomSection={<JobsPerformance />}
    />
  );
};

export default RecruiterDashboard;
