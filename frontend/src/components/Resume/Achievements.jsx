import { FaTrophy, FaPlus, FaTrash } from "react-icons/fa";
import "../../cssStyle/Resume/Achievements.css";

const Achievements = ({ formData, setFormData }) => {
  const addAchievement = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: [
        ...prev.achievements,
        {
          title: "",
          description: "",
          date: "",
        },
      ],
    }));
  };

  const removeAchievement = (index) => {
    setFormData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const changeHandler = (index, e) => {
    const { name, value } = e.target;

    const updatedAchievements = [...formData.achievements];
    updatedAchievements[index][name] = value;

    setFormData((prev) => ({
      ...prev,
      achievements: updatedAchievements,
    }));
  };

  return (
    <section className="resume-section-card">
      <div className="resume-section-header">
        <div>
          <h2>
            <FaTrophy />
            Achievements
          </h2>

          <p>
            Showcase awards, hackathons, scholarships, and major accomplishments.
          </p>
        </div>

        <button
          type="button"
          className="resume-add-btn"
          onClick={addAchievement}
        >
          <FaPlus />
          Add Achievement
        </button>
      </div>

      {formData.achievements.length === 0 && (
        <div className="resume-empty-card">
          No achievements added.
        </div>
      )}

      {formData.achievements.map((achievement, index) => (
        <div
          className="resume-dynamic-card"
          key={index}
        >
          <div className="resume-card-top">
            <h3>Achievement #{index + 1}</h3>

            <button
              type="button"
              className="resume-delete-btn"
              onClick={() => removeAchievement(index)}
            >
              <FaTrash />
            </button>
          </div>

          <div className="resume-form-group">
            <label>Achievement Title</label>

            <input
              type="text"
              name="title"
              value={achievement.title}
              onChange={(e) => changeHandler(index, e)}
              placeholder="Winner - Smart India Hackathon"
            />
          </div>

          <div className="resume-form-group">
            <label>Description</label>

            <textarea
              rows={4}
              name="description"
              value={achievement.description}
              onChange={(e) => changeHandler(index, e)}
              placeholder="Describe your achievement..."
            />
          </div>

          <div className="resume-form-group">
            <label>Date</label>

            <input
              type="date"
              name="date"
              value={achievement.date}
              onChange={(e) => changeHandler(index, e)}
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default Achievements;