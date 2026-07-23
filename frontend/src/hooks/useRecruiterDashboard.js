import { useQuery } from "@tanstack/react-query";

import { getRecruiterDashboardStats } from "../api/dashboardApi";

export const useRecruiterDashboard = () => {
  return useQuery({
    queryKey: ["recruiter-dashboard-stats"],

    queryFn: getRecruiterDashboardStats,

    staleTime: 1000 * 60 * 5,
  });
};