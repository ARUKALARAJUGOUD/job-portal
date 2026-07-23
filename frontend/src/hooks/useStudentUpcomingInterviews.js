import { useQuery } from "@tanstack/react-query";
import { getStudentUpcomingInterviews } from "../api/dashboardApi";

export const useStudentUpcomingInterviews = () => {
  return useQuery({
    queryKey: ["student-upcoming-interviews"],
    queryFn: getStudentUpcomingInterviews,
    staleTime: 1000 * 60 * 5,
  });
};