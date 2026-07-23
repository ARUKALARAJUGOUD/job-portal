
import "./RecentApplications.css";

import { useRecruiterRecentApplications } from "../../hooks/useRecruiterRecentApplications";

import DashboardSection from "../dashboard/DashboardSection";
import DashboardSkeleton from "../dashboard/DashboardSkeleton";
import EmptyState from "../dashboard/EmptyState";
import ErrorState from "../dashboard/ErrorState";
import ApplicationItem from "./ApplicationItem";

const RecentApplications = () => {
  const { data, isLoading, error, refetch } = useRecruiterRecentApplications();

  return (
    <DashboardSection
      title="Recent Applications"
      subtitle="Latest candidates"
      // action={<TextButton>View All</TextButton>}
    >
      {isLoading ? (
        <DashboardSkeleton rows={4} />
      ) : error ? (
        <ErrorState onRetry={refetch} />
      ) : data?.applications?.length === 0 ? (
        <EmptyState
          title="No Applications"
          description="Applications will appear here."
        />
      ) : (
        <div className="recent-applications-list">
          {data.applications.map((application) => (
            <ApplicationItem key={application._id} application={application} />
          ))}
        </div>
      )}
    </DashboardSection>
  );
};

export default RecentApplications;
