import { Worker } from "bullmq";
import dotenv from "dotenv";
dotenv.config();

import { connection } from "../config/redis.js";
import { getStatusMessage } from "../utils/getStatusMessage.js";
import { sendMail } from "../utils/sendWelcomeEmail.js";

// getStatusMessage
new Worker(
  "applicationStatusQueue",

  async (job) => {
    try {
      switch (job.name) {
        case "updateStatus":
          const status = job.data.status;

          const interviewDetails = job.data.interviewDetails;
          const { fullName } = job.data.candidate;
          const email = job.data.email;

          const { title, salary, location, employmentType, workMode } =
            job.data.jobInfo;

          const { companyName, companyEmail, website } = job.data.company;
          console.log("email === " + email);
          const html = `
            <h2>Application Status Update</h2>

            <p>Dear ${fullName},</p>

            <p>${getStatusMessage(status,interviewDetails)}</p>

            <h3>Status: ${status}</h3>

            <h3>Job Details</h3>

            <ul>
              <li>Position: ${title}</li>
              <li>Company: ${companyName}</li>
              <li>Location: ${location}</li>
              <li>Employment Type: ${employmentType}</li>
              <li>Work Mode: ${workMode}</li>
            </ul>

            <p>
              Visit our portal for more details.
            </p>
          `;
          await sendMail(email, `Application ${status} `, html);
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("error in the application worker ");
      console.log(error);
    }
  },

  { connection },
);
