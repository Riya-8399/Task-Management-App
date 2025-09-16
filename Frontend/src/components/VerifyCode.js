import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
import api from '../api'; // Axios instance

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  if (!email) {
    return <p className="text-center mt-10 text-red-500">Email not found. Please go back and enter your email again.</p>;
  }

  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const codeValue = code.join('');
    if (codeValue.length !== 4) {
      setError('Please enter the 4-digit code');
      return;
    }

    try {
      // const res = await axios.post('http://localhost:5000/api/verify-reset-code', {
      const res = await api.post('/verify-reset-code', {
        email,
        code: codeValue,
      });
      if (res.status === 200) {
        navigate('/set-new-password', { state: { email, code: codeValue } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Enter the 4-digit code sent to your email
        </h2>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="flex justify-center gap-4 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ))}
        </form>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Verify Code
        </button>
      </div>
    </div>
  );
};

export default VerifyCode;
