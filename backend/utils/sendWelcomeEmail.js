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


export const sendMail = async (email, subject, html) => {
  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": process.env.BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Next Career Step",
          email: "arukalaraju616@gmail.com",
        },
        to: [
          {
            email,
          },
        ],
        subject,
        htmlContent: html,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      throw new Error(data.message);
    }

    console.log("✅ Email Sent");
    console.log(data);
  } catch (err) {
    console.error("BREVO ERROR");
    console.error(err);
    throw err;
  }
};