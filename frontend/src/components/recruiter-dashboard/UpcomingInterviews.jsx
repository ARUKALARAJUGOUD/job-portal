
import "./UpcomingInterviews.css";

import { useRecruiterUpcomingInterviews } from "../../hooks/useRecruiterUpcomingInterviews";

import DashboardSection from "../dashboard/DashboardSection";
import DashboardSkeleton from "../dashboard/DashboardSkeleton";
import EmptyState from "../dashboard/EmptyState";
import ErrorState from "../dashboard/ErrorState";
// import TextButton from "../common/TextButton";

import InterviewItem from "./InterviewItem";

const UpcomingInterviews = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useRecruiterUpcomingInterviews();

  return (
    <DashboardSection
      title="Upcoming Interviews"
      subtitle="Scheduled interviews"
      // action={<TextButton>View All</TextButton>}
    >
      {isLoading ? (
        <DashboardSkeleton rows={3} />
      ) : error ? (
        <ErrorState onRetry={refetch} />
      ) : data?.interviews?.length === 0 ? (
        <EmptyState
          title="No Upcoming Interviews"
          description="Scheduled interviews will appear here."
        />
      ) : (
        <div className="upcoming-interviews-list">
          {data.interviews.map((interview) => (
            <InterviewItem
              key={interview._id}
              interview={interview}
            />
          ))}
        </div>
      )}
    </DashboardSection>
  );
};

export default UpcomingInterviews;