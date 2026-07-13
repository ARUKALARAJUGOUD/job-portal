
import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    //-----------------------------------
    // Career Objective
    //-----------------------------------

    objective: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    //-----------------------------------
    // Professional Summary
    //-----------------------------------

    professionalSummary: {
      type: String,
      trim: true,
      maxlength: 3000,
    },

    //-----------------------------------
    // Education
    //-----------------------------------

    education: [
      {
        college: {
          type: String,
          required: true,
          trim: true,
        },

        degree: {
          type: String,
          required: true,
        },

        field: {
          type: String,
          required: true,
        },

        grade: {
          type: String,
        },

        fromYear: {
          type: Number,
          required: true,
        },

        toYear: {
          type: Number,
          required: true,
        },

        currentlyStudying: {
          type: Boolean,
          default: false,
        },

        description: String,
      },
    ],

    //-----------------------------------
    // Experience
    //-----------------------------------

    experience: [
      {
        company: {
          type: String,
          required: true,
        },

        position: {
          type: String,
          required: true,
        },

        employmentType: {
          type: String,
          enum: [
            "Full Time",
            "Part Time",
            "Internship",
            "Contract",
            "Freelance",
          ],
        },

        location: String,

        workMode: {
          type: String,
          enum: [
            "Remote",
            "Hybrid",
            "On Site",
          ],
        },

        fromDate: Date,

        toDate: Date,

        currentlyWorking: {
          type: Boolean,
          default: false,
        },

        description: String,

        technologies: [String],
      },
    ],

    //-----------------------------------
    // Projects
    //-----------------------------------

    projects: [
      {
        title: {
          type: String,
          required: true,
        },

        description: String,

        technologies: [String],

        githubLink: String,

        liveLink: String,

        featured: {
          type: Boolean,
          default: false,
        },
      },
    ],

    //-----------------------------------
    // Certifications
    //-----------------------------------

    certifications: [
      {
        title: String,

        issuer: String,

        issueDate: Date,

        credentialId: String,

        credentialUrl: String,
      },
    ],

    //-----------------------------------
    // Languages
    //-----------------------------------

    languages: [
      {
        language: String,

        proficiency: {
          type: String,
          enum: [
            "Beginner",
            "Intermediate",
            "Professional",
            "Native",
          ],
        },
      },
    ],

    //-----------------------------------
    // Achievements
    //-----------------------------------

    achievements: [
      {
        title: String,

        description: String,

        date: Date,
      },
    ],

    //-----------------------------------
    // Publications
    //-----------------------------------

    publications: [
      {
        title: String,

        publisher: String,

        publishedDate: Date,

        link: String,
      },
    ],

    //-----------------------------------
    // Volunteer Experience
    //-----------------------------------

    volunteerExperience: [
      {
        organization: String,

        role: String,

        description: String,

        fromDate: Date,

        toDate: Date,
      },
    ],

    //-----------------------------------
    // References
    //-----------------------------------

    references: [
      {
        name: String,

        company: String,

        designation: String,

        email: String,

        phone: String,
      },
    ],

    //-----------------------------------
    // Social Links
    //-----------------------------------

    socialLinks: {
      github: String,

      linkedin: String,

      portfolio: String,

      leetcode: String,

      hackerrank: String,

      codechef: String,
    },

    //-----------------------------------
    // Resume Settings
    //-----------------------------------

    resumeVisibility: {
      type: String,
      enum: [
        "Public",
        "Recruiters Only",
        "Private",
      ],
      default: "Public",
    },

    openToWork: {
      type: Boolean,
      default: true,
    },

    profileCompletion: {
      type: Number,
      default: 0,
    },
  },

  {
    timestamps: true,
  }
);

export const Resume = mongoose.model(
  "Resume",
  resumeSchema
);