
import DashboardSection from "../dashboard/DashboardSection";
import DashboardSkeleton from "../dashboard/DashboardSkeleton";
import EmptyState from "../dashboard/EmptyState";
import ErrorState from "../dashboard/ErrorState";

import JobPerformanceItem from "./JobPerformanceItem";

import { useRecruiterJobsPerformance } from "../../hooks/useRecruiterJobsPerformance";

const JobsPerformance = () => {
  const { data, isLoading, error, refetch } = useRecruiterJobsPerformance();

  if (isLoading) return <DashboardSkeleton rows={4} />;

  if (error) return <ErrorState onRetry={refetch} />;

  const jobs = data.jobs;

  if (!jobs.length)
    return (
      <EmptyState
        title="No Jobs Posted"
        description="Post a job to see performance metrics."
      />
    );

  return (
    <DashboardSection
      title="Jobs Performance"
      subtitle="Performance of your recent job postings"
      // action={
      //   <button className="text-sm text-blue-600 hover:underline">
      //     View All
      //   </button>
      // }
    >
      <div>
        {jobs.map((job) => (
          <JobPerformanceItem key={job._id} job={job} />
        ))}
      </div>
    </DashboardSection>
  );
};

export default JobsPerformance;
