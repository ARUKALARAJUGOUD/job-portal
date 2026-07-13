import { useEffect, useState } from "react";
import { FaEdit, FaEye, FaGlobe, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../cssStyle/Companies.css";
import API from "../services/api";

const Companies = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchCompanies = async () => {
    try {
      const res = await API.get("/company/get/recruiter");
      setCompanies(res.data.companies || []);
    } catch (err) {
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const deleteCompany = async (id) => {
    if (!window.confirm("Delete this company?")) return;

    try {
      const res = await API.delete(`/company/delete/${id}`);

      alert(res.data.message);

      setCompanies((prev) => prev.filter((company) => company._id !== id));
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="companies-page">
      <div className="companies-header">
        <div>
          <h1>My Companies</h1>
          <p>Manage your registered companies.</p>
        </div>

        <button
          className="create-company-btn"
          onClick={() => navigate("/companies/create")}
        >
          <FaPlus />
          Create Company
        </button>
      </div>

      {companies.length === 0 ? (
        <div className="empty-state">
          <h2>No Companies Found</h2>

          <button
            className="create-company-btn"
            onClick={() => navigate("/companies/create")}
          >
            <FaPlus />
            Create Company
          </button>
        </div>
      ) : (
        <div className="company-table-wrapper">
          <table className="company-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Industry</th>
                <th>Email</th>
                <th>Website</th>
                <th>Founded</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {companies.map((company) => (
                <tr key={company._id}>
                  <td>
                    <div className="company-cell">
                      <img
                        src={company.logo?.url}
                        alt={company.companyName}
                        className="table-logo"
                      />

                      <div>
                        <h4>{company.companyName}</h4>

                        <span>{company.location?.join(", ") || "-"}</span>
                      </div>
                    </div>
                  </td>

                  <td>{company.industry}</td>

                  <td>{company.companyEmail}</td>

                  <td>
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="website-link"
                    >
                      <FaGlobe /> Visit
                    </a>
                  </td>

                  <td>{company.foundedYear}</td>

                  <td>{new Date(company.createdAt).toLocaleDateString()}</td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="companies-view-btn"
                        onClick={() => navigate(`/company/${company._id}`)}
                      >
                        <FaEye />
                        <span>View</span>
                      </button>

                      <button
                        className="companies-edit-btn"
                        onClick={() => navigate(`/edit-company/${company._id}`)}
                      >
                        <FaEdit />
                        <span>Edit</span>
                      </button>

                      {/* <button
                        className="delete-btn"
                        onClick={() => deleteCompany(company._id)}
                      >
                        <FaTrash />
                        <span>Delete</span>
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Companies;
