import nodemailer from "nodemailer";

export const sendMail = async (email, subject, html) => {
  try {
    console.log("Creating transporter");

    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASSWORD,
    //   },
    // });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 30000,
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
