import { FaCertificate, FaPlus, FaTrash } from "react-icons/fa";
import "../../cssStyle/Resume/Certifications.css";

const Certifications = ({ formData, setFormData }) => {
  const addCertificate = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...prev.certifications,
        {
          title: "",
          issuer: "",
          issueDate: "",
          credentialId: "",
          credentialUrl: "",
        },
      ],
    }));
  };

  const removeCertificate = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const changeHandler = (index, e) => {
    const { name, value } = e.target;

    const updated = [...formData.certifications];
    updated[index][name] = value;

    setFormData((prev) => ({
      ...prev,
      certifications: updated,
    }));
  };

  return (
    <section className="resume-section-card">

      <div className="resume-section-header">

        <div>
          <h2>
            <FaCertificate />
            Certifications
          </h2>

          <p>Add your professional certifications.</p>
        </div>

        <button
          type="button"
          className="resume-add-btn"
          onClick={addCertificate}
        >
          <FaPlus />
          Add Certificate
        </button>

      </div>

      {formData.certifications.length === 0 && (
        <div className="resume-empty-card">
          No certifications added.
        </div>
      )}

      {formData.certifications.map((certificate, index) => (
        <div
          className="resume-dynamic-card"
          key={index}
        >
          <div className="resume-card-top">

            <h3>Certificate #{index + 1}</h3>

            <button
              type="button"
              className="resume-delete-btn"
              onClick={() => removeCertificate(index)}
            >
              <FaTrash />
            </button>

          </div>

          <div className="resume-grid">

            <div className="resume-form-group">
              <label>Certificate Title</label>

              <input
                type="text"
                name="title"
                value={certificate.title}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>Issuer</label>

              <input
                type="text"
                name="issuer"
                value={certificate.issuer}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>Issue Date</label>

              <input
                type="date"
                name="issueDate"
                value={certificate.issueDate}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

            <div className="resume-form-group">
              <label>Credential ID</label>

              <input
                type="text"
                name="credentialId"
                value={certificate.credentialId}
                onChange={(e) => changeHandler(index, e)}
              />
            </div>

          </div>

          <div className="resume-form-group">

            <label>Credential URL</label>

            <input
              type="url"
              name="credentialUrl"
              value={certificate.credentialUrl}
              onChange={(e) => changeHandler(index, e)}
              placeholder="https://..."
            />

          </div>

        </div>
      ))}
    </section>
  );
};

export default Certifications;