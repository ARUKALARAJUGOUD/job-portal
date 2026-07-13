import mongoose from "mongoose";
const applicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
    coverLetter: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Applied", "Shortlisted", "Interview", "Rejected", "Selected"],
      default: "Applied",
    },
  },
  { timestamps: true },
);

applicationSchema.index({ job: 1, candidate: 1 }, { unique: true });
export const Application = mongoose.model("Application", applicationSchema);
