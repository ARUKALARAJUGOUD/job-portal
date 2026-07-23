
import { TriangleAlert } from "lucide-react";
import "./ErrorState.css";

const ErrorState = ({
  title = "Something went wrong",
  description = "Please try again later.",
  onRetry,
}) => {
  return (
    <div className="error-state-container">

      <div className="error-state-icon-wrapper">
        <TriangleAlert
          size={48}
          className="error-state-icon"
        />
      </div>

      <h3 className="error-state-title">
        {title}
      </h3>

      <p className="error-state-description">
        {description}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="error-state-retry-button"
        >
          Retry
        </button>
      )}

    </div>
  );
};

export default ErrorState;