import "../../cssStyle/Resume/CareerObjective.css";

const CareerObjective = ({ formData, changeHandler }) => {
  return (
    <div className="career-objective-section resume-section-card">
      {/* Section Heading */}

      <div className="resume-section-header">
        <h2>Career Objective</h2>

        <p>
          Write a short objective describing your career goals and what you are
          looking for in your next opportunity.
        </p>
      </div>

      {/* Objective Input */}

      <div className="resume-form-group">
        <label htmlFor="objective">
          Career Objective <span>*</span>
        </label>

        <textarea
          id="objective"
          name="objective"
          rows={6}
          maxLength={1000}
          placeholder="Example: Passionate Full Stack Developer seeking an opportunity to build scalable web applications while continuously improving my technical and problem-solving skills."
          value={formData.objective}
          onChange={changeHandler}
        />

        <small>
          {formData.objective.length}/1000 Characters
        </small>
      </div>
    </div>
  );
};

export default CareerObjective;