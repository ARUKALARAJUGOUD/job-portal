import { useQuery } from "@tanstack/react-query";
import { getStudentDashboardStats } from "../api/dashboardApi";

export const useStudentDashboard = () => {
  return useQuery({
    queryKey: ["student-dashboard-stats"],
    queryFn: getStudentDashboardStats,
    staleTime: 1000 * 60 * 5,
  });
};