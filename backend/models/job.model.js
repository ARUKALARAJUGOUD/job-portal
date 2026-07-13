import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
    },

    responsibilities: [
      {
        type: String,
      },
    ],
    requirements: [
      {
        type: String,
      },
    ],
    skillsRequired: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        required: true,
      },
    ],
    experienceRequired: {
      type: Number,
      min: 0,
      max: 25,
    },
    salary: {
      type: Number,
      min: 200000,
      max: 4000000,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    workMode: {
      type: String,
      enum: ["Remote", "Hybrid", "Onsite"],
      required: true,
    },
    employmentType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Internship", "Contract"],
      required: true,
    },
    openings: {
      type: Number,
      default: 1,
    },
    applicationDeadline: {
      type: Date,
      required: true,
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Active", "Closed", "Draft"],
      default: "Draft",
      required: true,
    },
  },
  { timestamps: true },
);

export const Job = mongoose.model("Job", jobSchema);
