// src/components/ChangePassword.js
import React, { useState } from "react";
import api from "../api"; // axios instance
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
         console.log("Sending the data---------------------------------")
      await api.put(
       
        "/settings/change-password", // 🔑 Make sure this matches your backend route
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        { withCredentials: true }
      );

      setMessage("✅ Password changed successfully!");
      setFormData({ currentPassword: "", newPassword: "" });

      // Optional: redirect after a short delay
      setTimeout(() => navigate("/settings"), 2000);
    } catch (error) {
      console.error("Error changing password:", error);
      setMessage(
        error.response?.data?.message || "❌ Failed to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Change Password
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Changing..." : "Change Password"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
  