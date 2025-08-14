
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-red-600 font-semibold">Email not found. Please go back and sign up again.</p>
        </div>
      </div>
    );
  }

  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        const nextInput = document.getElementById(`verify-code-${index + 1}`);
        nextInput && nextInput.focus();
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
      const res = await axios.post('http://localhost:5000/api/verify-email', {
        email,
        code: codeValue,
      });
      setMessage(res.data.message);

      if (res.status === 200) {
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-semibold mb-2 text-gray-800">Please verify your email</h2>
        <p className="mb-6 text-gray-600">
          We’ve sent a 4-digit code to <span className="font-medium">{email}</span>
        </p>

        {error && <p className="text-red-600 mb-4 font-medium">{error}</p>}
        {message && <p className="text-green-600 mb-4 font-medium">{message}</p>}

        <form onSubmit={handleSubmit} className="flex justify-center gap-4 flex-wrap">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`verify-code-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              inputMode="numeric"
            />
          ))}
        </form>

        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-md transition-colors"
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
