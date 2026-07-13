// export const getStatusMessage = (status, interviewDetails = {}) => {
//   switch (status) {
//     case "Shortlisted":
//       return `
//         Congratulations!
//         Your profile has been shortlisted
//         for the next stage of recruitment.
//       `;

//     case "Interview":
//       return;

//       {
//         interviewDetails.interviewStatus === "Scheduled"
//           ? `
//         Congratulations!
//         We are pleased to inform you that you have been selected for the interview round.

//         Interview Details:
//         Date: ${interviewDetails.date || "TBD"}
//         Time: ${interviewDetails.time || "TBD"}
//         Mode: ${interviewDetails.mode || "Online"}

//         ${
//           interviewDetails.mode === "Online"
//             ? `Meeting Link: ${interviewDetails.link || "Will be shared soon"}`
//             : `Venue: ${interviewDetails.venue || "Will be shared soon"}`
//         }

//         Please join the interview 10 minutes early and keep your resume and identification documents ready.

//         We look forward to speaking with you.

//         Best of luck!
//       `
//           : "";
//       }

//     case "Rejected":
//       return `
//         Thank you for your interest.
//         After careful review,
//         we have decided to move forward
//         with other candidates.
//       `;

//     case "Selected":
//       return `
//         Congratulations!
//         You have been selected for this role.
//       `;

//     default:
//       return `Application status updated.`;
//   }
// };




export const getStatusMessage = (
  status,
  interviewDetails = {}
) => {
  switch (status) {
    case "Shortlisted":
      return `
        Congratulations!
        Your profile has been shortlisted
        for the next stage of recruitment.
      `;

    case "Interview":
      switch (interviewDetails.interviewStatus) {
        case "Scheduled":
          return `
            Congratulations!

            We are pleased to inform you that you have been selected for the interview round.

            Interview Details:

            Date: ${interviewDetails.scheduleAt || "TBD"}

            Time: ${interviewDetails.time || "TBD"}

            Mode: ${interviewDetails.mode || "Online"}

            ${
              interviewDetails.mode === "Online"
                ? `Meeting Link: ${
                    interviewDetails.link || "Will be shared soon"
                  }`
                : `Venue: ${
                    interviewDetails.venue || "Will be shared soon"
                  }`
            }

            Please join the interview 10 minutes early.

            Best of luck!
          `;

        case "Completed":
          return `
            Your interview has been completed successfully.

            Our recruitment team is currently reviewing your performance.

            We will notify you regarding the final result shortly.

            Thank you for your time.
          `;

        case "Cancelled":
          return `
            We regret to inform you that the scheduled interview has been cancelled.

            If a new interview is arranged, you will receive another notification.

            Thank you for your patience.
          `;

        default:
          return `
            Interview status has been updated.
          `;
      }

    case "Rejected":
      return `
        Thank you for your interest.

        After careful review, we have decided to move forward with other candidates.

        We wish you success in your future opportunities.
      `;

    case "Selected":
      return `
        Congratulations!

        We are delighted to inform you that you have been selected for the position.

        Our HR team will contact you shortly regarding the next steps.

        Welcome aboard!
      `;

    default:
      return `
        Application status updated.
      `;
  }
};