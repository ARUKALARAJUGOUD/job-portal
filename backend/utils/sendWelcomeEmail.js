import nodemailer from "nodemailer";

export const sendMail = async (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject,
    // text: message,
    html: html,
  });
};

// export const sendWelcomeEmail = async (email, subject, message) => {

//   console.log("Sending email to:", email);
//   console.log("EMAIL:", process.env.EMAIL);
//   console.log("PASSWORD EXISTS:", !!process.env.EMAIL_PASSWORD);

//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.EMAIL,
//     to: email,
//     subject,
//     text: message,
//   });

//   console.log("EMAIL SENT");
// };
