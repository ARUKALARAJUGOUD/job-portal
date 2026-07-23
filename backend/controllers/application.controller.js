import mongoose from "mongoose";
import { connection } from "../config/redis.js";
import { Application } from "../models/application.model.js";
import { Interview } from "../models/interview.model.js";
import { applicationStatusQueue } from "../queues/applicationStatusUpdate.js";

// create the application
export const createApplication = async (req, res) => {
  try {
    const candidate = req.id;
    const resume = req.resumeId;
    const { jobId: job } = req.params;

    const exist = await Application.findOne({
      candidate,
      job,
    });

    if (exist) {
      return res.status(409).json({
        message: "already exist ",
        success: false,
      });
    }
    if (!job) {
      return res.status(400).json({
        message: "Missing the Job",
        success: false,
      });
    }

    const { coverLetter } = req.body;
    if (!coverLetter) {
      return res.status(400).json({
        message: "missing cover Letter ",
        success: false,
      });
    }

    const application = await Application.create({
      candidate,
      coverLetter,
      resume,
      job,
    });

    // deleting the key of the user applications
    //  reasons:
    // new job creation increase the userApplications
    const cachedKey = `userApplications${candidate}`;
    await connection.del(cachedKey);

    //  deleting the redis key
    const cachedKeyRecruiterApplications = `recruiterApplications${candidate}`;
    await connection.del(cachedKeyRecruiterApplications);

    // delete the redis key
    const cachedKeyJobApplications = `jobApplications:${job}`;
    await connection.del(cachedKeyJobApplications);

    return res.status(201).json({
      message: "successfully created application ",
      success: true,
      application,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      errorMessage: error.message,
      error,
    });
  }
};

// get the application that are applied by the student (to view the applications )
export const getUserApplication = async (req, res) => {
  try {
    const id = req.id;
    if (!id) {
      return res.status(401).json({
        message: "please re-login",
        success: false,
      });
    }

    const cachedKey = `userApplications${id}`;
  

    // const cachedData = await connection.get(cachedKey);

    // // console.log("Cached Data:", cachedData);

    // // const cachedData = await connection.get(cachedKey);
    // if (cachedData) {
    //   try {
    //     return res.status(200).json({
    //       success: true,
    //       source: "redis",
    //       applications: JSON.parse(cachedData),
    //     });
    //   } catch (error) {
    //     await connection.del(cachedKey);
    //   }
    // }
   const applications = await Application.find({ candidate: id })
  .populate("candidate")
  .populate("resume")
  .populate({
    path: "job",
    populate: [
      {
        path: "company",
        select: "companyName logo location",
      },
      {
        path: "recruiter",
        select:
          "fullName email phoneNumber profile currentPosition companyName headline location",
      },
    ],
  });
    if (applications.length === 0) {
      return res.status(404).json({
        message: "Application not found ",
        success: false,
      });
    }

    await connection.set(cachedKey, JSON.stringify(applications), "EX", 3600);
    return res.status(200).json({
      success: true,
      source: "mongodb",
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      errorMessage: error.message,
      error,
    });
  }
};

// get the total  jobs Applications that are created by the recruiter (get the total applications on jobs that  are created by the recruiter )
// used by the recruiter to know how many applications get from the created jobs

// export const getRecruiterApplication = async (req, res) => {
//   try {
//     const recruiterId = req.id;
//     const cachedKey = `recruiterApplications${recruiterId}`;
//     // const cachedData = await connection.get(cachedKey);
//     // if (cachedData) {
//     //   try {
//     //     return res.status(200).json({
//     //       success: true,
//     //       source: "redis",
//     //       applications: JSON.parse(cachedData),
//     //     });
//     //   } catch (error) {
//     //     await connection.del(cachedKey);
//     //   }
//     // }
//     const applications = await Application.aggregate([
//       {
//         $lookup: {
//           from: "jobs",
//           localField: "job",
//           foreignField: "_id",
//           as: "application",
//         },
//       },
//       {
//         $unwind: "$application",
//       },
//       {
//         $match: {
//           "application.recruiter": new mongoose.Types.ObjectId(recruiterId),
//         },
//       },
//     ]).populate()

//     // stores in the redis with recruiter id
//     await connection.set(cachedKey, JSON.stringify(applications), "EX", 3600);

//     return res.status(200).json({
//       success: true,
//       source: "mongodb",
//       // recruiterApplications,
//       applications,
//     });
//   } catch (error) {
//     return res.status(500).json({
//       message: "server error ",
//       errorMessage: error.message,
//       error,
//     });
//   }
// };

export const getRecruiterApplication = async (req, res) => {
  try {
    const recruiterId = req.id;

    const cachedKey = `recruiterApplications${recruiterId}`;

    const cachedData = await connection.get(cachedKey);
    if (cachedData) {
      return res.status(200).json({
        success: true,
        source: "redis",
        applications: JSON.parse(cachedData),
      });
    }

    const applications = await Application.aggregate([
      // Join Jobs
      {
        $lookup: {
          from: "jobs",
          localField: "job",
          foreignField: "_id",
          as: "job",
        },
      },
      {
        $unwind: "$job",
      },

      // Only jobs created by this recruiter
      {
        $match: {
          "job.recruiter": new mongoose.Types.ObjectId(recruiterId),
        },
      },

      {
        $match: {
          candidate: {
            $ne: new mongoose.Types.ObjectId(recruiterId),
          },
        },
      },

      // Join Candidate(User)
      {
        $lookup: {
          from: "users",
          localField: "candidate",
          foreignField: "_id",
          as: "candidate",
        },
      },
      {
        $unwind: "$candidate",
      },

      // Join Company
      {
        $lookup: {
          from: "companies",
          localField: "job.company",
          foreignField: "_id",
          as: "company",
        },
      },
      {
        $unwind: "$company",
      },

      // Join Resume (optional)
      {
        $lookup: {
          from: "resumes",
          localField: "resume",
          foreignField: "_id",
          as: "resume",
        },
      },
      {
        $unwind: {
          path: "$resume",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Return only required fields
      {
        $project: {
          status: 1,
          coverLetter: 1,
          createdAt: 1,
          updatedAt: 1,

          candidate: {
            _id: "$candidate._id",
            fullName: "$candidate.fullName",
            email: "$candidate.email",
            phoneNumber: "$candidate.phoneNumber",
            headline: "$candidate.headline",
            about: "$candidate.about",
            experienceYears: "$candidate.experienceYears",
            expectedSalary: "$candidate.expectedSalary",
            location: "$candidate.location",
            profile: "$candidate.profile",
            resumeUrl: "$candidate.resumeUrl",
          },

          job: {
            _id: "$job._id",
            title: "$job.title",
            salary: "$job.salary",
            location: "$job.location",
            workMode: "$job.workMode",
            employmentType: "$job.employmentType",
            experienceRequired: "$job.experienceRequired",
            status: "$job.status",
            createdAt: "$job.createdAt",
          },

          company: {
            _id: "$company._id",
            companyName: "$company.companyName",
            logo: "$company.logo",
            industry: "$company.industry",
            website: "$company.website",
          },

          resume: {
            _id: "$resume._id",
            title: "$resume.title",
          },
        },
      },
    ]);

    await connection.set(cachedKey, JSON.stringify(applications), "EX", 3600);

    return res.status(200).json({
      success: true,
      source: "mongodb",
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      errorMessage: error.message,
      error,
    });
  }
};

// get the applications of particular job  (when user click on particular job to view application on it )
// used by the recruiter
export const getApplicationsOnJob = async (req, res) => {
  try {
    const { id: job } = req.params;
    if (!job) {
      return res.status(400).json({
        success: false,
        message: "select the job ",
      });
    }
    const cachedKey = `jobApplications:${job}`;
    const cachedData = await connection.get(cachedKey);

    if (cachedData) {
      try {
        return res.status(200).json({
          success: true,
          source: "redis",
          applications: JSON.parse(cachedData),
        });
      } catch (error) {
        await connection.del(cachedKey);
      }
    }
    const applications = await Application.find({ job }).populate(
      "candidate job",
    );
    if (applications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No applications on this job ",
      });
    }

    // stores in the redis
    await connection.set(cachedKey, JSON.stringify(applications), "EX", 3600);

    return res.status(200).json({
      success: true,
      source: "mongodb",
      applications,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      errorMessage: error.message,
      error,
    });
  }
};

// change the status of application
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const application = id;
    const userId = req.id;
    const interview = userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "please re-login",
      });
    }
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "missing the applicant ",
      });
    }

    const { status, scheduleAt, time, mode, link, venue, interviewStatus } =
      req.body;

    const applicant = await Application.findByIdAndUpdate(
      id,
      { status },

      { new: true },
    )
      .populate("candidate job")
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    const interviewDetails = {
      application: id,

      scheduleAt,
      time,
      mode,
      link,
      venue,
      interviewStatus,
      interview: userId,
    };

    let interviewInfo = null;

    if (status === "Interview") {
      if (!scheduleAt || !time || !mode) {
        return res.status(400).json({
          success: false,
          message: "Interview details are required.",
        });
      }

      if (mode === "Online" && !link) {
        return res.status(400).json({
          success: false,
          message: "Meeting link is required.",
        });
      }

      if (mode === "Offline" && !venue) {
        return res.status(400).json({
          success: false,
          message: "Venue is required.",
        });
      }

      interviewInfo = await Interview.findOneAndUpdate(
        {
          application: id,
        },
        {
          application: id,
          interview: userId,
          scheduleAt,
          time,
          mode,
          link,
          venue,
          interviewStatus,
        },
        {
          upsert: true,
          new: true,
          runValidators: true,
        },
      );
    }

    await applicationStatusQueue.add("updateStatus", {
      status: status,
      email: applicant.candidate.email,
      candidate: applicant.candidate,
      jobInfo: applicant.job,
      company: applicant.job.company,
      interviewDetails: interviewInfo,
    });

    // deleting the key
    //  reasons
    //  redis may store the old data after the update
    const cachedKey = `userApplications${userId}`;
    await connection.del(cachedKey);

    //  deleting the redis key
    const cachedKeyRecruiterApplications = `recruiterApplications${applicant.job.recruiter}`;
    await connection.del(cachedKeyRecruiterApplications);

    //  deleting the redis key

    const cachedKeyJobApplications = `jobApplications:${applicant.job._id}`;
    await connection.del(cachedKeyJobApplications);

    return res.status(200).json({
      message: "successfully updated status ",
      success: true,
      applicant,
      interviewInfo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      errorMessage: error.message,
      error,
    });
  }
};
