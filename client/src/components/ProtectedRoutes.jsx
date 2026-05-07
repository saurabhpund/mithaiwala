import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role = "CUSTOMER" }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")); 
  // store this during login
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  console.log(role, user.toLowerCase() !== role)

  if (role && user.toLowerCase() !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}