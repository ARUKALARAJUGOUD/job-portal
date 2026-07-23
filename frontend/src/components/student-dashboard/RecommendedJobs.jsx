
import DashboardSection from "../dashboard/DashboardSection";
import DashboardSkeleton from "../dashboard/DashboardSkeleton";
import EmptyState from "../dashboard/EmptyState";
import ErrorState from "../dashboard/ErrorState";

import RecommendedJobItem from "./RecommendedJobItem";

import { useRecommendedJobs } from "../../hooks/useRecommendedJobs";

const RecommendedJobs = () => {
  const { data, isLoading, error, refetch } = useRecommendedJobs();

  if (isLoading) return <DashboardSkeleton rows={5} />;

  if (error) return <ErrorState onRetry={refetch} />;

  const jobs = data.jobs;

  if (!jobs.length)
    return (
      <EmptyState
        title="No Recommendations"
        description="Complete your profile to get better recommendations."
      />
    );

  return (
    <DashboardSection
      title="Recommended Jobs"
      subtitle="Jobs matched to your skills"
      // action={
      //   <button className="text-sm text-blue-600 hover:underline">
      //     View All
      //   </button>
      // }
    >
      <div>
        {jobs.map((job) => (
          <RecommendedJobItem key={job._id} job={job} />
        ))}
      </div>
    </DashboardSection>
  );
};

export default RecommendedJobs;
