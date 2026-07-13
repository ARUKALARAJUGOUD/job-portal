import { FaSave, FaTimes } from "react-icons/fa";

const ActionButtons = ({
  loading,
  navigate,
}) => {
  return (

    <div className="action-buttons">

      {/* Cancel Button */}

      <button
        type="button"
        className="cancel-btn"
        onClick={() => navigate(-1)}
      >
        <FaTimes />

        Cancel
      </button>

      {/* Save Button */}

      <button
        type="submit"
        className="edit-save-btn"
        disabled={loading}
      >
        <FaSave />

        {
          loading
            ? "Updating..."
            : "Save Changes"
        }

      </button>

    </div>

  );
};

export default ActionButtons;