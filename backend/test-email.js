// import nodemailer from "nodemailer";
// import dotenv from "dotenv";

// dotenv.config();
// console.log("EMAIL:", process.env.EMAIL);
// console.log("PASSWORD:", process.env.EMAIL_PASSWORD ? "Loaded" : "Not Loaded");
// async function test() {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: { 
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL,
//       to: process.env.EMAIL,
//       subject: "Test Email",
//       text: "Hello from Render",
//     });

//     console.log(info);
//   } catch (err) {
//     console.error(err);
//   }
// }

// test();