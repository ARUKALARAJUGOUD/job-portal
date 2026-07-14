// import nodemailer from "nodemailer";

// export const sendMail = async (email, subject, html) => {
//   try {
//     console.log("Creating transporter");


//     const transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       requireTLS: true,
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });

//     console.log("Verifying SMTP...");

//     await transporter.verify();

//     console.log("SMTP Verified");

//     const info = await transporter.sendMail({
//       from: process.env.EMAIL,
//       to: email,
//       subject,
//       html,
//     });

//     console.log("MAIL SENT");
//     console.log(info);
//   } catch (err) {
//     console.error("SEND MAIL ERROR");
//     console.error(err);
//     throw err;
//   }
// };




import dns from "dns/promises";
import nodemailer from "nodemailer";

export const sendMail = async (email, subject, html) => {
  const { address } = await dns.lookup("smtp.gmail.com", { family: 4 });

  console.log("IPv4:", address);

  const transporter = nodemailer.createTransport({
    host: address,           // <-- use IPv4 directly
    port: 587,
    secure: false,
    requireTLS: true,

    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },

    tls: {
      servername: "smtp.gmail.com", // important
    },
  });

  const info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject,
    html,
  });

  console.log(info);
};