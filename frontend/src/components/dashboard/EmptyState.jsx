
import { Inbox } from "lucide-react";
import "./EmptyState.css";

const EmptyState = ({
  title = "Nothing Found",
  description = "There is no data to display.",
}) => {
  return (
    <div className="empty-state-container">
      <div className="empty-state-icon-wrapper">
        <Inbox
          size={48}
          className="empty-state-icon"
        />
      </div>

      <h3 className="empty-state-title">
        {title}
      </h3>

      <p className="empty-state-description">
        {description}
      </p>
    </div>
  );
};

export default EmptyState;