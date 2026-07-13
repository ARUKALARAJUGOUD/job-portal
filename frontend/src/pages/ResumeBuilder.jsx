// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";

// const ResumeBuilder = () => {
//   const [loading, setLoading] = useState(true);

//   const [resume, setResume] = useState(null);

//   useEffect(() => {
//     const fetchResume = async () => {
//       try {
//         const response = await API.get("/resume/my-resume");

//         setResume(response.data.resume);
//       } catch (error) {
//         alert(error.response?.data?.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResume();
//   }, []);

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (loading) return;

//     if (resume) {
//       navigate("/edit/resume");
//     } else {
//       navigate("/create/resume");
//     }
//   }, [loading, resume, navigate]);

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   // return <pre>{JSON.stringify(resume, null, 2)}</pre>;
// };

// export default ResumeBuilder;
