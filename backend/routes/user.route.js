// const express = require("express");
import express from "express";
import {
  getCurrentUser,
  login,
  logout,
  otpLoginVerify,
  PasswordReset,
  register,
  resendOtp,
  updateProfile,
  userDetails,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put(
  "/profile/update",
  upload.fields([{ name: "profileImage", maxCount: 1 },{
    name:"resume",
    maxCount:1
  }]),
  isAuthenticated,
  updateProfile,
);

// used in the recruiter for the user details in the applications user details
router.get("/me", isAuthenticated, getCurrentUser);
router.get("/:id", userDetails);
router.post("/login-otp-verify", otpLoginVerify);
router.post("/resend-otp",isAuthenticated, resendOtp);
router.put("/password-reset", isAuthenticated, PasswordReset);

// sendPasswordResetOtp;
// resendLoginOtp
export default router;
// resendOtp;
