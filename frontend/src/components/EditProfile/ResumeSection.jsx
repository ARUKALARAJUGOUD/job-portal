import { FaFilePdf, FaUpload } from "react-icons/fa";

const ResumeSection = ({
  resumePreview,
  resumeHandler,
}) => {
  return (
    <div className="resume-section">

      <h2 className="section-title">
        Resume
      </h2>

      <p className="section-description">
        Upload your latest resume so recruiters can view it.
      </p>

      <div className="resume-card">

        <div className="resume-icon">

          <FaFilePdf />

        </div>

        <div className="resume-details">

          <h4>
            Current Resume
          </h4>

          <p>
            {resumePreview || "No Resume Uploaded"}
          </p>

        </div>

      </div>

      <label className="resume-upload-btn">

        <FaUpload />

        Upload New Resume

        <input
          type="file"
          hidden
          accept=".pdf,.doc,.docx"
          onChange={resumeHandler}
        />

      </label>

      <small className="resume-help">
        Supported formats :
        PDF, DOC, DOCX
      </small>

    </div>
  );
};

export default ResumeSection;