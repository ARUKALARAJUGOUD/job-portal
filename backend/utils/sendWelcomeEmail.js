import dns from "dns/promises";
import nodemailer from "nodemailer";

export const sendMail = async (email, subject, html) => {
  try {
    // Force IPv4
    const { address } = await dns.lookup("smtp.gmail.com", {
      family: 4,
    });

    console.log("Using Gmail IPv4:", address);

    const transporter = nodemailer.createTransport({
      host: address,
      port: 465,
      secure: true,

      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },

      tls: {
        servername: "smtp.gmail.com",
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      html,
    });

    console.log("Email sent:", info.response);
  } catch (err) {
    console.error("EMAIL ERROR:", err);
  }
};