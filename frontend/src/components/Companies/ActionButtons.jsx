
import "../../cssStyle/companies/ActionButtons.css";

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