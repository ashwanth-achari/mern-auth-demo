import { Navigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
