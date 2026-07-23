import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { useAuth } from "./Contexts/AuthContext";
import AuthLayout from "./Layouts/AuthLayout";
import MainLayout from "./Layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import AppliedJobs from "./pages/AppliedJobs";
import Companies from "./pages/Companies";
import CompanyInfo from "./pages/CompanyInfo";
// import ContactPage from "./pages/ContactPage";
import { socket } from "../socketServices/socket";
import ChatPage from "./pages/ChatPage";
import CreateCompany from "./pages/CreateCompany";
import CreateJob from "./pages/CreateJob";
import EditCompany from "./pages/EditCompany";
import EditProfile from "./pages/EditProfile";
import EditResume from "./pages/EditResume";
import ForgotPassword from "./pages/ForgotPassword";
import GetCompanies from "./pages/GetCompanies";
import Home from "./pages/Home";
import JobApplications from "./pages/JobApplications";
import JobEdit from "./pages/JobEdit";
import JobInfo from "./pages/JobInfo";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RecentChats from "./pages/RecentChats";
import RecruiterJobs from "./pages/RecruiterJobs";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import Resume from "./pages/Resume";
import SavedJobs from "./pages/SavedJobs";
import SearchJobs from "./pages/SearchJobs";
import VerifyOtp from "./pages/VerifyOtp";
import ProtectedRoute from "./ProtectedRoutes/ProtectedRoute";
import RoleProtectedRoute from "./ProtectedRoutes/RoleProtectedRoute";
import API from "./services/api";
import StudentDashboard from "./pages/StudentDashboard";
import RecruiterDashboard from "./pages/RecruiterDashboard";

function App() {
  const { setUser, setIsAuthenticated, setLoading, loading, user } = useAuth();
console.log("App User:", user);
  socket.on("connect", () => {
    console.log("Connected");
    console.log(socket.id);
  });
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await API.get("/user/me");
        setUser(res.data.user);
        setIsAuthenticated(true);
      } catch {
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  if (loading) {
    return null;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* this lay out is used for the normal interface it have the header and footer  */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="get-companies" element={<GetCompanies />} />
            {/* <Route path="/companies" element={<Companies />} /> */}
            <Route path="/about" element={<AboutPage />} />
            <Route
              path="/student-dashboard"
              element={
                <ProtectedRoute>
                  <StudentDashboard user={user} />
                </ProtectedRoute>
              }
            />


             <Route
              path="/recruiter-dashboard"
              element={
                <ProtectedRoute>
                  <RecruiterDashboard user={user} />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* this layout is used for authentication no header and footer  */}
          <Route element={<AuthLayout />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-login-otp" element={<VerifyOtp />} />
            <Route path="/search" element={<SearchJobs />} />
            {/* <Route path="/contact" element={<ContactPage />} /> */}

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile user={user} />
                </ProtectedRoute>
              }
            />
            
           
            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/recent-chats"
              element={
                <ProtectedRoute>
                  <RecentChats user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/resume"
              element={
                <ProtectedRoute>
                  <Resume user={user} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/applied-jobs"
              element={
                <ProtectedRoute>
                  <AppliedJobs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create-job"
              element={
                <RoleProtectedRoute role="recruiter">
                  <CreateJob />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/my-jobs"
              element={
                <RoleProtectedRoute role="recruiter">
                  <RecruiterJobs />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <ProtectedRoute>
                  <JobInfo />
                </ProtectedRoute>
              }
            />
            <Route
              path="/build-resume"
              element={
                <ProtectedRoute>
                  <EditResume />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-job/:id"
              element={
                <RoleProtectedRoute role="recruiter">
                  <JobEdit />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/application/get/:id"
              element={
                <RoleProtectedRoute role="recruiter">
                  <ApplicationsPage />
                </RoleProtectedRoute>
              }
            />
            <Route path="/company/:id" element={<CompanyInfo />} />

            <Route
              path="/job-applications"
              element={
                <RoleProtectedRoute role="recruiter">
                  <JobApplications />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/edit-company/:id"
              element={
                <RoleProtectedRoute role="recruiter">
                  <EditCompany />
                </RoleProtectedRoute>
              }
            />

            <Route
              path="/saved-jobs"
              element={
                <ProtectedRoute>
                  <SavedJobs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/companies"
              element={
                <RoleProtectedRoute role="recruiter">
                  <Companies />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/companies/create"
              element={
                <RoleProtectedRoute role="recruiter">
                  <CreateCompany />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reset-password"
              element={
                <ProtectedRoute>
                  <ResetPassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <ProtectedRoute>
                  <EditProfile />
                </ProtectedRoute>
              }
            />
          </Route>
          {/* <Route element={<DashboardLayout />}> */}
          {/* </Route> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
