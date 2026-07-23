
import DashboardSection from "../dashboard/DashboardSection";
import DashboardSkeleton from "../dashboard/DashboardSkeleton";
import EmptyState from "../dashboard/EmptyState";
import ErrorState from "../dashboard/ErrorState";

import { useStudentRecentApplications } from "../../hooks/useStudentRecentApplications";
import ApplicationItem from "./ApplicationItem";

const RecentApplications = () => {
  const { data, isLoading, error, refetch } = useStudentRecentApplications();

  if (isLoading) {
    return <DashboardSkeleton rows={4} />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  const applications = data.applications;

  if (!applications.length) {
    return (
      <EmptyState
        title="No Applications Yet"
        description="Start applying for jobs to track them here."
      />
    );
  }

  return (
    <DashboardSection
      title="Recent Applications"
      subtitle="Your latest applications"
      // action={
      //   <button className="text-sm text-blue-600 hover:underline">
      //     View All
      //   </button>
      // }
    >
      <div>
        {applications.map((application) => (
          <ApplicationItem key={application._id} application={application} />
        ))}
      </div>
    </DashboardSection>
  );
};

export default RecentApplications;
