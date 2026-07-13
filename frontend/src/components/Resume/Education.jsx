import { FaGraduationCap, FaPlus, FaTrash } from "react-icons/fa";
import "../../cssStyle/Resume/Education.css";

const Education = ({ formData, setFormData }) => {
  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [
        ...prev.education,
        {
          college: "",
          degree: "",
          field: "",
          grade: "",
          fromYear: "",
          toYear: "",
          currentlyStudying: false,
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  const changeHandler = (index, e) => {
    const { name, value, type, checked } = e.target;

    const updatedEducation = [...formData.education];

    updatedEducation[index][name] =
      type === "checkbox" ? checked : value;

    if (name === "currentlyStudying" && checked) {
      updatedEducation[index].toYear = "";
    }

    setFormData((prev) => ({
      ...prev,
      education: updatedEducation,
    }));
  };

  return (
    <section className="resume-section-card">

      <div className="resume-section-header">
        <div>
          <h2>
            <FaGraduationCap />
            Education
          </h2>

          <p>Add all your academic qualifications.</p>
        </div>

        <button
          type="button"
          className="resume-add-btn"
          onClick={addEducation}
        >
          <FaPlus />
          Add Education
        </button>
      </div>

      {formData.education.length === 0 && (
        <div className="resume-empty-card">
          No education added yet.
        </div>
      )}

      {formData.education.map((edu, index) => (
        <div
          key={index}
          className="resume-dynamic-card"
        >
          <div className="resume-card-top">

            <h3>
              Education #{index + 1}
            </h3>

            <button
              type="button"
              className="resume-delete-btn"
              onClick={() => removeEducation(index)}
            >
              <FaTrash />
            </button>

          </div>

          <div className="resume-grid">

            <div className="resume-form-group">
              <label>College</label>

              <input
                type="text"
                name="college"
                value={edu.college}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>Degree</label>

              <input
                type="text"
                name="degree"
                value={edu.degree}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>Field</label>

              <input
                type="text"
                name="field"
                value={edu.field}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>Grade / CGPA</label>

              <input
                type="text"
                name="grade"
                value={edu.grade}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>From Year</label>

              <input
                type="number"
                name="fromYear"
                value={edu.fromYear}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            {!edu.currentlyStudying && (
              <div className="resume-form-group">
                <label>To Year</label>

                <input
                  type="number"
                  name="toYear"
                  value={edu.toYear}
                  onChange={(e) => changeHandler(index, e)}
                />
              </div>
            )}

          </div>

          <div className="resume-checkbox">

            <input
              type="checkbox"
              name="currentlyStudying"
              checked={edu.currentlyStudying}
              onChange={(e) => changeHandler(index, e)}
            />

            <label>
              Currently Studying Here
            </label>

          </div>

          <div className="resume-form-group">

            <label>Description</label>

            <textarea
              rows={4}
              name="description"
              value={edu.description}
              onChange={(e) => changeHandler(index, e)}
            />

          </div>

        </div>
      ))}
    </section>
  );
};

export default Education;