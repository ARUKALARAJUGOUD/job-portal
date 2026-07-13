// export default EditProfile;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

import { useAuth } from "../Contexts/AuthContext";

import ActionButtons from "../components/EditProfile/ActionButtons";
import PersonalInformation from "../components/EditProfile/PersonalInformation";
import ProfessionalInformation from "../components/EditProfile/ProfessionalInformation";
import ProfileSection from "../components/EditProfile/ProfileSection";
import ResumeSection from "../components/EditProfile/ResumeSection";
import SkillsSection from "../components/EditProfile/SkillsSection";
import "../cssStyle/EditProfile.css";

const EditProfile = () => {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [allSkills, setAllSkills] = useState([]);
  const [profilePreview, setProfilePreview] = useState(
    user?.profile?.url || "",
  );

  const [profileImage, setProfileImage] = useState(null);

  const [resumePreview, setResumePreview] = useState(
    user?.resumeUrl?.url ? user.resumeUrl.url.split("/").pop() : "",
  );

  const [resume, setResume] = useState(null);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",

    email: user?.email || "",

    phoneNumber: user?.phoneNumber || "",

    headline: user?.headline || "",

    about: user?.about || "",

    location: user?.location || "",

    experienceYears: user?.experienceYears || "",

    companyName: user?.companyName || "",

    currentPosition: user?.currentPosition || "",

    expectedSalary: user?.expectedSalary || "",

    skills: user?.skills
      ? user.skills.map((skill) =>
          typeof skill === "object" ? skill._id : skill,
        )
      : [],
  });

  // Fetch all available skills from database
  const fetchSkills = async () => {
    try {
      const response = await API.get("/skills/get-all-skills");

      setAllSkills(response.data.skills || []);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Unable to fetch skills.");
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  // Handles every text input
  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Profile image upload
  const profileImageHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setProfileImage(file);

    setProfilePreview(URL.createObjectURL(file));
  };

  // Resume upload
  const resumeHandler = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setResume(file);

    setResumePreview(file.name);
  };

  const toggleSkill = (skillId) => {
    setFormData((prev) => {
      const exists = prev.skills.includes(skillId);

      if (exists) {
        return {
          ...prev,
          skills: prev.skills.filter((id) => id !== skillId),
        };
      }

      return {
        ...prev,
        skills: [...prev.skills, skillId],
      };
    });
  };

  console.log(profileImage);
  console.log(resume);
  // Update Profile
  const submitHandler = async (e) => {
    e.preventDefault();

    // -----------------------------
    // Validation
    // -----------------------------

    if (!formData.fullName.trim()) {
      return alert("Full Name is required.");
    }

    if (!formData.phoneNumber) {
      return alert("Phone Number is required.");
    }

    if (formData.phoneNumber.toString().length !== 10) {
      return alert("Phone Number should contain 10 digits.");
    }

    if (formData.expectedSalary && Number(formData.expectedSalary) < 0) {
      return alert("Salary cannot be negative.");
    }

    if (formData.experienceYears && Number(formData.experienceYears) < 0) {
      return alert("Experience cannot be negative.");
    }

    try {
      setLoading(true);

      //--------------------------------
      // Create FormData
      //--------------------------------

      const data = new FormData();

      data.append("fullName", formData.fullName);

      data.append("phoneNumber", formData.phoneNumber);

      data.append("headline", formData.headline);

      data.append("about", formData.about);

      data.append("location", formData.location);

      data.append("experienceYears", formData.experienceYears);

      data.append("companyName", formData.companyName);

      data.append("currentPosition", formData.currentPosition);

      data.append("expectedSalary", formData.expectedSalary);

      //--------------------------------
      // Skills
      //--------------------------------

      formData.skills.forEach((skill) => {
        data.append("skills", skill);
      });

      //--------------------------------
      // Profile Image
      //--------------------------------

      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      //--------------------------------
      // Resume
      //--------------------------------

      if (resume) {
        data.append("resume", resume);
      }

      //--------------------------------
      // API
      //--------------------------------

      const response = await API.put("/user/profile/update", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //--------------------------------
      // Update Auth Context
      //--------------------------------

      setUser(response.data.userInfo);

      alert(response.data.message);

      navigate("/profile");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // return <div>Edit Profile</div>;
  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        {/* Page Header */}

        <div className="edit-profile-header">
          <h1>Edit Profile</h1>

          <p>
            Keep your profile updated to improve your visibility to recruiters.
          </p>
        </div>

        {/* Form */}

        <form className="edit-profile-form" onSubmit={submitHandler}>
          {/* Profile Image */}

          <ProfileSection
            profilePreview={profilePreview}
            profileImageHandler={profileImageHandler}
          />

          {/* Personal Information */}

          <PersonalInformation
            formData={formData}
            changeHandler={changeHandler}
          />

          {/* Professional Information */}

          <ProfessionalInformation
            formData={formData}
            changeHandler={changeHandler}
          />

          {/* Skills */}

          <SkillsSection
            allSkills={allSkills}
            formData={formData}
            toggleSkill={toggleSkill}
          />

          {/* Resume */}

          <ResumeSection
            resumePreview={resumePreview}
            resumeHandler={resumeHandler}
          />

          {/* Save & Cancel Buttons */}

          <ActionButtons loading={loading} navigate={navigate} />
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
