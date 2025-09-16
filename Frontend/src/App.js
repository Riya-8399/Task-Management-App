import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import VerifyEmail from './components/VerifyEmail';
import ForgotPassword from './components/ForgotPassword';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import VerifyCode from './components/VerifyCode';
import SetNewPassword from './components/SetNewPassword';
import CreateTask from './components/CreateTask';
import PrivateRoute from './components/PrivateRoute';
import Layout from "./components/Layout";
import MyTasks from "./components/MyTasks";
import Settings from "./components/Settings";
import Logout from './components/Logout';
import ChangePassword from './components/ChangePassword';


function App() {
  return (
    <Router>
      <Routes>
          

        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/set-new-password" element={<SetNewPassword />} />
         
         

      
        {/* Protected routes */}
        <Route path="/create-task" element={<PrivateRoute><Layout><CreateTask /></Layout></PrivateRoute>} />
        <Route path="/mytasks" element={<PrivateRoute><Layout><MyTasks /></Layout></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
        <Route path="/update-profile" element={<PrivateRoute><Layout><UpdateProfile /></Layout></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Layout><Settings /></Layout></PrivateRoute>} />
        <Route path="/logout" element={<PrivateRoute><Layout><Logout /></Layout></PrivateRoute>} />
        <Route path="/settings/change-password/" element={<PrivateRoute><Layout><ChangePassword /></Layout></PrivateRoute>} />
        <Route path="/settings/reminder-tones/" element={<PrivateRoute><Layout><div>Reminder Tones Component</div></Layout></PrivateRoute>} />
        <Route path="/settings/app-theme/" element={<PrivateRoute><Layout><div>App Theme Component</div></Layout></PrivateRoute>} />
        <Route path="/settings/language-region/" element={<PrivateRoute><Layout><div>Language & Region Component</div></Layout></PrivateRoute>} />
        <Route path="/settings/delete-account/" element={<PrivateRoute><Layout><div>Delete Account Component</div></Layout></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
export default App;


