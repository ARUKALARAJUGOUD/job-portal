import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Achievements from "../components/Resume/Achievements";
import CareerObjective from "../components/Resume/CareerObjective";
import Certifications from "../components/Resume/Certifications";
import Education from "../components/Resume/Education";
import Experience from "../components/Resume/Experience";
import Languages from "../components/Resume/Languages";
import ProfessionalSummary from "../components/Resume/ProfessionalSummary";
import Projects from "../components/Resume/Projects";
import ResumeActionButtons from "../components/Resume/ResumeActionButtons";
import ResumeHeader from "../components/Resume/ResumeHeader";
import ResumeSettings from "../components/Resume/ResumeSetting";
import "../cssStyle/EditResume.css";
import API from "../services/api";
const EditResume = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [resume, setResume] = useState(null);

  const [formData, setFormData] = useState({
    objective: "",

    professionalSummary: "",

    education: [],

    experience: [],

    projects: [],

    certifications: [],

    languages: [],

    achievements: [],

    publications: [],

    volunteerExperience: [],

    references: [],

    socialLinks: {
      github: "",
      linkedin: "",
      portfolio: "",
      leetcode: "",
      hackerrank: "",
      codechef: "",
    },

    resumeVisibility: "Public",

    openToWork: true,
  });

  // Fetch Resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await API.get("/resume/my-resume");

        setResume(response.data.resume);
      } catch (error) {
        alert(error.response?.data?.message || "Unable to fetch resume");
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  // Populate form
  useEffect(() => {
    if (!resume) return;

    setFormData({
      objective: resume.objective || "",

      professionalSummary: resume.professionalSummary || "",

      education: resume.education || [],

      experience: resume.experience || [],

      projects: resume.projects || [],

      certifications: resume.certifications || [],

      languages: resume.languages || [],

      achievements: resume.achievements || [],

      publications: resume.publications || [],

      volunteerExperience: resume.volunteerExperience || [],

      references: resume.references || [],

      socialLinks: {
        github: resume.socialLinks?.github || "",
        linkedin: resume.socialLinks?.linkedin || "",
        portfolio: resume.socialLinks?.portfolio || "",
        leetcode: resume.socialLinks?.leetcode || "",
        hackerrank: resume.socialLinks?.hackerrank || "",
        codechef: resume.socialLinks?.codechef || "",
      },

      resumeVisibility: resume.resumeVisibility || "Public",

      openToWork: resume.openToWork ?? true,
    });
  }, [resume]);

  // Common input handler
  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/resume/add", formData);

      alert(response.data.message);

      navigate("/resume");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Unable to save resume.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2>Loading Resume...</h2>;
  }

  return (
    <div className="edit-resume-page">
      <div className="edit-resume-container">
        <form className="edit-resume-form" onSubmit={submitHandler}>
          <ResumeHeader
            isEdit={true}
            completion={resume?.profileCompletion || 0}
          />
          <CareerObjective formData={formData} changeHandler={changeHandler} />

          <ProfessionalSummary
            formData={formData}
            changeHandler={changeHandler}
          />

          <ResumeSettings formData={formData} changeHandler={changeHandler} />

          <Education formData={formData} setFormData={setFormData} />

          <Experience formData={formData} setFormData={setFormData} />

          <Projects formData={formData} setFormData={setFormData} />

          <Certifications formData={formData} setFormData={setFormData} />

          <Languages formData={formData} setFormData={setFormData} />

          <Achievements formData={formData} setFormData={setFormData} />

          <ResumeActionButtons
            loading={loading}
            navigate={navigate}
            isEdit={!!resume}
          />
        </form>
      </div>
    </div>
  );
};

export default EditResume;
