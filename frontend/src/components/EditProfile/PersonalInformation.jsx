const PersonalInformation = ({
  formData,
  changeHandler,
}) => {
  return (
    <div className="personal-information-section">

      <h2 className="section-title">
        Personal Information
      </h2>

      <div className="personal-grid">

        {/* Full Name */}

        <div className="input-group">

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="fullName"
            placeholder="Enter Full Name"
            value={formData.fullName}
            onChange={changeHandler}
          />

        </div>

        {/* Email */}

        <div className="input-group">

          <label>
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
          />

        </div>

        {/* Phone Number */}

        <div className="input-group">

          <label>
            Phone Number
          </label>

          <input
            type="number"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={changeHandler}
          />

        </div>

        {/* Location */}

        <div className="input-group">

          <label>
            Location
          </label>

          <input
            type="text"
            name="location"
            placeholder="City, State"
            value={formData.location}
            onChange={changeHandler}
          />

        </div>

      </div>

    </div>
  );
};

export default PersonalInformation;