
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api"; // your axios instance

const Logout = () => {
  const navigate = useNavigate();
  const [hoverYes, setHoverYes] = useState(false);
  const [hoverCancel, setHoverCancel] = useState(false);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      await api.post(
        "/logout",
        { refreshToken },
        { withCredentials: true }
      );

      // Clear localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      navigate("/login");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2>Are you sure you want to log out?</h2>
      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={handleLogout}
          onMouseEnter={() => setHoverYes(true)}
          onMouseLeave={() => setHoverYes(false)}
          style={{
            padding: "10px 20px",
            backgroundColor: hoverYes ? "#c0392b" : "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
        >
          Yes, Logout
        </button>
        <button
          onClick={() => navigate(-1)}
          onMouseEnter={() => setHoverCancel(true)}
          onMouseLeave={() => setHoverCancel(false)}
          style={{
            padding: "10px 20px",
            backgroundColor: hoverCancel ? "#95a5a6" : "#bdc3c7",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Logout;
