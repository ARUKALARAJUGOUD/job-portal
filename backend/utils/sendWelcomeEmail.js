
// import dns from "dns/promises";
// import nodemailer from "nodemailer";

// export const sendMail = async (email, subject, html) => {
//   const { address } = await dns.lookup("smtp.gmail.com", { family: 4 });

//   console.log("IPv4:", address);

//  const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });

//   const info = await transporter.sendMail({
//     from: process.env.EMAIL,
//     to: email,
//     subject,
//     html,
//   });

//   console.log(info);
// };



import nodemailer from "nodemailer";

export const sendMail = async (email, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject,
      html,
    });

    console.log(info.response);
  } catch (err) {
    console.log(err);
  }
};