

import "./DashboardLayout.css";

const DashboardLayout = ({
  sidebar,
  header,
  stats,
  leftSection,
  rightSection,
  bottomSection,
}) => {
  return (
    <div className="dashboard">

      {sidebar && (
        <aside className="dashboard-sidebar">
          {sidebar}
        </aside>
      )}

      <main className="dashboard-main">

        <header className="dashboard-header">
          {header}
        </header>

        <section className="dashboard-stats">
          {stats}
        </section>

        <section className="dashboard-grid">

          <div className="dashboard-left">
            {leftSection}
          </div>

          <div className="dashboard-right">
            {rightSection}
          </div>

        </section>

        <section className="dashboard-bottom">
          {bottomSection}
        </section>

      </main>
    </div>
  );
};

export default DashboardLayout;