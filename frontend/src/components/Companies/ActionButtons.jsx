

// import "../../cssStyle/Companies/ActionButtons.css";

// const ActionButtons = ({ loading, navigate }) => {
//   return (
//     <div className="company-action-buttons">
//       {/* Cancel */}

//       <button
//         type="button"
//         className="company-btn cancel-company-btn"
//         onClick={() => navigate(-1)}
//       >
//         Cancel
//       </button>

//       {/* Submit */}

//       <button
//         type="submit"
//         disabled={loading}
//         className="company-btn create-company-btn"
//       >
//         {loading ? (
//           <>
//             <span className="company-spinner"></span>
//             Creating...
//           </>
//         ) : (
//           "Create Company"
//         )}
//       </button>
//     </div>
//   );
// };

// export default ActionButtons;



import "../../cssStyle/Companies/ActionButtons.css";

const ActionButtons = ({
  loading,
  navigate,

  // Default values (used by Create Company page)
  buttonText = "Create Company",
  loadingText = "Creating...",
}) => {
  return (
    <div className="company-action-buttons">

      {/* Cancel Button */}

      <button
        type="button"
        className="company-btn cancel-company-btn"
        onClick={() => navigate(-1)}
      >
        Cancel
      </button>

      {/* Submit Button */}

      <button
        type="submit"
        disabled={loading}
        className="company-btn create-company-btn"
      >
        {loading ? (
          <>
            <span className="company-spinner"></span>
            {loadingText}
          </>
        ) : (
          buttonText
        )}
      </button>

    </div>
  );
};

export default ActionButtons;