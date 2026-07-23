import { useQuery } from "@tanstack/react-query";
import { getRecruiterUpcomingInterviews } from "../api/dashboardApi";

export const useRecruiterUpcomingInterviews = () => {
  return useQuery({
    queryKey: ["recruiter-upcoming-interviews"],
    queryFn: getRecruiterUpcomingInterviews,
    staleTime: 1000 * 60 * 5,
  });
};