import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../cssStyle/Register.css";

const Register = () => {
  const navigate = useNavigate();

  // -----------------------------
  // Form State
  // -----------------------------

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: "student",
    company: "",
  });

  // -----------------------------
  // Loading State
  // -----------------------------

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Show / Hide Password
  // -----------------------------

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // -----------------------------
  // Handle Input Change
  // -----------------------------

  const changeHandler = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // -----------------------------
  // Submit Form
  // -----------------------------

  const submitHandler = async (e) => {
    e.preventDefault();

    // -----------------------------
    // Validation
    // -----------------------------

    if (!formData.fullName.trim()) {
      return alert("Full Name is required.");
    }

    if (formData.fullName.length < 3) {
      return alert("Full Name should contain at least 3 characters.");
    }

    if (!formData.email.trim()) {
      return alert("Email is required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return alert("Enter a valid email.");
    }

    if (!formData.phoneNumber.trim()) {
      return alert("Phone Number is required.");
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      return alert("Phone Number must contain exactly 10 digits.");
    }

    if (!formData.password) {
      return alert("Password is required.");
    }

    if (formData.password.length < 8) {
      return alert("Password should contain at least 8 characters.");
    }

    if (!formData.confirmPassword) {
      return alert("Confirm your password.");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match.");
    }

    if (
      formData.role === "recruiter" &&
      !formData.company.trim()
    ) {
      return alert("Company Name is required.");
    }

    // -----------------------------
    // Prepare Payload
    // -----------------------------

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === "recruiter") {
      payload.company = formData.company;
    }

    // -----------------------------
    // API Call
    // -----------------------------

    try {
      setLoading(true);

      const response = await API.post(
        "/user/register",
        payload
      );

      alert(response.data.message);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // JSX
  // -----------------------------

  return (
    <div className="register-page">

      <div className="register-container">

        {/* Left Side */}

        <div className="register-left">

          <h1>Join JobSphere</h1>

          <p>

            Create your account and start your journey
            towards better career opportunities.

          </p>

        </div>

        {/* Right Side */}

        <div className="register-right">

          <form
            className="register-form"
            onSubmit={submitHandler}
          >

            <h2>Create Account</h2>

            {/* Full Name */}

            <div className="register-group">

              <label>Full Name</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                value={formData.fullName}
                onChange={changeHandler}
              />

            </div>

            {/* Email */}

            <div className="register-group">

              <label>Email</label>

              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={changeHandler}
              />

            </div>

            {/* Phone */}

            <div className="register-group">

              <label>Phone Number</label>

              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter Phone Number"
                value={formData.phoneNumber}
                onChange={changeHandler}
              />

            </div>

            {/* Password */}

            <div className="register-group">

              <label>Password</label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                value={formData.password}
                onChange={changeHandler}
              />

              <small
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "Hide" : "Show"}
              </small>

            </div>

            {/* Confirm Password */}

            <div className="register-group">

              <label>Confirm Password</label>

              <input
                type={
                  showConfirmPassword
                    ? "text"
                    : "password"
                }
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={changeHandler}
              />

              <small
                className="password-toggle"
                onClick={() =>
                  setShowConfirmPassword(
                    !showConfirmPassword
                  )
                }
              >
                {showConfirmPassword
                  ? "Hide"
                  : "Show"}
              </small>

            </div>

            {/* Role */}

            <div className="register-role">

              <label>

                <input
                  type="radio"
                  name="role"
                  value="student"
                  checked={
                    formData.role === "student"
                  }
                  onChange={changeHandler}
                />

                Job Seeker

              </label>

              <label>

                <input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={
                    formData.role === "recruiter"
                  }
                  onChange={changeHandler}
                />

                Recruiter

              </label>

            </div>

            {/* Company */}

            {formData.role === "recruiter" && (

              <div className="register-group">

                <label>Company Name</label>

                <input
                  type="text"
                  name="company"
                  placeholder="Enter Company Name"
                  value={formData.company}
                  onChange={changeHandler}
                />

              </div>

            )}

            {/* Button */}

            <button
              type="submit"
              className="register-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

            <p className="register-login">

              Already have an account?

              <Link to="/login"> Login</Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Register;