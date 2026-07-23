import { useQuery } from "@tanstack/react-query";
import { getRecruiterJobsPerformance } from "../api/dashboardApi";

export const useRecruiterJobsPerformance = () => {
  return useQuery({
    queryKey: ["recruiter-jobs-performance"],
    queryFn: getRecruiterJobsPerformance,
    staleTime: 1000 * 60 * 5,
  });
};