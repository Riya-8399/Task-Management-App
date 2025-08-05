import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  if (!email) {
    return <p>Email not found. Please go back and enter your email again.</p>;
  }

  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      // Auto-focus to next input
      if (value && index < 3) {
        document.getElementById(`code-${index + 1}`).focus();
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
      const res = await axios.post('http://localhost:5000/api/verify-reset-code', {
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
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Enter the 4-digit code sent to your email</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            style={{
              width: '50px',
              height: '50px',
              textAlign: 'center',
              fontSize: '24px',
            }}
          />
        ))}
      </form>
      <button onClick={handleSubmit} style={{ marginTop: '20px', padding: '10px 20px' }}>
        Verify Code
      </button>
    </div>
  );
};

export default VerifyCode;
