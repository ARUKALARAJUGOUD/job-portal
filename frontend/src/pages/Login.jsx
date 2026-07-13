import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../cssStyle/Login.css";
import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    // Password Validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    }

    // Role Validation
    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      const res = await API.post("/user/login", formData);

      alert(res.data.message);

      navigate("/verify-login-otp", {
        state: {
          email: formData.email,
        },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <form
        className="login-page-form"
        onSubmit={submitHandler}
      >
        <h2 className="login-page-title">
          Welcome Back
        </h2>

        <p className="login-page-subtitle">
          Login to your Job Portal account
        </p>

        {/* Email */}

        <div className="login-page-input-group">
          <label className="login-page-label">
            Email
          </label>

          <input
            className="login-page-input"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={changeHandler}
          />

          {errors.email && (
            <small className="login-page-error">
              {errors.email}
            </small>
          )}
        </div>

        {/* Password */}

        <div className="login-page-input-group">
          <label className="login-page-label">
            Password
          </label>

          <input
            className="login-page-input"
            type="password"
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={changeHandler}
          />

          {errors.password && (
            <small className="login-page-error">
              {errors.password}
            </small>
          )}
        </div>

        {/* Role */}

        <div className="login-page-input-group">
          <label className="login-page-label">
            Role
          </label>

          <select
            className="login-page-select"
            name="role"
            value={formData.role}
            onChange={changeHandler}
          >
            <option value="">Select Role</option>

            <option value="student">
              Job Seeker
            </option>

            <option value="recruiter">
              Recruiter
            </option>
          </select>

          {errors.role && (
            <small className="login-page-error">
              {errors.role}
            </small>
          )}
        </div>

        {/* Button */}

        <button
          className="login-page-button"
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Login"}
        </button>

        {/* Bottom */}

        <p className="login-page-bottom-text">
          Don't have an account?

          <Link
            to="/register"
            className="login-page-register-link"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;