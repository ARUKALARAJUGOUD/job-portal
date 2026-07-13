import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { sendMail } from "../utils/sendWelcomeEmail.js";

// console.log("EMAIL =", process.env.EMAIL);
// console.log("PASSWORD EXISTS =", !!process.env.EMAIL_PASSWORD);

new Worker(
  "emailLoginQueue",
  async (job) => {
    // try {
    switch (job.name) {
      case "sendLoginEmail":
        console.log("Received job = ", job.data);
        console.log("email worker started ");
        await sendMail(
          job.data.email,
          "Login Alert",
          `Hello ${job.data.name} you will be  logging  in to   your account and your otp is ${job.data.otp}`,
        );
        break;
      case "sendRegisterEmail":
        await sendMail(
          job.data.email,
          "Register Alert",
          `Hello ${job.data.name} you have successfully Registered  with  your account,  `,
        );
        break;
      case "sendResendOtp":
        await sendMail(
          job.data.email,
          "Otp for Reset Password  ",
          `Hello ${job.data.name} your Otp for  Reset Password  is  ${job.data.otp}  `,
        );
        break;
    }
  },
  { connection },
);
