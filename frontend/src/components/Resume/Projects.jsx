import { FaLaptopCode, FaPlus, FaTrash } from "react-icons/fa";
import "../../cssStyle/Resume/Projects.css";

const Projects = ({ formData, setFormData }) => {
  const addProject = () => {
    setFormData((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          title: "",
          description: "",
          technologies: [],
          githubLink: "",
          liveLink: "",
          featured: false,
        },
      ],
    }));
  };

  const removeProject = (index) => {
    setFormData((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));
  };

  const changeHandler = (index, e) => {
    const { name, value, checked, type } = e.target;

    const updated = [...formData.projects];

    if (name === "technologies") {
      updated[index].technologies = value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    } else {
      updated[index][name] =
        type === "checkbox" ? checked : value;
    }

    setFormData((prev) => ({
      ...prev,
      projects: updated,
    }));
  };

  return (
    <section className="resume-section-card">

      <div className="resume-section-header">

        <div>
          <h2>
            <FaLaptopCode />
            Projects
          </h2>

          <p>Add your best software projects.</p>
        </div>

        <button
          type="button"
          className="resume-add-btn"
          onClick={addProject}
        >
          <FaPlus />
          Add Project
        </button>

      </div>

      {formData.projects.length === 0 && (
        <div className="resume-empty-card">
          No projects added.
        </div>
      )}

      {formData.projects.map((project, index) => (
        <div
          className="resume-dynamic-card"
          key={index}
        >
          <div className="resume-card-top">

            <h3>Project #{index + 1}</h3>

            <button
              type="button"
              className="resume-delete-btn"
              onClick={() => removeProject(index)}
            >
              <FaTrash />
            </button>

          </div>

          <div className="resume-grid">

            <div className="resume-form-group">
              <label>Project Title</label>

              <input
                type="text"
                name="title"
                value={project.title}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>GitHub Link</label>

              <input
                type="url"
                name="githubLink"
                value={project.githubLink}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>Live Demo Link</label>

              <input
                type="url"
                name="liveLink"
                value={project.liveLink}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

          </div>

          <div className="resume-form-group">

            <label>Description</label>

            <textarea
              rows={5}
              name="description"
              value={project.description}
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
              value={project.technologies.join(", ")}
              onChange={(e) => changeHandler(index, e)}
              placeholder="React, Express, MongoDB"
            />

          </div>

          <div className="resume-checkbox">

            <input
              type="checkbox"
              name="featured"
              checked={project.featured}
              onChange={(e) => changeHandler(index, e)}
            />

            <label>Featured Project</label>

          </div>

        </div>
      ))}
    </section>
  );
};

export default Projects;