import express from "express";
import {
  getAllCompanies,
  getCompany,
  getCompanyById,
  registerCompany,
  updateCompany,
} from "../controllers/company.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/register",
  upload.fields([{ name: "logoUrl", maxCount: 1 }]),
  isAuthenticated,
  registerCompany,
);
router.get("/get/recruiter", isAuthenticated, getCompany);
router.get("/get/:companyId", getCompanyById);
router.get("/get-all-companies", getAllCompanies);
// router.put("/update/:companyId", isAuthenticated, updateCompany);
router.put(
  "/update/:companyId",
  upload.fields([{ name: "logoUrl", maxCount: 1 }]),
  isAuthenticated,
  updateCompany,
);

export default router;
