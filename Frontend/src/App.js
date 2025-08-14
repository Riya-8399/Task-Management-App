import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import VerifyCode from './components/VerifyCode';
import SetNewPassword from './components/SetNewPassword';
import CreateTask from './components/CreateTask';
import PrivateRoute from './components/PrivateRoute';



function App() {
  return (
    <Router>
      <div className="flex flex-col justify-center items-center min-h-screen p-4 text-center bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-code" element={<VerifyCode />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/create-task" element={<PrivateRoute><CreateTask /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;








