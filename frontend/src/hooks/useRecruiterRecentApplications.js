import { useQuery } from "@tanstack/react-query";

import { getRecruiterRecentApplications } from "../api/dashboardApi";

export const useRecruiterRecentApplications = () => {
  return useQuery({
    queryKey: ["recruiter-recent-applications"],

    queryFn: getRecruiterRecentApplications,

    staleTime: 1000 * 60 * 5,
  });
};