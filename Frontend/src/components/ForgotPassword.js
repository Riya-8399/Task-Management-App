    
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const ForgotPassword = () => {
// //   const [email, setEmail] = useState('');
// //   const [message, setMessage] = useState('');
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await axios.post('http://localhost:5000/api/forgot-password', { email });
// //       setMessage(res.data.message);
// //       if (res.status === 200) {
// //         // Navigate to VerifyCode page, pass email via state
// //         navigate('/verify-code', { state: { email } });
// //       }
// //     } catch (err) {
// //       setMessage(err.response?.data?.message || 'Failed to send reset link');
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
// //       <h2>Forgot Password</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="email"
// //           placeholder="Enter your registered email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           required
// //           style={{ width: '100%', marginBottom: '10px', padding: '10px' }}
// //         />
// //         <button type="submit" style={{ padding: '10px 20px' }}>Send Code</button>
// //       </form>
// //       <p>{message}</p>
// //     </div>
// //   );
// // };

// // export default ForgotPassword;




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
        navigate('/verify-code', { state: { email } });
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to send reset link');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Forgot Password</h2>


        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          
          >
            Send Code
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-sm text-red-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;








