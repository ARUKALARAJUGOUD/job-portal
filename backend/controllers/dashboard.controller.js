import mongoose from "mongoose";
import { Application } from "../models/application.model.js";
import { Interview } from "../models/interview.model.js";
// import Message from "../models/Message.model.js";
import Message from "../models/message.model.js";
import { Notification } from "../models/notification.model.js";

import { Job } from "../models/job.model.js";
import { savedJob } from "../models/saved.model.js";
import { User } from "../models/user.model.js";

export const getStudentDashboard = async (req, res) => {
  try {
    const userId = req.id;

    const [applications, savedJobs, interviews, unreadMessages, notifications] =
      await Promise.all([
        Application.countDocuments({
          candidate: userId,
        }),

        savedJob.countDocuments({
          user: userId,
        }),

        Interview.countDocuments({
          interviewStatus: "Scheduled",
        }),

        Message.countDocuments({
          receiverId: userId,
          seen: false,
        }),

        Notification.countDocuments({
          user: userId,
          isRead: false,
        }),
      ]);

    const selected = await Application.countDocuments({
      candidate: userId,
      status: "Selected",
    });

    const rejected = await Application.countDocuments({
      candidate: userId,
      status: "Rejected",
    });

    const pending = await Application.countDocuments({
      candidate: userId,
      status: {
        $in: ["Applied", "Shortlisted", "Interview"],
      },
    });

    res.status(200).json({
      success: true,
      stats: {
        applications,
        savedJobs,
        interviews,
        unreadMessages,
        notifications,
        selected,
        rejected,
        pending,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getStudentApplicationStatus = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.id);

    const applicationStatus = await Application.aggregate([
      {
        $match: {
          candidate: new mongoose.Types.ObjectId(req.id),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Default values
    const status = {
      Applied: 0,
      Shortlisted: 0,
      Interview: 0,
      Selected: 0,
      Rejected: 0,
    };

    applicationStatus.forEach((item) => {
      status[item._id] = item.count;
    });

    res.status(200).json({
      success: true,
      status,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch application status.",
    });
  }
};

export const getRecentApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.id,
    })
      .populate({
        path: "job",
        select: "title company",
        populate: {
          path: "company",
          select: "companyName logo",
        },
      })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recent applications.",
    });
  }
};

// import { Interview } from "../models/interview.model.js";

export const getUpcomingInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find({
      interviewStatus: "Scheduled",
      scheduleAt: {
        $gte: new Date(),
      },
    })
      .populate({
        path: "application",
        match: {
          candidate: req.id,
        },
        select: "job",
        populate: {
          path: "job",
          select: "title company",
          populate: {
            path: "company",
            select: "companyName logo",
          },
        },
      })
      .sort({
        scheduleAt: 1,
      })
      .lean();

    const upcomingInterviews = interviews.filter(
      (interview) => interview.application,
    );

    return res.status(200).json({
      success: true,
      interviews: upcomingInterviews,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch interviews.",
    });
  }
};

export const getRecommendedJobs = async (req, res) => {
  try {
    const student = await User.findById(req.id)
      .select("skills experienceYears location")
      .lean();

    const applied = await Application.find({
      candidate: new mongoose.Types.ObjectId(req.id),
    })
      .select("job")
      .lean();

    const appliedIds = applied.map((job) => job.job);

    const jobs = await Job.find({
      status: "Active",

      applicationDeadline: {
        $gte: new Date(),
      },

      _id: {
        $nin: appliedIds,
      },

      experienceRequired: {
        $lte: student.experienceYears || 0,
      },

      skillsRequired: {
        $in: student.skills,
      },
    })
      .populate("company", "companyName logo")
      .populate("skillsRequired", "name")
      .limit(10)
      .lean();

    const recommendedJobs = jobs.map((job) => {
      const matchedSkills = job.skillsRequired.filter((skill) =>
        student.skills.some((id) => id.toString() === skill._id.toString()),
      );

      return {
        ...job,
        matchScore: matchedSkills.length,
      };
    });

    recommendedJobs.sort((a, b) => b.matchScore - a.matchScore);

    return res.status(200).json({
      success: true,
      jobs: recommendedJobs,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch recommended jobs.",
    });
  }
};

// for the recruiter dashboard;

export const getRecruiterDashboardStats = async (req, res) => {
  try {
    const recruiterId = req.id;

    // Fetch all recruiter jobs
    const recruiterJobs = await Job.find({
      recruiter: recruiterId,
    })
      .select("_id status")
      .lean();

    const jobIds = recruiterJobs.map((job) => job._id);

    // Count jobs locally
    const jobsPosted = recruiterJobs.length;

    const activeJobs = recruiterJobs.filter(
      (job) => job.status === "Active",
    ).length;

    const closedJobs = recruiterJobs.filter(
      (job) => job.status === "Closed",
    ).length;

    // Execute independent queries in parallel
    const [applicationStats, unreadMessages] = await Promise.all([
      Application.aggregate([
        {
          $match: {
            job: {
              $in: jobIds,
            },
          },
        },
        {
          $group: {
            _id: "$status",
            count: {
              $sum: 1,
            },
          },
        },
      ]),

      Message.countDocuments({
        receiverId: recruiterId,
        seen: false,
      }),
    ]);

    // Default values
    const stats = {
      applications: 0,
      applied: 0,
      shortlisted: 0,
      interviews: 0,
      selected: 0,
      rejected: 0,
    };

    applicationStats.forEach((item) => {
      stats.applications += item.count;

      switch (item._id) {
        case "Applied":
          stats.applied = item.count;
          break;

        case "Shortlisted":
          stats.shortlisted = item.count;
          break;

        case "Interview":
          stats.interviews = item.count;
          break;

        case "Selected":
          stats.selected = item.count;
          break;

        case "Rejected":
          stats.rejected = item.count;
          break;

        default:
          break;
      }
    });

    return res.status(200).json({
      success: true,
      stats: {
        jobsPosted,
        activeJobs,
        closedJobs,
        totalApplications: stats.applications,
        applied: stats.applied,
        shortlisted: stats.shortlisted,
        interviews: stats.interviews,
        selected: stats.selected,
        rejected: stats.rejected,
        unreadMessages,
      },
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch recruiter dashboard statistics.",
    });
  }
};




export const getRecruiterRecentApplications = async (req, res) => {
  try {
    const recruiterId = req.id;

    // Find recruiter's jobs
    const recruiterJobs = await Job.find({
      recruiter: recruiterId,
    })
      .select("_id")
      .lean();

    const jobIds = recruiterJobs.map((job) => job._id);

    const recentApplications = await Application.find({
      job: {
        $in: jobIds,
      },
    })
      .populate({
        path: "candidate",
        select:
          "fullName profile headline experienceYears resumeUrl resume",
        populate: {
          path: "resume",
          select: "profileCompletion openToWork",
        },
      })
      .populate({
        path: "job",
        select: "title company",
        populate: {
          path: "company",
          select: "companyName",
        },
      })
      .sort({
        createdAt: -1,
      })
      .limit(10)
      .lean();

    return res.status(200).json({
      success: true,
      applications: recentApplications,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Unable to fetch recent applications.",
    });
  }
};



export const getRecruiterJobsPerformance = async (req, res) => {
  try {
    const recruiterId = req.id;

    // Fetch recruiter's jobs
    const recruiterJobs = await Job.find({
      recruiter: recruiterId,
    })
      .select("_id title status applicantsCount")
      .lean();

    const jobIds = recruiterJobs.map((job) => job._id);

    // Aggregate application counts grouped by job and status
    const applicationStats = await Application.aggregate([
      {
        $match: {
          job: {
            $in: jobIds,
          },
        },
      },
      {
        $group: {
          _id: {
            job: "$job",
            status: "$status",
          },
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    // Convert aggregation result into a lookup map
    const statsMap = {};

    applicationStats.forEach((item) => {
      const jobId = item._id.job.toString();

      if (!statsMap[jobId]) {
        statsMap[jobId] = {
          shortlisted: 0,
          interviews: 0,
          selected: 0,
          rejected: 0,
          applied: 0,
        };
      }

      switch (item._id.status) {
        case "Applied":
          statsMap[jobId].applied = item.count;
          break;

        case "Shortlisted":
          statsMap[jobId].shortlisted = item.count;
          break;

        case "Interview":
          statsMap[jobId].interviews = item.count;
          break;

        case "Selected":
          statsMap[jobId].selected = item.count;
          break;

        case "Rejected":
          statsMap[jobId].rejected = item.count;
          break;
      }
    });

    const jobs = recruiterJobs.map((job) => {
      const stats = statsMap[job._id.toString()] || {
        applied: 0,
        shortlisted: 0,
        interviews: 0,
        selected: 0,
        rejected: 0,
      };

      return {
        _id: job._id,
        title: job.title,
        status: job.status,
        applicants: job.applicantsCount,
        ...stats,
      };
    });

    return res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs performance.",
    });
  }
};




export const getRecruiterUpcomingInterviews = async (req, res) => {
  try {
    const recruiterId = req.id;

    const interviews = await Interview.find({
      interviewStatus: "Scheduled",
      scheduleAt: {
        $gte: new Date(),
      },
    })
      .populate({
        path: "application",
        populate: [
          {
            path: "candidate",
            select: "fullName profile headline",
          },
          {
            path: "job",
            match: {
              recruiter: recruiterId,
            },
            select: "title company",
            populate: {
              path: "company",
              select: "companyName logo",
            },
          },
        ],
      })
      .sort({
        scheduleAt: 1,
      })
      .lean();

    const upcomingInterviews = interviews.filter(
      (interview) =>
        interview.application &&
        interview.application.job
    );

    return res.status(200).json({
      success: true,
      interviews: upcomingInterviews,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch upcoming interviews.",
    });
  }
};


