// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPassword = () => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/forgot-password', { email });
//       setMessage(res.data.message);
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Failed to send reset link');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
//       <h2>Forgot Password</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Enter your registered email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           requireda
//           style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
//         />
//         <button type="submit" style={{ padding: '10px 20px' }}>Send Code</button>
//       </form>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default ForgotPassword;



    
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/forgot-password', { email });
      setMessage(res.data.message);
      if (res.status === 200) {
        // Navigate to VerifyCode page, pass email via state
        navigate('/verify-code', { state: { email } });
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your registered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Send Code</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default ForgotPassword;
