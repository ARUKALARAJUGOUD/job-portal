
import "./DashboardSection.css";

const DashboardSection = ({
  title,
 subtitle,
  // action,
  children,
}) => {
  return (
    <section className="dashboard-section">

      <div className="dashboard-section-header">

        <div>

          <h2>{title}</h2>

          {subtitle && (
            <p>{subtitle}</p>
          )}

        </div>

        {/* {action && (
          <div>
            {action}
          </div>
        )} */}

      </div>

      <div className="dashboard-divider"></div>

      <div className="dashboard-section-body">
        {children}
      </div>

    </section>
  );
};

export default DashboardSection;