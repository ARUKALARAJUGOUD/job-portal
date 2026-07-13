// import "../../cssStyle/Resume/ResumeActionButtons.css";

// const ResumeActionButtons = ({
//   loading,
//   navigate,
//   isEdit = false,
// }) => {
//   return (
//     <div className="resume-action-buttons">

//       <button
//         type="button"
//         className="resume-btn resume-cancel-btn"
//         onClick={() => navigate(-1)}
//       >
//         Cancel
//       </button>

//       <button
//         type="submit"
//         disabled={loading}
//         className="resume-btn resume-submit-btn"
//       >
//         {loading ? (
//           <>
//             <span className="resume-spinner"></span>

//             {isEdit ? "Updating..." : "Saving..."}
//           </>
//         ) : (
//           isEdit ? "Update Resume" : "Save Resume"
//         )}
//       </button>

//     </div>
//   );
// };

// export default ResumeActionButtons;



import "../../cssStyle/Resume/ResumeActionButtons.css";

const ResumeActionButtons = ({
  loading,
  navigate,
  isEdit = false,
}) => {
  return (
    <div className="resume-builder-action-buttons">

      <button
        type="button"
        className="resume-builder-btn resume-builder-cancel-btn"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>

      <button
        type="submit"
        disabled={loading}
        className="resume-builder-btn resume-builder-submit-btn"
      >
        {loading ? (
          <>
            <span className="resume-builder-spinner"></span>

            {isEdit ? "Updating Resume..." : "Saving Resume..."}
          </>
        ) : (
          isEdit ? "Update Resume" : "Save Resume"
        )}
      </button>

    </div>
  );
};

export default ResumeActionButtons;