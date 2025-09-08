import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
const [formData, setFormData] = useState({
  name: "",
  newEmail: "",
  phone: "",
  address: "",
  city: ""
});

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setMessage("Token not found. Please login.");
          return;
        }

        // const res = await axios.get("http://localhost:5000/api/profile", {
           const res = await axios.get("http://35.183.101.228:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.user) {
          setFormData({
  name: res.data.user.name,
  newEmail: res.data.user.email,
  phone: res.data.user.phone || "",
  address: res.data.user.address || "",
  city: res.data.user.city || ""
});

        } else {
          setMessage("User data not found");
        }
      } catch (err) {
        console.error(err);
        setMessage(err.response?.data?.message || "Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.put(
        // "http://localhost:5000/api/update-profile",
        "http://35.183.101.228:5000/api/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessage(res.data.message || "Profile updated successfully");

      // Redirect back to profile page after a short delay
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Update Profile</h2>

        {message && <p className="mb-4 text-center text-sm text-green-600">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">Name
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
            Email
          <input
            type="email"
            name="newEmail"
            placeholder="Email"
            value={formData.newEmail}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div>
  <p className="text-gray-600 font-medium">Phone</p>
  <input
    type="text"
    name="phone"
    value={formData.phone || ""}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>
<div>
  <p className="text-gray-600 font-medium">Address</p>
  <input
    type="text"
    name="address"
    value={formData.address || ""}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>
<div>
  <p className="text-gray-600 font-medium">City</p>
  <input
    type="text"
    name="city"
    value={formData.city || ""}
    onChange={handleChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
</div>


          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
