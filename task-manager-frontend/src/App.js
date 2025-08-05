import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import VerifyEmail from './VerifyEmail';
import ForgotPassword from './ForgotPassword';
//import ResetPassword from './ResetPassword';
import Profile from './Profile';
import VerifyCode from './VerifyCode';
import SetNewPassword from './SetNewPassword';

function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/profile" element={<Profile />} />
         <Route path="/login" element={<Login />} />
         <Route path="/verify-email" element={<VerifyEmail />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
         <Route path="/verify-code" element={<VerifyCode />} />
         <Route path="/set-new-password" element={<SetNewPassword />} />
       </Routes>
    </Router>
  );
}

export default App;









