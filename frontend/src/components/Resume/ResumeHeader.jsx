import "../../cssStyle/Resume/ResumeHeader.css";

const ResumeHeader = ({ isEdit = true, completion = 0 }) => {
  return (
    <div className="resume-builder-header">
      <div className="resume-builder-header-content">
        <h1>
          {isEdit ? "Edit Resume" : "Create Resume"}
        </h1>

        <p>
          {isEdit
            ? "Keep your resume updated to improve your chances of getting hired."
            : "Create your professional resume and start applying for jobs."}
        </p>
      </div>

      <div className="resume-completion-card">
        <span>Profile Completion</span>

        <h2>{completion}%</h2>

        <div className="resume-progress-bar">
          <div
            className="resume-progress-fill"
            style={{
              width: `${completion}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeHeader;