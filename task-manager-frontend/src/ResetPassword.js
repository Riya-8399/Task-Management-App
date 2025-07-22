import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('Waiting for token...');
  const [token, setToken] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = queryParams.get('token');
    if (!tokenFromUrl) {
      setMessage('Invalid or missing token');
    } else {
      setToken(tokenFromUrl);
      setMessage('');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      setMessage('Please enter a new password');
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/reset-password?token=${token}`,
        { newPassword }
      );
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Reset Password</h2>
      {message && <p>{message}</p>}
      {!message && (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
          />
          <button type="submit" style={{ padding: '10px 20px' }}>
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
