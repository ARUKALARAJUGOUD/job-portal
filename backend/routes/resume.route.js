import express from "express";
import { getMyResume, saveResume } from "../controllers/resume.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.post("/add", isAuthenticated, saveResume);
router.get("/my-resume", isAuthenticated, getMyResume);
export default router;
