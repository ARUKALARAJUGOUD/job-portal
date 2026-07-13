/*
|--------------------------------------------------------------------------
| SocialLinks Component
|--------------------------------------------------------------------------
|
| Purpose:
| Allows recruiters to add their company's social media profiles.
|
| Fields:
| ✔ LinkedIn
| ✔ Twitter (X)
| ✔ GitHub
|
| Props:
| formData
| changeHandler
|
|--------------------------------------------------------------------------
*/

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "../../cssStyle/companies/SocialLinks.css";
const SocialLinks = ({ formData, changeHandler }) => {
  return (
    <div className="social-links-section">
      <h2 className="social-links-title">Social Links</h2>

      <p className="social-links-subtitle">
        Help candidates explore your company's online presence.
      </p>

      <div className="social-links-grid">
        {/* LinkedIn */}

        <div className="social-input-group">
          <label>LinkedIn</label>

          <div className="social-input">
            <div className="social-icon">
              <FaLinkedin />
            </div>

            <input
              type="url"
              name="linkedin"
              placeholder="https://linkedin.com/company/..."
              value={formData.linkedin}
              onChange={changeHandler}
            />
          </div>
        </div>

        {/* Twitter */}

        <div className="social-input-group">
          <label>Twitter (X)</label>

          <div className="social-input">
            <div className="social-icon">
              <FaTwitter />
            </div>

            <input
              type="url"
              name="twitter"
              placeholder="https://twitter.com/..."
              value={formData.twitter}
              onChange={changeHandler}
            />
          </div>
        </div>

        {/* GitHub */}

        <div className="social-input-group">
          <label>GitHub</label>

          <div className="social-input">
            <div className="social-icon">
              <FaGithub />
            </div>

            <input
              type="url"
              name="github"
              placeholder="https://github.com/..."
              value={formData.github}
              onChange={changeHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialLinks;
