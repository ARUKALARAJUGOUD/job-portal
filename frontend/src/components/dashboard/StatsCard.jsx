

import "./StatsCard.css";

const StatsCard = ({
  title,
  value,
  icon,
  description,
  iconColor = "blue",
}) => {
  return (
    <div className="stats-card">

      <div className={`stats-card-icon ${iconColor}`}>
        {icon}
      </div>

      <div className="stats-card-content">

        <p className="stats-title">
          {title}
        </p>

        <h2 className="stats-value">
          {value}
        </h2>

        {description && (
          <p className="stats-description">
            {description}
          </p>
        )}

      </div>

    </div>
  );
};

export default StatsCard;