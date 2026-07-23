import { useQuery } from "@tanstack/react-query";
import { getStudentRecentApplications } from "../api/dashboardApi";

export const useStudentRecentApplications = () => {
  return useQuery({
    queryKey: ["student-recent-applications"],
    queryFn: getStudentRecentApplications,
    staleTime: 1000 * 60 * 5,
  });
};