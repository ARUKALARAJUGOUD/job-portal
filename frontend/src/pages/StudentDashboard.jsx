

import { useAuth } from "../Contexts/AuthContext";

import DashboardLayout from "../components/dashboard/DashboardLayout";
import DashboardHeader from "../components/dashboard/DashboardHeader";

import StudentStats from "../components/student-dashboard/StudentStats";
import RecentApplications from "../components/student-dashboard/RecentApplications";
import UpcomingInterviews from "../components/student-dashboard/UpcomingInterviews";
import RecommendedJobs from "../components/student-dashboard/RecommendedJobs";

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout
      header={
        <DashboardHeader
          fullName={user.fullName}
          role={user.role}
        />
      }
      stats={<StudentStats />}
      leftSection={<RecentApplications />}
      rightSection={<UpcomingInterviews />}
      bottomSection={<RecommendedJobs />}
    />
  );
};

export default StudentDashboard;