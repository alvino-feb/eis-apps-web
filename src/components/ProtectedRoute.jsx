import { Navigate } from "react-router-dom";
// import { useStore } from "../store/useStore";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const { accessToken } = useAuthStore();
  
  if (!accessToken) {
    return <Navigate to="/login" replace/>;
  }

  return children;
}