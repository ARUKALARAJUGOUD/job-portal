import { connection } from "../config/redis.js";
import { Application } from "../models/application.model.js";
import { Resume } from "../models/resume.model.js";
import { User } from "../models/user.model.js";

import { calculateProfileCompletion } from "../utils/calculateProfileCompletion.js";

export const saveResume = async (req, res) => {
  try {
    const userId = req.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Please login again.",
      });
    }

    // ===========================================
    // Destructure all Resume fields
    // ===========================================

    const {
      objective,
      professionalSummary,

      education = [],
      experience = [],
      projects = [],
      certifications = [],

      languages = [],
      achievements = [],
      publications = [],
      volunteerExperience = [],
      references = [],

      socialLinks = {},

      resumeVisibility,
      openToWork,
    } = req.body;

    // ===========================================
    // Validation
    // ===========================================

    if (!Array.isArray(education) || education.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Education details are required.",
      });
    }

    if (!Array.isArray(projects) || projects.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one project is required.",
      });
    }

    // ===========================================
    // Create / Update Resume
    // ===========================================

    const profileCompletion = calculateProfileCompletion({
      objective,
      professionalSummary,
      education,
      experience,
      projects,
      certifications,
      languages,
      achievements,
      publications,
      volunteerExperience,
      references,
      socialLinks,
    });

    const resume = await Resume.findOneAndUpdate(
      { user: userId },
      {
        user: userId,

        objective,
        professionalSummary,

        education,
        experience,
        projects,
        certifications,

        languages,
        achievements,
        publications,
        volunteerExperience,
        references,

        socialLinks,

        resumeVisibility,
        openToWork,
        profileCompletion,
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
      },
    );

    // ===========================================
    // Update Resume Reference in User
    // ===========================================

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        resume: resume._id,
      },
      {
        new: true,
      },
    );

    // ===========================================
    // Find every application using this resume
    // ===========================================

    const applications = await Application.find({
      resume: resume._id,
    }).populate({
      path: "job",
      populate: {
        path: "recruiter",
      },
    });

    // ===========================================
    // Clear Redis Cache
    // ===========================================

    await connection.del(`user:${userId}`);

    await connection.del(`userApplications:${userId}`);

    for (const application of applications) {
      await connection.del(
        `recruiterApplications:${application.job.recruiter._id}`,
      );

      await connection.del(`jobApplications:${application.job._id}`);
    }

    // ===========================================
    // Response
    // ===========================================

    return res.status(200).json({
      success: true,
      message: "Resume saved successfully.",
      resume,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error saving resume:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      errorMessage: error.message,
    });
  }
};

export const getMyResume = async (req, res) => {
  try {
    const userId = req.id;

    const resume = await Resume.findOne({
      user: userId,
    });

    // if (!resume) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Resume not found.",
    //   });
    // }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
      errorMessage: error.message,
    });
  }
};
