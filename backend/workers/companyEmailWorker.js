import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { sendMail } from "../utils/sendWelcomeEmail.js";

// connection
// sendMail
console.log("🚀 Company Email Worker Started");
new Worker(
  "companyEmailQueue",
  async (job) => {
    console.log("Job Received");
    console.log("Job Received");
    console.log(job.data);
    // console.log(job.name);
    try {
      switch (job.name) {
        case "companyRegister":
          const html = `
      <h2>Welcome to Job Portal</h2>

      <p>Your company has been registered successfully.</p>

      <h3>Company Details</h3>

      <ul>
        <li>Name: ${job.data.companyName}</li>
        <li>Industry: ${job.data.industry}</li>
        <li>Website: ${job.data.website}</li>
      </ul> 

      <p>Thank you for joining us.</p>
      `;

          await sendMail(
            job.data.email,
            "company registered successfully ",
            html,
          );
          break;

        default:
          break;
      }
    } catch (error) {
      console.log("error in companyEmailWorker");
      console.log(error);
    }
  },
  { connection },
);
