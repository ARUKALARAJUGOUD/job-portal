import "../../cssStyle/Resume/ResumeSettings.css";

const ResumeSettings = ({ formData, changeHandler }) => {
  return (
    <div className="resume-settings-section resume-section-card">

      <div className="resume-section-header">
        <h2>Resume Settings</h2>

        <p>
          Control who can view your resume and whether you're currently looking
          for new opportunities.
        </p>
      </div>

      <div className="resume-settings-grid">

        {/* Resume Visibility */}

        <div className="resume-form-group">

          <label htmlFor="resumeVisibility">
            Resume Visibility
          </label>

          <select
            id="resumeVisibility"
            name="resumeVisibility"
            value={formData.resumeVisibility}
            onChange={changeHandler}
          >
            <option value="Public">
              Public
            </option>

            <option value="Recruiters Only">
              Recruiters Only
            </option>

            <option value="Private">
              Private
            </option>

          </select>

        </div>

        {/* Open To Work */}

        <div className="resume-switch-card">

          <div>

            <h4>Open To Work</h4>

            <p>
              Recruiters can know that you're actively looking for a job.
            </p>

          </div>

          <label className="resume-switch">

            <input
              type="checkbox"
              name="openToWork"
              checked={formData.openToWork}
              onChange={(e) =>
                changeHandler({
                  target: {
                    name: "openToWork",
                    value: e.target.checked,
                  },
                })
              }
            />

            <span className="resume-slider"></span>

          </label>

        </div>

      </div>

    </div>
  );
};

export default ResumeSettings;