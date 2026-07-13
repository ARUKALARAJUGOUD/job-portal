import { FaLanguage, FaPlus, FaTrash } from "react-icons/fa";
import "../../cssStyle/Resume/Languages.css";

const Languages = ({ formData, setFormData }) => {
  const addLanguage = () => {
    setFormData((prev) => ({
      ...prev,
      languages: [
        ...prev.languages,
        {
          language: "",
          proficiency: "Beginner",
        },
      ],
    }));
  };

  const removeLanguage = (index) => {
    setFormData((prev) => ({
      ...prev,
      languages: prev.languages.filter((_, i) => i !== index),
    }));
  };

  const changeHandler = (index, e) => {
    const { name, value } = e.target;

    const updatedLanguages = [...formData.languages];
    updatedLanguages[index][name] = value;

    setFormData((prev) => ({
      ...prev,
      languages: updatedLanguages,
    }));
  };

  return (
    <section className="resume-section-card">
      <div className="resume-section-header">
        <div>
          <h2>
            <FaLanguage />
            Languages
          </h2>

          <p>Add all the languages you know.</p>
        </div>

        <button
          type="button"
          className="resume-add-btn"
          onClick={addLanguage}
        >
          <FaPlus />
          Add Language
        </button>
      </div>

      {formData.languages.length === 0 && (
        <div className="resume-empty-card">
          No languages added.
        </div>
      )}

      {formData.languages.map((language, index) => (
        <div
          className="resume-dynamic-card"
          key={index}
        >
          <div className="resume-card-top">
            <h3>Language #{index + 1}</h3>

            <button
              type="button"
              className="resume-delete-btn"
              onClick={() => removeLanguage(index)}
            >
              <FaTrash />
            </button>
          </div>

          <div className="resume-grid">
            <div className="resume-form-group">
              <label>Language</label>

              <input
                type="text"
                name="language"
                value={language.language}
                onChange={(e) => changeHandler(index, e)}
                placeholder="Example: English"
              />
            </div>

            <div className="resume-form-group">
              <label>Proficiency</label>

              <select
                name="proficiency"
                value={language.proficiency}
                onChange={(e) => changeHandler(index, e)}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Professional">Professional</option>
                <option value="Native">Native</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Languages;