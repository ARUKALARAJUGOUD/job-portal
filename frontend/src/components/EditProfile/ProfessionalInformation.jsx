const ProfessionalInformation = ({ formData, changeHandler }) => {
  return (
    <div className="professional-information-section">
      <h2 className="section-title">Professional Information</h2>

      <div className="professional-grid">
        {/* Headline */}

        <div className="input-group full-width">
          <label>Professional Headline</label>

          <input
            type="text"
            name="headline"
            placeholder= "Ex : MERN Stack Developer"
            value={formData.headline}
            onChange={changeHandler}
          />
        </div>

        <div className="input-group full-width">
          <label>About Yourself</label>

          <textarea
            rows="6"
            maxLength={500}
            name="about"
            placeholder="Tell recruiters about your experience, projects, technical skills, achievements, certifications, career goals, and what makes you a great candidate..."
            value={formData.about}
            onChange={changeHandler}
          />

          <span className="textarea-count">{formData.about.length}/500</span>
        </div>

        {/* About */}

        {/* Current Position */}

        <div className="input-group">
          <label>Current Position</label>

          <input
            type="text"
            name="currentPosition"
            placeholder="Software Engineer"
            value={formData.currentPosition}
            onChange={changeHandler}
          />
        </div>

        {/* Company Name */}

        <div className="input-group">
          <label>Current Company</label>

          <input
            type="text"
            name="companyName"
            placeholder="Google, Microsoft..."
            value={formData.companyName}
            onChange={changeHandler}
          />
        </div>

        {/* Experience */}

        <div className="input-group">
          <label>Experience (Years)</label>

          <input
            type="number"
            min="0"
            name="experienceYears"
            placeholder="2"
            value={formData.experienceYears}
            onChange={changeHandler}
          />
        </div>

        {/* Expected Salary */}

        <div className="input-group">
          <label>Expected Salary (₹ / Year)</label>

          <input
            type="number"
            min="0"
            name="expectedSalary"
            placeholder="600000"
            value={formData.expectedSalary}
            onChange={changeHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfessionalInformation;
