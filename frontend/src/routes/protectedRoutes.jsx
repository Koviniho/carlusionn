/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import
import PATHS from "./path";

const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token); // Decode the token to get the `exp` field
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return exp < currentTime; // Check if token is expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If decoding fails, treat token as expired
  }
};

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const { exp } = jwtDecode(token); // Decode token

        const timeUntilExpiry = (exp - Math.floor(Date.now() / 1000)) * 1000;

        // Set timeout to log out 5 seconds before expiry
        const timeout = setTimeout(() => {
          localStorage.clear();
          window.location.href = PATHS.login;
        }, Math.max(0, timeUntilExpiry - 5000));

        return () => clearTimeout(timeout); // Clear timeout on unmount
      } catch (error) {
        console.log("🚀 ~ useEffect ~ error:", error);
        localStorage.clear();
        window.location.href = PATHS.login;
      }
    }
  }, [token]);

  if (!token || isTokenExpired(token)) {
    localStorage.clear();
    return <Navigate to={PATHS.login} replace />;
  }

  return children;
};

export default ProtectedRoute;
