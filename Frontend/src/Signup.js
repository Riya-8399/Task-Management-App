// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const Signup = () => {
// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     email: '',
// //     password: '',
// //   });

// //   const [message, setMessage] = useState('');

// //   const handleChange = (e) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [e.target.name]: e.target.value
// //     }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const res = await axios.post('http://localhost:5000/api/signup', formData);
// //       setMessage(res.data.message);
// //     } catch (err) {
// //       setMessage(err.response?.data?.message || 'Signup failed');
// //     }
// //   };

// //   return (
// //     <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
// //       <h2>Signup</h2>
// //       <form onSubmit={handleSubmit}>
// //         <input
// //   type="text"
// //   name="fullName"
// //   placeholder="Name"
// //   value={formData.fullName}
// //   onChange={handleChange}
// //   required
// //   style={{ width: '100%', marginBottom: '1rem' }}
// // />

// //         <input
// //           type="email"
// //           name="email"
// //           placeholder="Email"
// //           value={formData.email}
// //           onChange={handleChange}
// //           required
// //           style={{ width: '100%', marginBottom: '1rem' }}
// //         />
// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           value={formData.password}
// //           onChange={handleChange}
// //           required
// //           style={{ width: '100%', marginBottom: '1rem' }}
// //         />
// //         <button type="submit" style={{ width: '100%' }}>Sign Up</button>
// //       </form>

// //       {message && (
// //         <p style={{ marginTop: '1rem', color: message.includes('successful') ? 'green' : 'red' }}>
// //           {message}
// //         </p>
// //       )}
// //     </div>
// //   );
// // };

// // export default Signup;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Signup = () => {
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     password: '',
//   });

//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('http://localhost:5000/api/signup', formData);
      
//       // On success, navigate to verify-email page with message and email
//       navigate('/verify-email', { state: { email: formData.email, signupMessage: res.data.message } });
//     } catch (err) {
//       setMessage(err.response?.data?.message || 'Signup failed');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
//       <h2>Signup</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="fullName"
//           placeholder="Name"
//           value={formData.fullName}
//           onChange={handleChange}
//           required
//           style={{ width: '100%', marginBottom: '1rem' }}
//         />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//           style={{ width: '100%', marginBottom: '1rem' }}
//         />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//           required
//           style={{ width: '100%', marginBottom: '1rem' }}
//         />
//         <button type="submit" style={{ width: '100%' }}>Sign Up</button>
//       </form>

//       {message && (
//         <p style={{ marginTop: '1rem', color: 'red' }}>
//           {message}
//         </p>
//       )}
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/api/signup', formData);

      // Redirect to VerifyEmail page with email and success message
      navigate('/verify-email', { 
        state: { 
          email: formData.email, 
          signupMessage: res.data.message // pass the success message to show on VerifyEmail page
        } 
      });
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Name"
          value={formData.fullName}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" style={{ width: '100%' }}>Sign Up</button>
      </form>

      {message && (
        <p style={{ marginTop: '1rem', color: 'red' }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Signup;
