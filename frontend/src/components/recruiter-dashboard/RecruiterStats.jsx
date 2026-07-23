
import {
  BriefcaseBusiness,
  CalendarClock,
  CheckCircle,
  Users,
} from "lucide-react";

import StatsCard from "../dashboard/StatsCard";
import StatsGrid from "../dashboard/StatsGrid";

import { useRecruiterDashboard } from "../../hooks/useRecruiterDashboard";

const RecruiterStats = () => {
  const { data, isLoading } = useRecruiterDashboard();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const stats = data.stats;

  return (
    <StatsGrid>
      <StatsCard
        title="Jobs Posted"
        value={stats.jobsPosted}
        icon={<BriefcaseBusiness size={28} />}
      />

      <StatsCard
        title="Applications"
        value={stats.totalApplications}
        icon={<Users size={28} />}
      />

      <StatsCard
        title="Interviews"
        value={stats.interviews}
        icon={<CalendarClock size={28} />}
      />

      <StatsCard
        title="Selected"
        value={stats.selected}
        icon={<CheckCircle size={28} />}
      />
    </StatsGrid>
  );
};

export default RecruiterStats;
