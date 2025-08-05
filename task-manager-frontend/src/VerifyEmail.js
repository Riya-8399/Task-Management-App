// import React, { useState } from 'react';
// import axios from 'axios';

// const VerifyEmail = () => {
//   const [email, setEmail] = useState('');
//   const [code, setCode] = useState('');
//   const [message, setMessage] = useState('');

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/verify-email', {
//         email,
//         code,
//       });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error verifying email');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Verify Your Email</h2>
//       <form onSubmit={handleVerify}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           className="w-full p-2 mb-3 border rounded"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Enter verification code"
//           value={code}
//           className="w-full p-2 mb-3 border rounded"
//           onChange={(e) => setCode(e.target.value)}
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//           Verify
//         </button>
//       </form>
//       {message && <p className="mt-3 text-center">{message}</p>}
//     </div>
//   );
// };

// export default VerifyEmail;


// import React, { useState } from 'react'; 
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';

// const VerifyEmail = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const initialEmail = location.state?.email || '';
//   const signupMessage = location.state?.signupMessage || '';

//   const [email, setEmail] = useState(initialEmail);
//   const [code, setCode] = useState('');
//   // Use message only for feedback after user submits verification
//   const [message, setMessage] = useState('');

//   const handleVerify = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:5000/api/verify-email', {
//         email,
//         code,
//       });
//       setMessage(res.data.message);

//       if (res.data.message.toLowerCase().includes('success')) {
//         setTimeout(() => {
//           navigate('/login');
//         }, 2000);
//       }
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Error verifying email');
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto mt-10 p-4 border rounded-xl shadow-lg">
//       <h2 className="text-2xl font-semibold mb-4 text-center">Verify Your Email</h2>

//       {/* Show signup success message only if user hasn't submitted verification yet */}
//       {!message && signupMessage && (
//         <p className="mb-4 text-center text-green-600">{signupMessage}</p>
//       )}

//       <form onSubmit={handleVerify}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           className="w-full p-2 mb-3 border rounded"
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Enter verification code"
//           value={code}
//           className="w-full p-2 mb-3 border rounded"
//           onChange={(e) => setCode(e.target.value)}
//           required
//         />
//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
//           Verify
//         </button>
//       </form>

//       {/* Show verification response messages here */}
//       {message && <p className="mt-3 text-center">{message}</p>}
//     </div>
//   );
// };

// export default VerifyEmail;

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const VerifyEmail = () => {
  const [code, setCode] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Get email passed from signup
  const email = location.state?.email;

  if (!email) {
    return <p>Email not found. Please go back and sign up again.</p>;
  }

  const handleChange = (index, value) => {
    if (/^[0-9]?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 3) {
        document.getElementById(`verify-code-${index + 1}`).focus();
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
        // Redirect to login after successful verification
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Please verify your email</h2>
      <p style={styles.subText}>We’ve sent a 4-digit code to {email}</p>

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}

      <form onSubmit={handleSubmit} style={styles.codeContainer}>
        {code.map((digit, index) => (
          <input
            key={index}
            id={`verify-code-${index}`}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            style={styles.codeInput}
          />
        ))}
        <button type="submit" style={styles.verifyButton}>Verify</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: 'auto',
    padding: '2rem',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
  },
  heading: {
    marginBottom: '0.5rem',
  },
  subText: {
    marginBottom: '1.5rem',
    color: '#555',
  },
  codeContainer: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  codeInput: {
    width: '50px',
    height: '50px',
    textAlign: 'center',
    fontSize: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
  },
  verifyButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
  },
  success: {
    color: 'green',
    marginBottom: '1rem',
  },
};

export default VerifyEmail;
  

