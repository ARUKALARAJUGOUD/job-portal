import { Navigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const RoleProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role != role) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default RoleProtectedRoute;
