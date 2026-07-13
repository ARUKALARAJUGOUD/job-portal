// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import API from "../services/api";
// import "../cssStyle/ForgotPassword.css";

// const ForgotPassword = () => {

//     const navigate = useNavigate();

//     const [email,setEmail] = useState("");

//     const [loading,setLoading] = useState(false);

//     const submitHandler = async(e)=>{

//         e.preventDefault();

//         if(!email){
//             return alert("Enter email");
//         }

//         try{

//             setLoading(true);

//             const res = await API.post("/user/resend-otp",{
//                 email
//             });

//             alert(res.data.message);

//             navigate("/reset-password",{
//                 state:{email}
//             });

//         }catch(error){

//             alert(error.response?.data?.message);

//         }finally{

//             setLoading(false);

//         }

//     }

//     return(

//         <div className="forgot-page">

//             <form
//             className="forgot-card"
//             onSubmit={submitHandler}
//             >

//                 <h1>Forgot Password</h1>

//                 <p>
//                     Enter your registered email.
//                 </p>

//                 <input

//                 type="email"

//                 placeholder="Email"

//                 value={email}

//                 onChange={(e)=>setEmail(e.target.value)}

//                 />

//                 <button disabled={loading}>

//                     {loading?"Sending...":"Send OTP"}

//                 </button>

//                 <Link to="/login">

//                     Back to Login

//                 </Link>

//             </form>

//         </div>

//     )

// }

// export default ForgotPassword;




import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";
import "../cssStyle/ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return alert("Please enter your email.");
    }

    try {
      setLoading(true);

      const res = await API.post("/user/resend-otp", {
        email,
      });

      alert(res.data.message);

      navigate("/reset-password", {
        state: { email },
      });
    } catch (error) {
      alert(error.response?.data?.message || "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <form
        className="forgot-password-card"
        onSubmit={submitHandler}
      >
        <h1>Forgot Password</h1>

        <p>
          Enter your registered email address. We'll send a One-Time Password
          (OTP) to reset your password.
        </p>

        <div className="forgot-form-group">
          <label>Email Address</label>

          <input
            className="forgot-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="forgot-submit-btn"
          disabled={loading}
        >
          {loading ? "Sending OTP..." : "Send OTP"}
        </button>

        <Link
          to="/login"
          className="forgot-login-link"
        >
          ← Back to Login
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;