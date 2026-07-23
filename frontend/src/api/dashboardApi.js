// import axiosInstance from "./axiosInstance";
import API from "../services/api"
// Recruiter Dashboard Stats
export const getRecruiterDashboardStats = async () => {
  const { data } = await API.get(
    "/dashboard/recruiter/stats"
  );

  return data;
};

// Recent Applications
export const getRecruiterRecentApplications = async () => {
  const { data } = await API.get(
    "/dashboard/recruiter/recent-applications"
  );

  return data;
};

// Upcoming Interviews
export const getRecruiterUpcomingInterviews = async () => {
  const { data } = await API.get(
    "/dashboard/recruiter/upcoming-interviews"
  );

  return data;
};

// Jobs Performance
export const getRecruiterJobsPerformance = async () => {
  const { data } = await API.get(
    "/dashboard/recruiter/jobs-performance"
  );

  return data;
};




export const getStudentDashboardStats = async () => {
  const { data } = await API.get(
    "/dashboard/student/stats"
  );

  return data;
};


export const getStudentRecentApplications = async () => {
  const { data } = await API.get(
    "/dashboard/student/recent-applications"
  );

  return data;
};




export const getStudentUpcomingInterviews = async () => {
  const { data } = await API.get(
    "/dashboard/student/upcoming-interviews"
  );

  return data;
};



export const getRecommendedJobs = async () => {
  const { data } = await API.get(
    "/dashboard/student/recommended-jobs"
  );

  return data;
};