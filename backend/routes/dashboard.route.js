import express from "express";
// import StudentDashboard from "../../frontend/src/pages/StudentDashboard.j"
import {
  getRecentApplications,
  getRecommendedJobs,
  getRecruiterDashboardStats,
  getRecruiterJobsPerformance,
  getRecruiterRecentApplications,
  getRecruiterUpcomingInterviews,
  getStudentApplicationStatus,
  getStudentDashboard,
  getUpcomingInterviews,
} from "../controllers/dashboard.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/student/stats", isAuthenticated, getStudentDashboard);
router.get(
  "/student/application-status",
  isAuthenticated,
  getStudentApplicationStatus,
);

router.get(
  "/student/recent-applications",
  isAuthenticated,
  getRecentApplications,
);


router.get(
    "/student/upcoming-interviews",
    isAuthenticated,
    getUpcomingInterviews
);

router.get(
    "/student/recommended-jobs",
    isAuthenticated,
    getRecommendedJobs
);

router.get(
  "/recruiter/stats",
  isAuthenticated,
  getRecruiterDashboardStats
);

router.get(
  "/recruiter/recent-applications",
  isAuthenticated,
  getRecruiterRecentApplications
);


router.get(
  "/recruiter/jobs-performance",
  isAuthenticated,
  getRecruiterJobsPerformance
);


router.get(
  "/recruiter/upcoming-interviews",
  isAuthenticated,
  getRecruiterUpcomingInterviews
);

export default router;
