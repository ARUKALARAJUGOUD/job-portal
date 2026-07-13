// const ResetPassword = () => {
//   return <div>here we reset the password</div>;
// };

// export default ResetPassword;
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../cssStyle/ResetPassword.css";
import API from "../services/api";

const ResetPassword = () => {
  // Used to navigate after successful password reset
  const navigate = useNavigate();

  // Receive email from ForgotPassword page
  // If user directly opens this page, email will be empty
  const location = useLocation();

  // ----------------------------
  // Form States
  // ----------------------------

  // Email (prefilled from previous page)
  const [email, setEmail] = useState(location.state?.email || "");

  // OTP entered by user
  const [otp, setOtp] = useState("");

  // New Password
  const [newPassword, setNewPassword] = useState("");

  // Confirm Password
  const [confirmPassword, setConfirmPassword] = useState("");

  // Loading state while API is running
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // Reset Password
  // ----------------------------

  const submitHandler = async (e) => {
    e.preventDefault();

    // ----------------------------
    // Validation
    // ----------------------------

    if (!email.trim()) {
      return alert("Please enter your email.");
    }

    if (!otp.trim()) {
      return alert("Please enter OTP.");
    }

    if (!newPassword) {
      return alert("Please enter new password.");
    }

    if (newPassword.length < 8) {
      return alert("Password should contain at least 8 characters.");
    }

    if (!confirmPassword) {
      return alert("Please confirm your password.");
    }

    if (newPassword !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      setLoading(true);

      // Calling backend API

      const response = await API.put("/user/password-reset", {
        email,
        otp: Number(otp),
        newPassword,
      });

      alert(response.data.message);

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Unable to reset password.");
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------
  // Resend OTP
  // ----------------------------

  const resendOtp = async () => {
    if (!email.trim()) {
      return alert("Please enter your email.");
    }

    try {
      const response = await API.post("/user/resend-otp", {
        email,
      });

      alert(response.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Unable to resend OTP.");
    }
  };

  // ----------------------------
  // JSX
  // ----------------------------

  return (
    <div className="reset-password-page">
      <form className="reset-password-card" onSubmit={submitHandler}>
        <h1>Reset Password</h1>

        <p>
          Enter the OTP sent to your registered email and create a new password.
        </p>

        {/* Email */}

        <div className="reset-form-group">
          <label>Email</label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* OTP */}

        <div className="reset-form-group">
          <label>OTP</label>

          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        {/* New Password */}

        <div className="reset-form-group">
          <label>New Password</label>

          <input
            type="password"
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}

        <div className="reset-form-group">
          <label>Confirm Password</label>

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Buttons */}

        <button type="submit" className="reset-submit-btn" disabled={loading}>
          {loading ? "Updating..." : "Reset Password"}
        </button>

        {/* Resend OTP */}

        <button type="button" className="reset-resend-btn" onClick={resendOtp}>
          Resend OTP
        </button>

        <Link to="/login" className="reset-login-link">
          ← Back to Login
        </Link>
      </form>
    </div>
  );
};

export default ResetPassword;
