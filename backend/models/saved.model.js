import mongoose from "mongoose";
const savedSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
  },
  { timestamps: true },
);

savedSchema.index({ user: 1, job: 1 }, { unique: true });
export const savedJob = mongoose.model("savedJob", savedSchema);
