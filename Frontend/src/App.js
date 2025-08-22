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
import Dashboard from "./components/Dashboard";
import MyTasks from "./components/MyTasks";
import Settings from "./components/Settings";


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
        <Route path="/dashboard" element={<PrivateRoute><Layout><Dashboard /></Layout></PrivateRoute>} />
        <Route path="/mytasks" element={<PrivateRoute><Layout><MyTasks /></Layout></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Layout><Profile /></Layout></PrivateRoute>} />
        <Route path="/update-profile" element={<PrivateRoute><Layout><UpdateProfile /></Layout></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Layout><Settings /></Layout></PrivateRoute>} />
      </Routes>
    </Router>
  );
}
export default App;



// function App() {
//   return (
//     <Router>
      
//         <Routes>
//            {/* Public routes */}
//           <Route path="/" element={<Home />} />
          
//           <Route path="/login" element={<Login />} />
//           <Route path="/verify-email" element={<VerifyEmail />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/forgot-password" element={<ForgotPassword />} />
//           <Route path="/verify-code" element={<VerifyCode />} />
//           <Route path="/set-new-password" element={<SetNewPassword />} />
          

//             {/* Authenticated routes with Layout */}
            
//         <Route
//           path="/profile"element={ <PrivateRoute><Layout><Profile /> </Layout></PrivateRoute> } />
//         <Route
//           path="/update-profile"element={ <PrivateRoute><Layout><UpdateProfile /> </Layout> </PrivateRoute> }  />
//         <Route
//           path="/dashboard" element={  <PrivateRoute><Layout> <Dashboard /> </Layout> </PrivateRoute>}  />
//         <Route
//           path="/mytasks"  element={ <PrivateRoute>   <Layout> <MyTasks/></Layout>  </PrivateRoute>  } />
//         <Route
//           path="/settings" element={<PrivateRoute><Layout> <Settings />   </Layout>  </PrivateRoute> }/>
//         <Route
//           path="/create-task" element={<PrivateRoute><Layout><CreateTask /> </Layout></PrivateRoute> }/>
         
//         </Routes>
//     </Router>
//   );
// }

// export default App;