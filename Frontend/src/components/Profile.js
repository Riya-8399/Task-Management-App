import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    // add more fields if needed
  });
  const [message, setMessage] = useState('');

  // Fetch user profile when component mounts (example)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Assuming you have a token stored
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData({
          fullName: res.data.fullName,
          email: res.data.email,
          // fill other fields if any
        });
      } catch (err) {
        setMessage('Failed to load profile');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put('http://localhost:5000/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage(res.data.message || 'Profile updated successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Update failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Your Profile</h2>

        {message && (
          <p className="mb-4 text-center text-sm text-red-600">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
