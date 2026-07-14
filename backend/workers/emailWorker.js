import dotenv from "dotenv";
dotenv.config();

import { Worker } from "bullmq";
import { connection } from "../config/redis.js";
import { sendMail } from "../utils/sendWelcomeEmail.js";

// console.log("EMAIL =", process.env.EMAIL);
// console.log("PASSWORD EXISTS =", !!process.env.EMAIL_PASSWORD);

// new Worker(
//   "emailLoginQueue",
//   async (job) => {
//     // try {
//     switch (job.name) {
//       case "sendLoginEmail":
//         console.log("Received job = ", job.data);
//         console.log("email worker started ");
//         await sendMail(
//           job.data.email,
//           "Login Alert",
//           `Hello ${job.data.name} you will be  logging  in to   your account and your otp is ${job.data.otp}`,
//         );
//         break;
//       case "sendRegisterEmail":
//         await sendMail(
//           job.data.email,
//           "Register Alert",
//           `Hello ${job.data.name} you have successfully Registered  with  your account,  `,
//         );
//         break;
//       case "sendResendOtp":
//         await sendMail(
//           job.data.email,
//           "Otp for Reset Password  ",
//           `Hello ${job.data.name} your Otp for  Reset Password  is  ${job.data.otp}  `,
//         );
//         break;
//     }
//   },
//   { connection },
// );



new Worker(
  "emailLoginQueue",
  async (job) => {
    try {
      console.log("Received Job:", job.name);
      console.log(job.data);

      switch (job.name) {
        case "sendLoginEmail":
          console.log("Sending Login Email...");

          await sendMail(
            job.data.email,
            "Login Alert",
            `Hello ${job.data.name}, your OTP is ${job.data.otp}`
          );

          console.log("Login Email Sent Successfully");
          break;

        case "sendRegisterEmail":
          console.log("Sending Register Email...");

          await sendMail(
            job.data.email,
            "Register Alert",
            `Hello ${job.data.name}, Registration Successful`
          );

          console.log("Register Email Sent");
          break;

        case "sendResendOtp":
          console.log("Sending Reset OTP...");

          await sendMail(
            job.data.email,
            "Reset Password OTP",
            `OTP : ${job.data.otp}`
          );

          console.log("Reset OTP Sent");
          break;
      }
    } catch (err) {
      console.error("WORKER ERROR");
      console.error(err);
    }
  },
  { connection }
);