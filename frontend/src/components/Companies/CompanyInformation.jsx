/*
|--------------------------------------------------------------------------
| CompanyInformation Component
|--------------------------------------------------------------------------
|
| Purpose:
| Collects additional company details.
|
| Fields:
| ✔ Company Description
| ✔ Company Type
| ✔ Company Size
| ✔ Total Employees
| ✔ Headquarters
| ✔ Hiring Locations
|
| Props:
| formData
| changeHandler
|
|--------------------------------------------------------------------------
*/
import "../../cssStyle/companies/CompanyInformation.css"
const CompanyInformation = ({
  formData,
  changeHandler,
}) => {
  return (
   <div className="company-information-section">

    <h2 className="company-information-title">
        Company Information
    </h2>

    <p className="company-information-subtitle">
        Tell candidates more about your organization.
    </p>

    <div className="company-information-grid">

        {/* Description */}

        <div className="company-input-group full-width">

            <label>Company Description</label>

            <textarea
                rows="6"
                name="description"
                placeholder="Write a brief introduction about your company..."
                value={formData.description}
                onChange={changeHandler}
            />

        </div>

        {/* Company Type */}

        <div className="company-input-group">

            <label>Company Type</label>

            <input
                type="text"
                name="companyType"
                placeholder="Private Limited"
                value={formData.companyType}
                onChange={changeHandler}
            />

        </div>

        {/* Company Size */}

        <div className="company-input-group">

            <label>Company Size</label>

            <input
                type="text"
                name="companySize"
                placeholder="51 - 200 Employees"
                value={formData.companySize}
                onChange={changeHandler}
            />

        </div>

        {/* Total Employees */}

        <div className="company-input-group">

            <label>Total Employees</label>

            <input
                type="number"
                name="totalEmployees"
                placeholder="150"
                value={formData.totalEmployees}
                onChange={changeHandler}
            />

        </div>

        {/* Headquarters */}

        <div className="company-input-group">

            <label>Headquarters</label>

            <input
                type="text"
                name="headquarters"
                placeholder="Hyderabad, India"
                value={formData.headquarters}
                onChange={changeHandler}
            />

        </div>

        {/* Locations */}

        <div className="company-input-group full-width">

            <label>Company Locations</label>

            <input
                type="text"
                name="location"
                placeholder="Hyderabad, Bangalore, Chennai"
                value={formData.location}
                onChange={changeHandler}
            />

            <small>
                Separate multiple locations using commas.
            </small>

        </div>

    </div>

</div>
  );
};

export default CompanyInformation;