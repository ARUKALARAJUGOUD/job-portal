import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
    },
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    scheduleAt: {
      type: Date,
    },
    time: {
      type: String,
    },
    mode: {
      type: String,
      enum: ["Online", "Offline"],
    },
    link: {
      type: String,
    },
    venue: {
      type: String,
    },
    interviewStatus: {
      type: String,
      enum: ["Scheduled", "Completed", "Cancelled"],
    },
  },
  { timestamps: true },
);

interviewSchema.index({
  interviewStatus: 1,
  scheduleAt: 1,
});


export const Interview = mongoose.model("Interview", interviewSchema);
