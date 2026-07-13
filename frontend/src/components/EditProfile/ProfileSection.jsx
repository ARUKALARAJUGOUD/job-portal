import { FaCamera } from "react-icons/fa";

const ProfileSection = ({ profilePreview, profileImageHandler }) => {
  return (
    <div className="edit-profile-section">
      <h2 className="edit-profile-title">Profile Picture</h2>

      <div className="edit-profile-image-container">
        <div className="edit-profile-image-wrapper">
          <img
            src={
              profilePreview ||
              "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt="Profile"
            className="edit-profile-image"
          />

          <span className="edit-profile-online-dot"></span>
        </div>

        <label className="edit-upload-image-btn">
          <FaCamera />
          Change Photo
          <input
            type="file"
            hidden
            accept=".jpg,.jpeg,.png"
            onChange={profileImageHandler}
          />
        </label>
      </div>

      <p className="edit-profile-help-text">JPG, JPEG or PNG (Maximum 2MB)</p>
    </div>
  );
};

export default ProfileSection;
