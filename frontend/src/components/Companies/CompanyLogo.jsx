import { FaCamera } from "react-icons/fa";
import "../../cssStyle/companies/CompanyLogo.css"
const CompanyLogo = ({
  logoPreview,
  logoHandler,
}) => {
  return (
   <div className="company-logo-section">

    <h2 className="company-logo-title">
        Company Logo
    </h2>

    <p className="company-logo-subtitle">
        Upload your company's official logo.
    </p>

    <img
        src={logoPreview}
        className="company-logo-preview"
        alt="Company Logo"
    />

    <label className="logo-upload-btn">

        <FaCamera />

        Upload Logo

        <input
            type="file"
            hidden
            onChange={logoHandler}
        />

    </label>

    <p className="company-logo-note">
        PNG, JPG or JPEG (Maximum 2MB)
    </p>

</div>
  );
};

export default CompanyLogo;