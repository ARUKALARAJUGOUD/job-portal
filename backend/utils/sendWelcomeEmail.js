// import dns from "dns/promises";
// import nodemailer from "nodemailer";

// export const sendMail = async (email, subject, html) => {
//   try {
//     // // Force IPv4
//     // const { address } = await dns.lookup("smtp.gmail.com", {
//     //   family: 4,
//     // });

//     // console.log("Using Gmail IPv4:", address);

//     // const transporter = nodemailer.createTransport({
//     //   host: address,
//     //   port: 465,
//     //   secure: true,

//     //   auth: {
//     //     user: process.env.EMAIL,
//     //     pass: process.env.EMAIL_PASSWORD,
//     //   },

//     //   tls: {
//     //     servername: "smtp.gmail.com",
//     //   },
//     // });

//     console.log("EMAIL =", process.env.EMAIL);
//     console.log("SMTP HOST = smtp-relay.brevo.com");

//     const { address } = await dns.lookup("smtp-relay.brevo.com", {
//       family: 4,
//     });

//     console.log("Brevo IPv4:", address);

//     console.log("Creating transporter...");
//     const transporter = nodemailer.createTransport({
//       host: address,
//       port: 587,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//       tls: {
//         servername: "smtp-relay.brevo.com",
//       },
//     });

//     console.log(transporter.options);

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL,
//       to: email,
//       subject,
//       html,
//     });

//     console.log("Email sent:", info.response);
//   } catch (err) {
//     console.error("EMAIL ERROR:", err);
//   }
// };






import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (email, subject, html) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject,
      html,
    });

    console.log("✅ Email Sent");
    console.log(response);
  } catch (err) {
    console.error("❌ RESEND ERROR");
    console.error(err);
    throw err;
  }
};