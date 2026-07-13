import { connection } from "../config/redis.js";
import { Application } from "../models/application.model.js";
import { Company } from "../models/company.model.js";
import { Job } from "../models/job.model.js";
import { savedJob } from "../models/saved.model.js";
import { Skill } from "../models/skill.model.js";

// created the job
export const createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      description,
      responsibilities,
      requirements,
      skillsRequired,
      experienceRequired,
      salary,
      location,
      workMode,
      employmentType,
      openings,
      applicationDeadline,
      applicantsCount,
      status,
    } = req.body;

    // console.log(req.body)
    const recruiter = req.id;
    if (!skillsRequired || skillsRequired.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one skill is required",
      });
    }

    if (
      !title ||
      !company ||
      !recruiter ||
      !skillsRequired ||
      !salary ||
      !location ||
      !workMode ||
      !employmentType ||
      !applicationDeadline ||
      !status
    ) {
      return res.status(400).json({
        message: "something is missing ",
        success: false,
      });
    }

    const job = await Job.create({ recruiter, ...req.body });

    // store the job details in the redis to make the fast response to reduce requests on the server

    // const cachedKey = `job:${job._id}`;
    // await connection.set(cachedKey, JSON.stringify(job), "EX", 3600);

    // delete totalJobs key
    const cachedKeyTotalJobs = `totalJobs`;
    await connection.del(cachedKeyTotalJobs);

    // deleting the recruiter jobs key because we are creating the job

    const cacheKeyRecruiterJobs = `recruiter:${recruiter}`;
    await connection.del(cacheKeyRecruiterJobs);

    const cachedKeyUserApplications = `userApplications${recruiter}`;
    await connection.del(cachedKeyUserApplications);

    //  deleting the redis key
    const cachedKeyRecruiterApplications = `recruiterApplications${recruiter}`;
    await connection.del(cachedKeyRecruiterApplications);

    //  deleting the redis key

    const cachedKeyJobApplications = `jobApplications:${job._id}`;
    await connection.del(cachedKeyJobApplications);

    // console.log("job = ",job)
    return res.status(200).json({
      message: "successfully job created ",
      job,
      success: true,
    });
  } catch (error) {
    console.log("error in the createJob ");
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error ",
      error,
    });
  }
};

// update  the job
export const updateJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);

    const id = req.id;
    if (!id) {
      return res.status(401).json({
        success: false,
        message: "please re-login ",
      });
    }
    if (!job) {
      return res.status(404).json({
        message: "job not found ",
        success: false,
      });
    }
    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      {
        ...req.body,
      },
      { new: true, runValidators: true },
      // { },
    );

    if (!updatedJob) {
      return res.status(404).json({
        message: "job not found ",
        success: false,
      });
    }

    // delete the data in the redis

    const cachedKey = `job:${updatedJob._id}`;
    await connection.del(cachedKey);

    // delete the totalJobs key
    const cachedKeyTotalJobs = `totalJobs`;
    await connection.del(cachedKeyTotalJobs);

    // deleting the recruiter jobs key because we are creating the job

    const cacheKeyRecruiterJobs = `recruiter:${updatedJob.recruiter}`;
    await connection.del(cacheKeyRecruiterJobs);

    // delete the redis key
    const cachedKeyUserApplications = `userApplications${id}`;
    await connection.del(cachedKeyUserApplications);

    //  deleting the redis key
    const cachedKeyRecruiterApplications = `recruiterApplications${job.recruiter}`;
    await connection.del(cachedKeyRecruiterApplications);

    //  deleting the redis key

    const cachedKeyJobApplications = `jobApplications:${jobId}`;
    await connection.del(cachedKeyJobApplications);

    return res.status(200).json({
      message: "successfully updated job ",
      success: true,
      updatedJob,
    });
  } catch (error) {
    console.log("error in the updateJob");
    console.log(error);
    return res.status(500).json({
      message: "server error ",
      error,
    });
  }
};

// delete the job by id
export const deleteJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const userId = req.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "please re-login",
      });
    }

    const deleteJob = await Job.findByIdAndDelete(id);

    if (!deleteJob) {
      return res.status(404).json({
        message: "Job not found ",
        success: false,
      });
    }

    // delete the data in the redis
    const cachedKey = `job:${deleteJob._id}`;
    await connection.del(cachedKey);

    // delete the totalJobs key
    const cachedKeyTotalJobs = `totalJobs`;
    await connection.del(cachedKeyTotalJobs);

    // deleting the recruiter jobs key because we are creating the job

    const cacheKeyRecruiterJobs = `recruiter:${deleteJob.recruiter}`;
    await connection.del(cacheKeyRecruiterJobs);

    const savedJobs = await savedJob.find({ job: id }).select("user");

    const JobApplications = await Application.deleteMany({ job: id });
    await savedJob.deleteMany({ job: id });

    //  const cachedKeySavedJobs = `savedJobs:${SavedJobs.user}`;
    // await connection.del(cachedKeySavedJobs);

    await Promise.all(
      savedJobs.map((saved) => connection.del(`savedJobs:${saved.user}`)),
    );

    //  redis may store the old data after the update
    const cachedKeyUserApplications = `userApplications${userId}`;
    await connection.del(cachedKeyUserApplications);

    //  deleting the redis key
    const cachedKeyRecruiterApplications = `recruiterApplications${deleteJob.recruiter}`;
    await connection.del(cachedKeyRecruiterApplications);

    //  deleting the redis key

    const cachedKeyJobApplications = `jobApplications:${id}`;
    await connection.del(cachedKeyJobApplications);

    return res.status(200).json({
      message: "successfully deleted job ",

      success: true,
      deletedApplications: JobApplications
        ? JobApplications
        : "No Applications",
    });
  } catch (error) {
    console.log("error in the delete job by id ");
    console.log(error);
    return res.status(500).json({
      message: "server error ",
      error,
    });
  }
};

// get the jobs which are created by the recruiter
export const getJobsByRecruiterId = async (req, res) => {
  try {
    const recruiter = req.id;
    if (!recruiter) {
      return res.status(401).json({
        message: "session expires ",
        success: false,
      });
    }

    const cacheKey = `recruiter:${recruiter}`;
    const cachedData = await connection.get(cacheKey);

    if (cachedData) {
      try {
        return res.status(200).json({
          success: true,
          source: "redis",
          jobs: JSON.parse(cachedData),
        });
      } catch (error) {
        return res.status(404).json({
          success: false,
          message: "data present in the redis but unable to fetch ",
        });
      }
    }
    const jobs = await Job.find({ recruiter })
      .populate("company", "companyName logo")
      .populate("skillsRequired", "name");

    if (!jobs) {
      return res.status(404).json({
        message: "No jobs found   ",
        success: false,
      });
    }

    // storing in to the redis
    await connection.set(cacheKey, JSON.stringify(jobs), "EX", 3600);

    return res.status(200).json({
      success: true,
      source: "mongodb",
      jobs,
    });
  } catch (error) {
    console.log("error in the get job by recruiter Id ");
    console.log(error);
    return res.status(500).json({
      message: "server error ",
      error,
    });
  }
};

// get the jobs to display in the dashboard
export const getJobs = async (req, res) => {
  try {
    const cachedKey = `totalJobs`;
    const cachedData = await connection.get(cachedKey);
    if (cachedData) {
      try {
        return res.status(200).json({
          success: true,
          source: "redis",
          jobs: JSON.parse(cachedData),
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          message: "Data exist in the redis but not got it ",
        });
      }
    }
    const jobs = await Job.find().populate("company");
    if (!jobs) {
      return res.status(404).json({
        message: "No Jobs ",
        success: false,
      });
    }

    // store the total jobs in the redis

    await connection.set(cachedKey, JSON.stringify(jobs), "EX", 3600);

    return res.status(200).json({
      success: true,
      source: "mongodb",
      jobs,
    });
  } catch (error) {
    console.log("error in the getJobs ");
    console.log(error);
    return res.status(500).json({
      message: "server error ",
      error,
    });
  }
};

// get job data for more information
export const getJobById = async (req, res) => {
  try {
    const { id: job } = req.params;
    if (!job) {
      return res.status(400).json({
        message: "select the job ",
        success: false,
      });
    }

    const cachedKey = `job:${job}`;
    const cachedData = await connection.get(cachedKey);

    if (cachedData) {
      try {
        return res.status(200).json({
          success: true,
          source: "redis",
          jobs: JSON.parse(cachedData),
        });
      } catch (error) {
        return res.status(404).json({
          message: "presents in the redis but not getting the data ",
          success: false,
        });
      }
    }

    const jobData = await Job.findById(job)
      // .populate("company")
      .populate({
        path: "company",
        select: "companyName logo website industry",
      })
      // .populate("recruiter")
      .populate({
        path: "recruiter",
        select: "fullName email phoneNumber headline profile",
      })
      // .populate("skillsRequired");
      .populate({
        path: "skillsRequired",
      });
    if (!jobData) {
      return res.status(404).json({
        message: "job not found ",
        success: false,
      });
    }

    // set into the redis
    await connection.set(cachedKey, JSON.stringify(jobData), "EX", 3600);

    return res.status(200).json({
      success: true,
      source: "mongodb",
      jobs: jobData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      errorMessage: error.message,
      error,
    });
  }
};

export const searchJobs = async (req, res) => {
  try {
    const {
      keyword = "",
      location = "",
      minSalary,
      maxSalary,
      experience,
      workMode,
      employmentType,
      sort = "newest",
    } = req.query;

    //  for filters
    const filter = {};
    // search jobs which are only active
    filter.status = "Active";
    // exclude the jobs which are deadline
    filter.applicationDeadline = {
      $gte: new Date(),
    };

    // sort filters
    let sortOption = {};

    // for the paging
    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    switch (sort) {
      case "salary-high":
        sortOption.salary = -1;

        break;

      case "salary-low":
        sortOption.salary = 1;

        break;

      case "deadline":
        sortOption.applicationDeadline = 1;

        break;

      case "oldest":
        sortOption.createdAt = 1;

        break;

      default:
        sortOption.createdAt = -1;
    }

    if (location.trim()) {
      filter.location = {
        $regex: location,
        $options: "i",
      };
    }
    if (keyword.trim()) {
      // checking the skills that are matched
      const matchedSkills = await Skill.find({
        name: {
          $regex: keyword,
          $options: "i",
        },
      }).select("_id");

      // company name that is matched

      const matchedCompanies = await Company.find({
        companyName: {
          $regex: keyword,

          $options: "i",
        },
      }).select("_id");

      // stores the company ids
      const companyIds = matchedCompanies.map((company) => company._id);
      // stores the skillIds
      const skillIds = matchedSkills.map((skill) => skill._id);

      filter.$or = [
        {
          title: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          description: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          responsibilities: {
            $elemMatch: {
              $regex: keyword,
              $options: "i",
            },
          },
        },
        {
          requirements: {
            $elemMatch: {
              $regex: keyword,
              $options: "i",
            },
          },
        },
      ];

      if (skillIds.length > 0) {
        filter.$or.push({
          skillsRequired: {
            $in: skillIds,
          },
        });
      }

      if (companyIds.length > 0) {
        filter.$or.push({
          company: {
            $in: companyIds,
          },
        });
      }
    }

    if (minSalary || maxSalary) {
      filter.salary = {};

      if (minSalary) {
        filter.salary.$gte = Number(minSalary);
      }

      if (maxSalary) {
        filter.salary.$lte = Number(maxSalary);
      }
    }

    if (experience) {
      filter.experienceRequired = {
        $lte: Number(experience),
      };
    }

    if (workMode) {
      filter.workMode = workMode;
    }

    if (employmentType) {
      filter.employmentType = employmentType;
    }

    //  $or: [
    //     {
    //       title: {
    //         $regex: keyword,
    //         $options: "i",
    //       },
    //     },
    //     {
    //       description: {
    //         $regex: keyword,
    //         $options: "i",
    //       },
    //     },
    //   ],

    const jobs = await Job.find(filter)
      .populate("company")
      .populate("skillsRequired")
      .populate("recruiter")
      .sort(sortOption)
      .skip(skip)
      .limit(limit)
      .lean();

    const totalJobs = await Job.countDocuments(filter);
    const totalPages = Math.ceil(totalJobs / limit);

    return res.status(200).json({
      success: true,

      jobs,

      currentPage: page,

      totalPages,

      totalJobs,

      limit,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
