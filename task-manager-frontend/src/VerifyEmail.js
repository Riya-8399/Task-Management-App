import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const VerifyEmail = () => {
  const [message, setMessage] = useState('Verifying...');
  const hasVerified = useRef(false); // flag to avoid duplicate calls

  useEffect(() => {
    if (hasVerified.current) return; // prevent double call
    hasVerified.current = true;

    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');

    console.log('Starting email verification for token:', token);

    if (!token) {
      console.log('No token found in URL');
      setMessage('Invalid or missing verification token.');
      return;
    }

    axios.get(`http://localhost:5000/api/verify-email?token=${token}`)
      .then(res => {
        console.log('Verification success response:', res.data);
        setMessage(res.data.message);
      })
      .catch(err => {
        console.error('Verification error response:', err.response?.data || err.message);
        setMessage(err.response?.data?.message || 'Verification failed');
      });
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Email Verification</h2>
      <p>{message}</p>
    </div>
  );
};

export default VerifyEmail;







// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const VerifyEmail = () => {
//   const [message, setMessage] = useState('Verifying...');

//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const token = queryParams.get('token');

//     if (!token) {
//       setMessage('Invalid or missing verification token.');
//       return;
//     }

//     axios.get(`http://localhost:5000/api/verify-email?token=${token}`)
//       .then(res => {
//         setMessage(res.data.message);
//       })
//       .catch(err => {
        

//         setMessage(err.response?.data?.message || 'Verification failed');
//       });
//   }, []);

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
//       <h2>Email Verification</h2>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default VerifyEmail;
