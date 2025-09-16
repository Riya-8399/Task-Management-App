import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
import api from '../api'; // Axios instance

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { email } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    setSuccess('');

    if (!newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // const res = await axios.post(`http://localhost:5000/api/set-new-password`, {
         const res = await api.post(`/set-new-password`, {
        email,
        newPassword,
      });

      setSuccess(res.data.message);  // success message

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Set New Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Reset Password
          </button>
        </form>

        {error && <p className="mt-4 text-center text-sm text-red-600">{error}</p>}
        {success && <p className="mt-4 text-center text-sm text-green-600">{success}</p>}
      </div>
    </div>
  );
};

export default SetNewPassword;
