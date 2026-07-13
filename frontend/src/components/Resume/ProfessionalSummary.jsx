import "../../cssStyle/Resume/ProfessionalSummary.css";

const ProfessionalSummary = ({ formData, changeHandler }) => {
  return (
    <div className="professional-summary-section resume-section-card">
      {/* Header */}

      <div className="resume-section-header">
        <h2>Professional Summary</h2>

        <p>
          Describe your professional background, key strengths, achievements,
          and what makes you a valuable candidate.
        </p>
      </div>

      {/* Summary */}

      <div className="resume-form-group">
        <label htmlFor="professionalSummary">
          Professional Summary <span>*</span>
        </label>

        <textarea
          id="professionalSummary"
          name="professionalSummary"
          rows={8}
          maxLength={3000}
          placeholder="Example: Full Stack MERN Developer with 2+ years of experience designing and developing scalable web applications. Strong knowledge of React, Node.js, Express, MongoDB, REST APIs, authentication, cloud deployment, and modern JavaScript. Passionate about building clean, efficient, and user-friendly software."
          value={formData.professionalSummary}
          onChange={changeHandler}
        />

        <small>
          {formData.professionalSummary.length}/3000 Characters
        </small>
      </div>
    </div>
  );
};

export default ProfessionalSummary;