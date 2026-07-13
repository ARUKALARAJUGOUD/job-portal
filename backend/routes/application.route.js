import express from "express";
import {
  createApplication,
  getApplicationsOnJob,
  getRecruiterApplication,
  getUserApplication,
  updateStatus,
} from "../controllers/application.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();


router.post("/create/:jobId", isAuthenticated, createApplication);

router.get("/get", isAuthenticated, getUserApplication);

router.get(
  "/get-recruiter-application",
  isAuthenticated,
  getRecruiterApplication,
);

router.get("/get/:id", getApplicationsOnJob);
router.patch("/update/:id",isAuthenticated,updateStatus)
export default router;
