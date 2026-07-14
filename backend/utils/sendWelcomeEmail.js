import nodemailer from "nodemailer";

export const sendMail = async (email, subject, html) => {
  try {
    console.log("Creating transporter");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    console.log("Verifying SMTP...");

    await transporter.verify();

    console.log("SMTP Verified");

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      html,
    });

    console.log("MAIL SENT");
    console.log(info);
  } catch (err) {
    console.log("SEND MAIL ERROR");
    console.error(err);
  }
};


