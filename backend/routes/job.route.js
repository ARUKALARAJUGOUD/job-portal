import express from "express";
import { createJob, deleteJobById, getJobById, getJobs, getJobsByRecruiterId, searchJobs, updateJob } from "../controllers/job.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/create", isAuthenticated, createJob);
router.put("/update/:jobId",isAuthenticated,updateJob);
router.delete("/delete/:id",isAuthenticated,deleteJobById);
router.get("/recruiter-jobs",isAuthenticated,getJobsByRecruiterId);
router.get("/getJobs",getJobs); 
router.get("/get-job/:id",getJobById)
router.get("/search",searchJobs)
export default router;
 