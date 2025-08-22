import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
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

        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.user) {
          setUser({
            name: res.data.user.name,
            email: res.data.user.email,
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

  if (!user)
    return <p className="text-center mt-10 text-gray-200">{message || "Loading..."}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-12">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Your Profile</h2>

        {message && <p className="mb-4 text-center text-sm text-red-600">{message}</p>}

        <form className="space-y-4">
          <div>
            <p className="text-gray-600 font-medium">Name</p>
            <input
              type="text"
              value={user.name}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-not-allowed"
            />
          </div>

          <div>
            <p className="text-gray-600 font-medium">Email</p>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-not-allowed"
            />
          </div>

          <div>
            <p className="text-gray-600 font-medium">Phone</p>
            <input
              type="text"
              value={user.phone}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-not-allowed"
            />
          </div>

          <div>
            <p className="text-gray-600 font-medium">Address</p>
            <input
              type="text"
              value={user.address}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-not-allowed"
            />
          </div>

          <div>
            <p className="text-gray-600 font-medium">City</p>
            <input
              type="text"
              value={user.city}
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-not-allowed"
            />
          </div>

          <button
            type="button"
            onClick={() => navigate("/update-profile")}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200 mt-4"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;


