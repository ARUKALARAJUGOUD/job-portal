import dotenv from "dotenv";
dotenv.config();

import nodemailer from "nodemailer";

async function test() {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    console.log("Verifying...");

    await transporter.verify();

    console.log("SMTP VERIFIED");

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL, // send to yourself
      subject: "SMTP Test",
      text: "Hello from Render",
    });

    console.log("MAIL SENT");
    console.log(info);
  } catch (err) {
    console.error(err);
  }
}

test();