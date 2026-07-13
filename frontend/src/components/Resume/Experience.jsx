import { FaBriefcase, FaPlus, FaTrash } from "react-icons/fa";
import "../../cssStyle/Resume/Experience.css";

const Experience = ({ formData, setFormData }) => {
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          company: "",
          position: "",
          employmentType: "",
          location: "",
          workMode: "",
          fromDate: "",
          toDate: "",
          currentlyWorking: false,
          description: "",
          technologies: [],
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  const changeHandler = (index, e) => {
    const { name, value, checked, type } = e.target;

    const updated = [...formData.experience];

    if (name === "technologies") {
      updated[index].technologies = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } else {
      updated[index][name] =
        type === "checkbox" ? checked : value;
    }

    if (name === "currentlyWorking" && checked) {
      updated[index].toDate = "";
    }

    setFormData((prev) => ({
      ...prev,
      experience: updated,
    }));
  };

  return (
    <section className="resume-section-card">

      <div className="resume-section-header">

        <div>
          <h2>
            <FaBriefcase />
            Experience
          </h2>

          <p>Add your professional work experience.</p>
        </div>

        <button
          type="button"
          className="resume-add-btn"
          onClick={addExperience}
        >
          <FaPlus />
          Add Experience
        </button>

      </div>

      {formData.experience.length === 0 && (
        <div className="resume-empty-card">
          No experience added yet.
        </div>
      )}

      {formData.experience.map((exp, index) => (
        <div
          key={index}
          className="resume-dynamic-card"
        >
          <div className="resume-card-top">

            <h3>Experience #{index + 1}</h3>

            <button
              type="button"
              className="resume-delete-btn"
              onClick={() => removeExperience(index)}
            >
              <FaTrash />
            </button>

          </div>

          <div className="resume-grid">

            <div className="resume-form-group">
              <label>Company</label>

              <input
                type="text"
                name="company"
                value={exp.company}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>Position</label>

              <input
                type="text"
                name="position"
                value={exp.position}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>Employment Type</label>

              <select
                name="employmentType"
                value={exp.employmentType}
                onChange={(e) => changeHandler(index, e)}
              >
                <option value="">Select</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
                <option>Freelance</option>
              </select>
            </div>

            <div className="resume-form-group">
              <label>Location</label>

              <input
                type="text"
                name="location"
                value={exp.location}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>Work Mode</label>

              <select
                name="workMode"
                value={exp.workMode}
                onChange={(e) => changeHandler(index, e)}
              >
                <option value="">Select</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On Site</option>
              </select>
            </div>

            <div className="resume-form-group">
              <label>From Date</label>

              <input
                type="date"
                name="fromDate"
                value={exp.fromDate}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            {!exp.currentlyWorking && (
              <div className="resume-form-group">
                <label>To Date</label>

                <input
                  type="date"
                  name="toDate"
                  value={exp.toDate}
                  onChange={(e) => changeHandler(index, e)}
                />
              </div>
            )}

          </div>

          <div className="resume-checkbox">
            <input
              type="checkbox"
              name="currentlyWorking"
              checked={exp.currentlyWorking}
              onChange={(e) => changeHandler(index, e)}
            />

            <label>Currently Working Here</label>
          </div>

          <div className="resume-form-group">
            <label>Description</label>

            <textarea
              rows={5}
              name="description"
              value={exp.description}
              onChange={(e) => changeHandler(index, e)}
            />
          </div>

          <div className="resume-form-group">
            <label>
              Technologies
              <small> (comma separated)</small>
            </label>

            <input
              type="text"
              name="technologies"
              value={exp.technologies.join(", ")}
              onChange={(e) => changeHandler(index, e)}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

        </div>
      ))}
    </section>
  );
};

export default Experience;