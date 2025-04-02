import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  console.log(
    "ProtectedRoute - isAuthenticated:",
    isAuthenticated,
    "loading:",
    loading
  );

  if (loading) return <div>Loading...</div>;
  console.log(isAuthenticated);
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}

export default ProtectedRoute;
