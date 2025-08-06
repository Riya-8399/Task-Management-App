import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SetNewPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const { email, } = location.state || {};

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setMessage('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await axios.post(`http://localhost:5000/api/set-new-password`, {
        email,
        newPassword,
      });

      setMessage(res.data.message);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Set New Password</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default SetNewPassword;
