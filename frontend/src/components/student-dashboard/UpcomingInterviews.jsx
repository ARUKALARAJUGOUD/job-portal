
import DashboardSection from "../dashboard/DashboardSection";
import DashboardSkeleton from "../dashboard/DashboardSkeleton";
import EmptyState from "../dashboard/EmptyState";
import ErrorState from "../dashboard/ErrorState";

import InterviewItem from "./InterviewItem";

import { useStudentUpcomingInterviews } from "../../hooks/useStudentUpcomingInterviews";

const UpcomingInterviews = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useStudentUpcomingInterviews();

  if (isLoading)
    return <DashboardSkeleton rows={3} />;

  if (error)
    return <ErrorState onRetry={refetch} />;

  const interviews = data.interviews;

  if (!interviews.length)
    return (
      <EmptyState
        title="No Upcoming Interviews"
        description="Interview invitations will appear here."
      />
    );

  return (
    <DashboardSection
      title="Upcoming Interviews"
      subtitle="Your scheduled interviews"
      // action={
      //   <button className="text-sm text-blue-600 hover:underline">
      //     View All
      //   </button>
      // }
    >
      <div className="space-y-2">
        {interviews.map((interview) => (
          <InterviewItem
            key={interview._id}
            interview={interview}
          />
        ))}
      </div>
    </DashboardSection>
  );
};

export default UpcomingInterviews;