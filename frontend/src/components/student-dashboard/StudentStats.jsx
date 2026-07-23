
import {
  Briefcase,
  Bookmark,
  CalendarDays,
  MessageCircle,
} from "lucide-react";

import StatsGrid from "../dashboard/StatsGrid";
import StatsCard from "../dashboard/StatsCard";
import DashboardSkeleton from "../dashboard/DashboardSkeleton";
import ErrorState from "../dashboard/ErrorState";

import { useStudentDashboard } from "../../hooks/useStudentDashboard";

const StudentStats = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useStudentDashboard();

  if (isLoading) {
    return <DashboardSkeleton rows={1} />;
  }

  if (error) {
    return <ErrorState onRetry={refetch} />;
  }

  const stats = data.stats;

  return (
    <StatsGrid>
      <StatsCard
        title="Applications"
        value={stats.applications}
        icon={<Briefcase size={28} />}
        description="Jobs you've applied for"
      />

      <StatsCard
        title="Saved Jobs"
        value={stats.savedJobs}
        icon={<Bookmark size={28} />}
        description="Bookmarked jobs"
      />

      <StatsCard
        title="Upcoming Interviews"
        value={stats.upcomingInterviews}
        icon={<CalendarDays size={28} />}
        description="Scheduled interviews"
      />

      <StatsCard
        title="Unread Messages"
        value={stats.unreadMessages}
        icon={<MessageCircle size={28} />}
        description="Recruiter messages"
      />
    </StatsGrid>
  );
};

export default StudentStats;