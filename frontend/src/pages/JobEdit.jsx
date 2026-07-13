// import { useParams } from "react-router-dom";

// const JobEdit = () => {
//  const {id} = useParams();
//   return (
//     <div>
//       <h1>edit job {id}</h1>
//     </div>
//   );
// };

// export default JobEdit;



import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../cssStyle/CreateJob.css";
import API from "../services/api";

const JobEdit = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [companies, setCompanies] = useState([]);

  const [skills, setSkills] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    responsibilities: "",
    requirements: "",
    skillsRequired: [],
    experienceRequired: "",
    salary: "",
    location: "",
    workMode: "Remote",
    employmentType: "Full-Time",
    openings: 1,
    applicationDeadline: "",
    status: "Active",
  });

  // Fetch recruiter companies
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const res = await API.get("/company/get/recruiter");
        setCompanies(res.data.companies);
      } catch (err) {
        alert(err.response?.data?.message);
      }
    };

    fetchCompanies();
  }, []);

  // Fetch skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get("/skills/get-all-skills");
        setSkills(res?.data?.skills);
      } catch (err) {
        alert(err.response?.data?.message);
      }
    };

    fetchSkills();
  }, []);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/job/get-job/${id}`);

        const job = res.data.jobs;

        setFormData({
          title: job.title,
          company: job.company._id,
          description: job.description,
          responsibilities: job.responsibilities.join(", "),
          requirements: job.requirements.join(", "),
          skillsRequired: job.skillsRequired.map((skill) => skill._id),
          experienceRequired: job.experienceRequired,
          salary: job.salary,
          location: job.location,
          workMode: job.workMode,
          employmentType: job.employmentType,
          openings: job.openings,
          applicationDeadline: job.applicationDeadline.substring(0, 10),
          status: job.status,
        });
      } catch (err) {
        alert(err.response?.data?.message);
      }
    };

    fetchJob();
  }, [id]);

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const skillHandler = (skillId, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        skillsRequired: [...prev.skillsRequired, skillId],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        skillsRequired: prev.skillsRequired.filter((id) => id !== skillId),
      }));
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        ...formData,

        responsibilities: formData.responsibilities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        requirements: formData.requirements
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        experienceRequired: Number(formData.experienceRequired),

        salary: Number(formData.salary),

        openings: Number(formData.openings),
      };

      console.log(payload)
      const res = await API.put(`/job/update/${id}`, payload);

      alert(res.data.message);

      navigate("/my-jobs");
    } catch (err) {
      alert(err.response?.data?.message || "Unable to update job.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-page">
      <form className="create-job-form" onSubmit={submitHandler}>
        <h1>Edit Job</h1>

        <div className="form-grid">
          <div className="form-group">
            <label>Job Title</label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group">
            <label>Company</label>

            <select
              name="company"
              value={formData.company}
              onChange={changeHandler}
            >
              <option value="">Select Company</option>

              {companies.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.companyName}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group full">
            <label>Description</label>

            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group full">
            <label>Responsibilities</label>

            <textarea
              rows={4}
              name="responsibilities"
              value={formData.responsibilities}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group full">
            <label>Requirements</label>

            <textarea
              rows={4}
              name="requirements"
              value={formData.requirements}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group full">
            <label>Required Skills</label>

            <div className="skills-container">
              {skills.map((skill) => (
                <label className="skill-item" key={skill._id}>
                  <input
                    type="checkbox"
                    checked={formData.skillsRequired.includes(skill._id)}
                    onChange={(e) =>
                      skillHandler(skill._id, e.target.checked)
                    }
                  />

                  {skill.name}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Experience</label>

            <input
              type="number"
              name="experienceRequired"
              value={formData.experienceRequired}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group">
            <label>Salary</label>

            <input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group">
            <label>Location</label>

            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group">
            <label>Openings</label>

            <input
              type="number"
              name="openings"
              value={formData.openings}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group">
            <label>Work Mode</label>

            <select
              name="workMode"
              value={formData.workMode}
              onChange={changeHandler}
            >
              <option>Remote</option>
              <option>Hybrid</option>
              <option>Onsite</option>
            </select>
          </div>

          <div className="form-group">
            <label>Employment Type</label>

            <select
              name="employmentType"
              value={formData.employmentType}
              onChange={changeHandler}
            >
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>
          </div>

          <div className="form-group">
            <label>Application Deadline</label>

            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={changeHandler}
            >
              <option>Active</option>
              <option>Draft</option>
              <option>Closed</option>
            </select>
          </div>
        </div>

        <button disabled={loading}>
          {loading ? "Updating Job..." : "Update Job"}
        </button>
      </form>
    </div>
  );
};

export default JobEdit;