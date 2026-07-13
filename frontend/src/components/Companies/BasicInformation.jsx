/*
|--------------------------------------------------------------------------
| BasicInformation Component
|--------------------------------------------------------------------------
|
| Purpose:
| Collects the basic information required to register a company.
|
| Fields:
| ✔ Company Name
| ✔ Company Email
| ✔ Website
| ✔ Industry
| ✔ Founded Year
|
| Props:
| formData      -> Current form values
| changeHandler -> Handles input changes
|
|--------------------------------------------------------------------------
*/
import "../../cssStyle/companies/BasicInformation.css"
const BasicInformation = ({
  formData,
  changeHandler,
}) => {
  return (
   <div className="basic-information-section">

    <h2 className="basic-information-title">
        Basic Information
    </h2>

    <p className="basic-information-subtitle">
        Enter the essential details of your company.
    </p>

    <div className="basic-information-grid">

        <div className="basic-input-group">
            <label>Company Name</label>

            <input
                type="text"
                name="companyName"
                placeholder="Microsoft"
                value={formData.companyName}
                onChange={changeHandler}
            />
        </div>

        <div className="basic-input-group">
            <label>Company Email</label>

            <input
                type="email"
                name="companyEmail"
                placeholder="contact@company.com"
                value={formData.companyEmail}
                onChange={changeHandler}
            />
        </div>

        <div className="basic-input-group full-width">
            <label>Website</label>

            <input
                type="url"
                name="website"
                placeholder="https://www.company.com"
                value={formData.website}
                onChange={changeHandler}
            />
        </div>

        <div className="basic-input-group">
            <label>Industry</label>

            <input
                type="text"
                name="industry"
                placeholder="Information Technology"
                value={formData.industry}
                onChange={changeHandler}
            />
        </div>

        <div className="basic-input-group">
            <label>Founded Year</label>

            <input
                type="number"
                name="foundedYear"
                placeholder="2005"
                value={formData.foundedYear}
                onChange={changeHandler}
            />
        </div>

    </div>

</div>
  );
};

export default BasicInformation;