import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../api"; // Axios instance with refresh logic

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [redirectTo, setRedirectTo] = useState(null); // can be '/login' or '/'

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await api.get("/profile");

        if (res.data?.user) {
          // User exists → allow access
          setRedirectTo(null);
        } 
        
      } catch (err) {
        localStorage.removeItem("accessToken");

        if (err.response?.data?.message === "User not found") {
          // Deleted user → Home
          setRedirectTo("/");
        } else {
          // Token expired or other auth issue → Login
          setRedirectTo("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (redirectTo) return <Navigate to={redirectTo} replace />;

  return children;
};

export default PrivateRoute;
