import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../store/auth";

const AdminRoute = ({ children }) => {
  const { isLoggedIn, user, isLoading } = useAuth();

  if (isLoading) {
    return <Loader />;
  }

  // Not logged in → go to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin → go to home
  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
