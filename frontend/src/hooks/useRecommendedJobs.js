import { useQuery } from "@tanstack/react-query";
import { getRecommendedJobs } from "../api/dashboardApi";

export const useRecommendedJobs = () => {
  return useQuery({
    queryKey: ["recommended-jobs"],
    queryFn: getRecommendedJobs,
    staleTime: 1000 * 60 * 5,
  });
};