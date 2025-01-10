import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requiredRole }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser) {
    return <Navigate to="/login" />;
  }

  if (storedUser.role !== requiredRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
