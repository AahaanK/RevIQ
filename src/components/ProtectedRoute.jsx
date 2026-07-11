import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check if our access token string exists in browser memory sandbox
  const token = localStorage.getItem("token");

  // If no token exists, boot them out immediately to the login panel!
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, clear them for node access and render the component page
  return children;
}