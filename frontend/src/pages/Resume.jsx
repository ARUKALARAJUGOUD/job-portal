import {
  FaBriefcase,
  FaCertificate,
  FaEnvelope,
  FaExternalLinkAlt,
  FaFilePdf,
  FaGithub,
  FaGlobe,
  FaGraduationCap,
  FaLaptopCode,
  FaLinkedin,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  FaUserCheck,
} from "react-icons/fa";

import { SiCodechef, SiHackerrank, SiLeetcode } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import "../cssStyle/Resume.css";

const Resume = ({ user }) => {
  // const resume = user.resume;

  const resume = user?.resume || {};
  const socialLinks = resume?.socialLinks || {};
  const navigate = useNavigate();
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      month: "short",
      year: "numeric",
    });
  };

  const calculateExperience = () => {
    if (!resume?.experience?.length) return "Fresher";

    let months = 0;

    resume.experience.forEach((exp) => {
      if (!exp.fromDate) return;

      const start = new Date(exp.fromDate);
      const end = exp.currentlyWorking ? new Date() : new Date(exp.toDate);

      months +=
        (end.getFullYear() - start.getFullYear()) * 12 +
        (end.getMonth() - start.getMonth());
    });

    const years = Math.floor(months / 12);
    const remainMonths = months % 12;

    return `${years} Years ${remainMonths} Months`;
  };

  return (
    <div className="resume-view-page">
      <div className="resume-view-card">
        {/* HEADER */}

        <div className="resume-view-header">
          <img
            src={
              user?.profile?.url ||
              "https://ui-avatars.com/api/?name=User&background=2563eb&color=fff"
            }
            className="resume-view-profile-photo"
            alt={user?.fullName || "User"}
          />

          <div className="resume-view-header-info">
            <h1>{user.fullName}</h1>

            <h3>{user.headline}</h3>

            <p>{user.currentPosition}</p>

            <div className="resume-view-contact-grid">
              <span>
                <FaEnvelope /> {user.email}
              </span>

              <span>
                <FaPhone /> {user.phoneNumber}
              </span>

              <span>
                <FaMapMarkerAlt /> {user.location}
              </span>
            </div>
          </div>
        </div>

        {/* SUMMARY */}

        <section className="resume-view-section">
          <h2>Professional Summary</h2>

          {/* <p>{resume?.professionalSummary}</p> */}
          <p>
            {resume?.professionalSummary ||
              "Professional summary has not been added yet."}
          </p>
        </section>

        {/* OBJECTIVE */}

        <section className="resume-view-section">
          <h2>Career Objective</h2>

          {/* <p>{resume?.objective}</p> */}
          <p>
            {resume?.objective || "Career objective has not been added yet."}
          </p>
        </section>

        {/* INFO */}

        <section className="resume-view-section">
          <h2>Professional Information</h2>

          <div className="resume-view-info-grid">
            <div className="resume-view-info-card">
              <FaBriefcase />

              <h4>Experience</h4>

              <p>{calculateExperience()}</p>
            </div>

            <div className="resume-view-info-card">
              <FaMoneyBillWave />

              <h4>Expected Salary</h4>

              <p>₹{user.expectedSalary.toLocaleString()}</p>
            </div>

            <div className="resume-view-info-card">
              <FaUserCheck />

              <h4>Status</h4>

              <p>{resume.openToWork ? "Open To Work" : "Not Looking"}</p>
            </div>

            <div className="resume-view-info-card">
              <FaGlobe />

              <h4>Visibility</h4>

              <p>{resume.resumeVisibility}</p>
            </div>
          </div>
        </section>

        {/* SKILLS */}

        <section className="resume-view-section">
          <h2>Skills</h2>

          <div className="resume-view-skills">
            {user.skills.map((skill, index) => (
              <span key={index}>{skill.name}</span>
            ))}
          </div>
        </section>

        {/* EDUCATION */}

        <section className="resume-view-section">
          <h2>
            <FaGraduationCap /> Education
          </h2>

          {resume?.education?.length ? (
            resume?.education?.map((edu) => (
              <div className="resume-view-item" key={edu._id}>
                <h3>{edu.degree || "Degree"}</h3>

                <h4>{edu.field || "Field"}</h4>

                <p>{edu.college || "College Not Added"}</p>

                <p>{edu.description || "No description."}</p>

                <p>{edu.grade || "N/A"}</p>

                <span>
                  {edu.fromYear || "-"} - {edu.toYear || "Present"}
                </span>
                <p>
                  {edu?.currentlyStudying ? "Currently Studying" : "Completed"}
                </p>
              </div>
            ))
          ) : (
            <p>No education details added.</p>
          )}
        </section>

        {/* EXPERIENCE */}

        <section className="resume-view-section">
          <h2>
            <FaBriefcase /> Experience
          </h2>

          {resume?.experience?.length ? (
            resume.experience.map((exp) => (
              <div className="resume-view-item" key={exp._id}>
                <h3>{exp.position}</h3>

                <h4>{exp.company}</h4>

                <p>
                  {exp.employmentType} • {exp.workMode}
                </p>

                <span>
                  {formatDate(exp.fromDate)} -
                  {exp.currentlyWorking ? " Present" : formatDate(exp.toDate)}
                </span>

                <p>{exp.description}</p>

                <div className="resume-view-technology">
                  {exp.technologies.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>Fresher</p>
          )}
        </section>

        {/* PROJECTS */}

        <section className="resume-view-section">
          <h2>
            <FaLaptopCode /> Projects
          </h2>

          {resume?.projects?.length ? (
            resume.projects.map((project) => (
              <div className="resume-view-item" key={project._id}>
                <h3>{project.title}</h3>

                <p>{project.description}</p>

                <div className="resume-view-technology">
                  {project.technologies.map((tech, i) => (
                    <span key={i}>{tech}</span>
                  ))}
                </div>

                <div className="resume-view-links">
                  <a href={project.githubLink} target="_blank" rel="noreferrer">
                    <FaGithub /> Github
                  </a>

                  <a href={project.liveLink} target="_blank" rel="noreferrer">
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>No projects </p>
          )}
        </section>

        {/* CERTIFICATES */}

        <section className="resume-view-section">
          <h2>
            <FaCertificate /> Certifications
          </h2>

          {resume?.certifications?.length > 0 ? (
            resume.certifications.map((certificate) => (
              <div className="resume-view-item" key={certificate._id}>
                <h3>{certificate.title}</h3>
                <p>{certificate.issuer}</p>
              </div>
            ))
          ) : (
            <div className="resume-view-empty-state">
              <FaCertificate className="resume-view-empty-icon" />
              <h3>No Certifications</h3>
              <p>You haven't added any certifications yet.</p>
            </div>
          )}
        </section>

        {/* Achievements  */}
        <section className="resume-view-section">
          <h2>Achievements</h2>

          {resume?.achievements?.length > 0 ? (
            resume.achievements.map((item) => (
              <div className="resume-view-item" key={item._id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))
          ) : (
            <div className="resume-view-empty-state">
              🏆
              <h3>No Achievements</h3>
              <p>Add achievements to strengthen your resume.</p>
            </div>
          )}
        </section>

        {/* Languages */}

        <section className="resume-view-section">
          <h2>Languages</h2>

          {resume?.languages?.length > 0 ? (
            <div className="resume-view-skills">
              {resume.languages.map((lang) => (
                <span key={lang._id}>
                  {lang.language} • {lang.proficiency}
                </span>
              ))}
            </div>
          ) : (
            <div className="resume-view-empty-state">
              🌍
              <h3>No Languages Added</h3>
              <p>Add languages you can communicate in.</p>
            </div>
          )}
        </section>

        {/*  social links */}
        <div className="resume-view-social-links">
          {socialLinks.github && (
            <a
              href={resume.socialLinks.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub /> Github
            </a>
          )}

          {socialLinks.linkedin && (
            <a
              href={resume.socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin /> LinkedIn
            </a>
          )}

          {socialLinks.portfolio && (
            <a
              href={resume.socialLinks.portfolio}
              target="_blank"
              rel="noreferrer"
            >
              <FaGlobe /> Portfolio
            </a>
          )}

          {socialLinks.leetcode && (
            <a
              href={resume.socialLinks.leetcode}
              target="_blank"
              rel="noreferrer"
            >
              <SiLeetcode /> LeetCode
            </a>
          )}

          {socialLinks.hackerrank && (
            <a
              href={resume.socialLinks.hackerrank}
              target="_blank"
              rel="noreferrer"
            >
              <SiHackerrank /> HackerRank
            </a>
          )}

          {socialLinks.codechef && (
            <a
              href={resume.socialLinks.codechef}
              target="_blank"
              rel="noreferrer"
            >
              <SiCodechef /> CodeChef
            </a>
          )}
        </div>
        {/* DOWNLOAD */}

        {/* Resume Actions */}

        <section className="resume-view-section">
          <h2>
            <FaFilePdf /> Resume File
          </h2>

          <div className="resume-view-actions">
            <a
              href={user.resumeUrl.url}
              target="_blank"
              rel="noreferrer"
              className="resume-view-download-btn"
            >
              <FaFilePdf />
              Download Resume
            </a>

            <button
              type="button"
              className="resume-view-build-btn"
              onClick={() => navigate("/build-resume")}
            >
              Build Resume
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resume;
