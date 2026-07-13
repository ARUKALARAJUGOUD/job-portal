import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../cssStyle/CreateJob.css";
import API from "../services/api";

const CreateJob = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    responsibilities: "",
    requirements: "",
    skillsRequired: "",
    experienceRequired: "",
    salary: "",
    location: "",
    workMode: "Remote",
    employmentType: "Full-Time",
    openings: 1,
    applicationDeadline: "",
    status: "Active",
  });

  const [companies, setCompanies] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchedCompanies = async () => {
      try {
        const response = await API.get("/company/get/recruiter");
        setCompanies(response.data.companies);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchedCompanies();
  }, []);
  useEffect(() => {
    const fetchedSkills = async () => {
      try {
        const response = await API.get("/skills/get-all-skills");
        setSkills(response.data.skills);
      } catch (error) {
        alert(error.response.data.message);
      }
    };
    fetchedSkills();
  }, []);

  console.log(companies);
  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.company ||
      !formData.salary ||
      !formData.location ||
      !formData.applicationDeadline
    ) {
      return alert("Please fill all required fields.");
    }

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

        // Already an array of ObjectIds
        skillsRequired: formData.skillsRequired,

        experienceRequired: Number(formData.experienceRequired),
        salary: Number(formData.salary),
        openings: Number(formData.openings),
      };

      console.log("form data send to backend" + formData);
      const res = await API.post("/job/create", payload, {
        withCredentials: true,
      });

      alert(res.data.message);

      navigate("/my-jobs");
    } catch (err) {
      alert(err.response?.data?.message || "Unable to create job");
    } finally {
      setLoading(false);
    }
  };

  // const skillChangeHandler = (e) => {
  //   const values = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value,
  //   );

  //   setFormData((prev) => ({
  //     ...prev,
  //     skillsRequired: values,
  //   }));
  // };

  return (
    <div className="create-job-page">
      <form className="create-job-form" onSubmit={submitHandler}>
        <h1>Create New Job</h1>

        <div className="form-grid">
          <div className="form-group">
            <label>Job Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={changeHandler}
              placeholder="MERN Stack Developer"
            />
          </div>

          <div className="form-group">
            {/* <label>Company ID *</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={changeHandler}
            /> */}

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
              rows="5"
              name="description"
              value={formData.description}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group full">
            <label>Responsibilities</label>

            <textarea
              rows="3"
              name="responsibilities"
              value={formData.responsibilities}
              onChange={changeHandler}
              placeholder="REST APIs, React UI, Testing..."
            />
          </div>

          <div className="form-group full">
            <label>Requirements</label>

            <textarea
              rows="3"
              name="requirements"
              value={formData.requirements}
              onChange={changeHandler}
            />
          </div>

          <div className="form-group full">
            <label>Skills (comma separated)</label>

            {/* <select
              multiple
              name="skillsRequired"
              value={formData.skillsRequired}
              onChange={skillChangeHandler}
            >
              {skills.map((skill) => (
                <option key={skill._id} value={skill._id}>
                  {skill.name}
                </option>
              ))}
            </select> */}

            <div className="skills-container">
              {skills.map((skill) => (
                <label className="skill-item" key={skill._id}>
                  <input
                    type="checkbox"
                    value={skill._id}
                    checked={formData.skillsRequired.includes(skill._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData((prev) => ({
                          ...prev,
                          skillsRequired: [...prev.skillsRequired, skill._id],
                        }));
                      } else {
                        setFormData((prev) => ({
                          ...prev,
                          skillsRequired: prev.skillsRequired.filter(
                            (id) => id !== skill._id,
                          ),
                        }));
                      }
                    }}
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
            <label>Deadline</label>

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
          {loading ? "Creating..." : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
