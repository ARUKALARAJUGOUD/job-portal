import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { addSaveJob, getSavedJobs, removeSaveJob } from "../controllers/saved.controller.js";
const router = express.Router();


router.post("/add/:jobId",isAuthenticated,addSaveJob);
router.delete("/remove/:id",isAuthenticated,removeSaveJob)
router.get("/get-saved-jobs",isAuthenticated,getSavedJobs);



export default router;
