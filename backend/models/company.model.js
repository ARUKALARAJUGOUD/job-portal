import mongoose from "mongoose";
const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    companyEmail: {
      type: String,
      required: true,
    },
    totalEmployees: {
      type: Number,
    },
    companyType: {
      type: String,
    },
    logo: {
      url: {
        type: String,
      },
      public_id: {
        type: String,
      },
    },
    website: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    industry: {
      type: String,
      required: true,
    },
    companySize: {
      type: String,
    },
    foundedYear: {
      type: Number,
      required: true,
    },
    headquarters: {
      type: String,
    },
    location: [
      {
        type: String,
      },
    ],

    socialLinks: {
      linkedin: {
        type: String,
      },
      twitter: {
        type: String,
      },
      github: {
        type: String,
      },
    },
  },
  { timestamps: true },
);

export const Company = mongoose.model("Company", companySchema);
