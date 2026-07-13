import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter", "admin"],
      required: true,
    },
    profile: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    resumeUrl: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    headline: {
      type: String,
    },
    about: {
      type: String,
    },
    location: {
      type: String,
    },
    experienceYears: {
      type: Number,
    },
    companyName: {
      type: String,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: function () {
        return this.role === "recruiter";
      },
    },
    currentPosition: {
      type: String,
    },
    expectedSalary: {
      type: Number,
    },
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill",
        // type:String,
      },
    ],
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// for fast searching and jumps to directly to the email
// userSchema.index({ email: 1 });
export const User = mongoose.model("User", userSchema);
