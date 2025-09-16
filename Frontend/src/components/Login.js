import React, { useState } from 'react';
// import axios from 'axios';
import api from '../api'; // Axios instance
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const res = await axios.post('http://localhost:5000/api/login', {
          const res = await api.post('/login', {
        email,
        password,
      });

      console.log('Login response:', res.data);
        // Save tokens
    localStorage.setItem("accessToken", res.data.accessToken);
    localStorage.setItem("refreshToken", res.data.refreshToken);
    localStorage.setItem("isReturningUser", "true");
      setMessage(res.data.message);
      navigate('/create-task');
      

    } catch (err) {
      console.error('Login error:', err.response?.data || err.message);
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Login
          </button>

          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot Password?
            </Link>
          </div>
        </form>

        

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message} <Link to="/signup" style={{ color: "Blue", textDecoration: "underline" }}>
            Sign Up
          </Link>
          .
          </p>
        )}
      </div>
    </div>
  );
};

export default Login;
