import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";
// import "./VerifyOtp.css";
import { useAuth } from "../Contexts/AuthContext";
import "../cssStyle/VerifyOtp.css";
const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState(null);

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const [timer, setTimer] = useState(120);

  const [resendLoading, setResendLoading] = useState(false);


    const { setUser, setIsAuthenticated } = useAuth();
  // used for the timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const minutes = String(Math.floor(timer / 60)).padStart(2, "0");

  const seconds = String(timer % 60).padStart(2, "0");

  // validate form
  const validate = () => {
    let newErrors = {};

    if (!otp.trim()) {
      newErrors.otp = "OTP is required";
    } else if (!/^\d{6}$/.test(otp)) {
      newErrors.otp = "OTP must contain exactly 6 digits";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // submit after the otp entered
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setLoading(true);

      const res = await API.post("/user/login-otp-verify", {
        email,
        otp: Number(otp),
      });

      alert(res.data.message);

      const response = await API.get("/user/me");

      const user = response.data.user;
    

      setUser(user);
      setIsAuthenticated(true);
      if (user.role === "student") {
        navigate("/");
      } else if (user.role === "recruiter") {
        navigate("/");
      }
      // navigate("/");
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setResendLoading(true);

      await API.post("/user/resend-otp", {
        email,
      });

      alert("OTP Sent Successfully");

      setTimer(120);
    } catch (error) {
      alert(error.response?.data?.message);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="verify-page">
      <form className="verify-card" onSubmit={submitHandler}>
        <h2>Verify OTP</h2>

        <p>We have sent a verification code to</p>

        <span>{email}</span>

        <input
          type="Number"
          maxLength="6"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value);
            setErrors({});
          }}
        />

        {errors.otp && <small className="error">{errors.otp}</small>}

        <div className="timer">
          OTP expires in {minutes}:{seconds}
        </div>

        <button>{loading ? "Verifying..." : "Verify OTP"}</button>

        <div className="resend">
          {timer === 0 ? (
            <button type="button" className="resend-btn" onClick={resendOtp}>
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
          ) : (
            <p>Resend available after timer ends</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;
