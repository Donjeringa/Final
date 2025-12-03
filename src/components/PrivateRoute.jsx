import { Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}
