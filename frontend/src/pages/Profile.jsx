import {
  FaBriefcase,
  FaCheckCircle,
  FaDownload,
  FaEdit,
  FaEnvelope,
  FaFilePdf,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPhone,
  FaUserFriends,
} from "react-icons/fa";
import { Link } from "react-router-dom";

import "../cssStyle/Profile.css";

const Profile = ({ user }) => {
  return (
    <div className="profile-page">
      <div className="profile-card">
        {/* Cover */}

        <div className="cover"></div>

        {/* Profile Header */}

        <div className="profile-top">
          <img
            src={user.profile?.url}
            alt={user.fullName}
            className="profile-image"
          />

          <div className="profile-header">
            <div className="profile-name">
              <h1>{user.fullName}</h1>

              <h3>{user.headline || "Full Stack Developer"}</h3>

              <div className="contact">
                <p>
                  <FaEnvelope />
                  {user.email}
                </p>

                <p>
                  <FaPhone />
                  {user.phoneNumber}
                </p>

                <p>
                  <FaMapMarkerAlt />
                  {user.location || "Location"}
                </p>
              </div>
            </div>

            <div className="right-side">
              {user.isVerified && (
                <div className="verified">
                  <FaCheckCircle />
                  Verified
                </div>
              )}

              <Link className="edit-btn" to="/edit-profile">
                <FaEdit />
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        {/* About */}

        <section className="section">
          <h2 className="section-title">About</h2>

          <p className="about">
            {user.about ||
              "Tell recruiters about yourself, your achievements and your career goals."}
          </p>
        </section>

        {/* Professional */}

        <section className="section">
          <h2 className="section-title">Professional Information</h2>

          <div className="info-grid">
            <div className="info">
              <span>
                <FaBriefcase />
                Experience
              </span>

              <strong>{user.experienceYears || 0} Years</strong>
            </div>

            <div className="info">
              <span>
                <FaBriefcase />
                Position
              </span>

              <strong>{user.currentPosition || "Not Added"}</strong>
            </div>

            <div className="info">
              <span>
                <FaMoneyBillWave />
                Expected Salary
              </span>

              <strong>₹{user.expectedSalary || 0}</strong>
            </div>

            {/* <div className="info">
              <span>Status</span>

              <strong>{user.isVerified ? "Verified" : "Not Verified"}</strong>
            </div> */}
          </div>
        </section>

        {/* Skills */}

        <section className="section">
          <h2 className="section-title">Skills</h2>

          <div className="skills">
            {user.skills?.length > 0 ? (
              user.skills.map((skill) => (
                <span key={skill._id}>{skill.name}</span>
              ))
            ) : (
              <p>No skills added.</p>
            )}
          </div>
        </section>

        {/* Resume */}

        <section className="section">
          <h2 className="section-title">Resume</h2>

          {user.resumeUrl?.url ? (
            <div className="resume">
              <div className="resume-left">
                <FaFilePdf size={45} color="#dc2626" />

                <div>
                  <h4>Resume Uploaded</h4>

                  <p>Latest Resume</p>
                </div>
              </div>

              <div className="resume-buttons">
                <a href={user.resumeUrl.url} target="_blank" rel="noreferrer">
                  {/* <FaEye /> */}
                  View
                </a>

                <a href={user.resumeUrl.url} download>
                  <FaDownload />
                  Download
                </a>
              </div>
            </div>
          ) : (
            <p>No Resume Uploaded</p>
          )}
        </section>

        {/* Network */}

        <section className="section">
          <h2 className="section-title">Network</h2>

          <div className="network">
            <div>
              <FaUserFriends size={30} />

              <h2>{user.followers.length}</h2>

              <p>Followers</p>
            </div>

            <div>
              <FaUserFriends size={30} />

              <h2>{user.following.length}</h2>

              <p>Following</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
