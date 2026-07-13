import { connection } from "../config/redis.js";
import { savedJob } from "../models/saved.model.js";

// add to saved jobs
export const addSaveJob = async (req, res) => {
  try {
    const user = req.id;
    const { jobId: job } = req.params;

    if (!user) {
      return res.status(402).json({
        message: "token expires please login ",
        success: false,
      });
    }
    if (!job) {
      return res.status(400).json({
        message: "Not selected job ",
        success: false,
      });
    }

    const exist = await savedJob.findOne({
      user,
      job,
    });

    if (exist) {
      return res.status(409).json({
        message: "exist in the saved jobs ",
        success: false,
      });
    }
    const save = await savedJob.create({
      user,
      job,
    });

    // deleting the savedJobs key in the redis
    // because adding the new job get changes in the data getSaved jobs
    // increasing the savedJobs so we are deleting it
    const cachedKey = `savedJobs:${user}`;
    await connection.del(cachedKey);

    return res.status(200).json({
      message: "successfully saved job ",
      success: true,
    });
  } catch (error) {
    console.log("error in the saveJob ");
    console.log(error);

    return res.status(500).json({
      message: error.message,
      error,
    });
  }
};

// remove job from the saved jobs
export const removeSaveJob = async (req, res) => {
  try {
    const { id: job } = req.params;
    const user = req.id;
    if (!user) {
      return res.status(401).json({
        message: "please re-login",
        success: false,
      });
    }
    if (!job) {
      return res.status(400).json({
        message: "Not selected Job ",
        success: false,
      });
    }

    const removeJob = await savedJob.findOneAndDelete({
      user,
      job,
    });

    if (!removeJob) {
      return res.status(404).json({
        message: "No Job  ",
        success: false,
      });
    }
    // deleting the savedJobs key because
    // we are removing the job from the savedJobs
    // decreasing the saved jobs

    const cachedKey = `savedJobs:${user}`;
    await connection.del(cachedKey);

    return res.status(200).json({
      message: "successfully removed ",
      success: true,
      removeJob,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// list out saved jobs by the user
export const getSavedJobs = async (req, res) => {
  try {
    const id = req.id;
    if (!id) {
      return res.status(401).json({
        message: "please re-login ",
        success: false,
      });
    }

    const cachedKey = `savedJobs:${id}`;
    // await connection.del(cachedKey);

    const cachedData = await connection.get(cachedKey);
    if (cachedData) {
      try {
        return res.status(200).json({
          success: true,
          source: "redis",
          jobs: JSON.parse(cachedData),
        });
      } catch (error) {
        await connection.del(cachedKey);
      }
    }

    const jobs = await savedJob
      .find({ user: id })
      .populate("user")
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });
    if (jobs.length == 0) {
      return res.status(404).json({
        message: "No saved jobs ",
        success: false,
      });
    }

    // await connection.del(cachedKey);
    await connection.set(cachedKey, JSON.stringify(jobs), "EX", 3600);

    return res.status(200).json({
      success: true,
      source: "mongodb",
      jobs,
    });
  } catch (error) {
    return res.status(500).json({
      message: "server error ",
      error,
      errorMessage: error.message,
    });
  }
};
