// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Home = () => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);

// useEffect(() => {
//   const checkAuth = async () => {
//     const token = localStorage.getItem("accessToken");

//     if (token) {
//       try {
//         const res = await axios.get("http://localhost:5000/api/profile", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data?.user) {
//           navigate("/create-task"); // valid token & user → Create Task
//         } else {
//           localStorage.removeItem("accessToken");
//           navigate("/"); // token valid but user missing → Home
//         }
//       } catch (err) {
//         localStorage.removeItem("accessToken");

//         if (err.response?.status === 404) {
//           navigate("/"); // user deleted → Home
//         } else {
//           navigate("/login"); // token expired → Login
//         }
//       }
//     }
//     // If no token, do nothing → Home page renders normally
//     setLoading(false);
//   };

//   checkAuth();
// }, [navigate]);
//  const handleGetStarted = () => {
//     // mark user as returning
//     localStorage.setItem("isReturningUser", true);
//     navigate("/signup");
//   };

//   if (loading) return null; // avoid flicker while checking auth

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center p-8">
//       <div className="max-w-4xl w-full bg-[#FFF9F0] rounded-xl shadow-lg text-center font-sans text-gray-800 p-8">
//         <h1 className="text-4xl font-bold mb-6 text-[#2c3e50]">Welcome to Task Manager</h1>
//         <p className="text-lg mb-12 text-gray-600">
//           Organize your tasks, stay productive, and achieve your goals effortlessly.
//         </p>

//         <div className="flex flex-wrap justify-center gap-6 mb-12">
//           <div className="flex-1 min-w-[250px] max-w-xs bg-gray-200 rounded-xl p-6 shadow-sm">
//             <h3 className="text-xl font-semibold mb-2">🗂️ Manage Tasks</h3>
//             <p>Create, update, and track all your tasks in one place.</p>
//           </div>

//           <div className="flex-1 min-w-[250px] max-w-xs bg-gray-200 rounded-xl p-6 shadow-sm">
//             <h3 className="text-xl font-semibold mb-2">🔔 Reminders</h3>
//             <p>Get notified before deadlines so you never miss a task.</p>
//           </div>

//           <div className="flex-1 min-w-[250px] max-w-xs bg-gray-200 rounded-xl p-6 shadow-sm">
//             <h3 className="text-xl font-semibold mb-2">📊 Progress Tracking</h3>
//             <p>Visualize your progress and stay motivated every day.</p>
//           </div>
//         </div>

//         <button
//           onClick={handleGetStarted}
//           className="bg-green-600 hover:bg-green-700 text-white text-lg py-3 px-8 rounded-full transition-colors duration-300"
//         >
//           Get Started
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        try {
          const res = await axios.get("http://localhost:5000/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });

          // Valid token and user exists → navigate to Create Task
          if (res.data?.user) {
            navigate("/create-task");
          } else {
            // Edge case: token valid but no user returned
            localStorage.removeItem("accessToken");
            navigate("/"); // Home page
          }
        } catch (err) {
          // Remove token on any error
          localStorage.removeItem("accessToken");

          // Check if backend explicitly says user not found
          if (err.response?.data?.message === "User not found") {
            navigate("/"); // Deleted user → Home page
          } else {
            navigate("/login"); // Token expired or invalid → Login
          }
        }
      }

      // No token → Home page renders naturally
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  const handleGetStarted = () => {
    // Mark user as returning
    localStorage.setItem("isReturningUser", true);
    navigate("/signup");
  };

  if (loading) return null; // Avoid flicker while checking auth

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-[#FFF9F0] rounded-xl shadow-lg text-center font-sans text-gray-800 p-8">
        <h1 className="text-4xl font-bold mb-6 text-[#2c3e50]">Welcome to Task Manager</h1>
        <p className="text-lg mb-12 text-gray-600">
          Organize your tasks, stay productive, and achieve your goals effortlessly.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex-1 min-w-[250px] max-w-xs bg-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">🗂️ Manage Tasks</h3>
            <p>Create, update, and track all your tasks in one place.</p>
          </div>

          <div className="flex-1 min-w-[250px] max-w-xs bg-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">🔔 Reminders</h3>
            <p>Get notified before deadlines so you never miss a task.</p>
          </div>

          <div className="flex-1 min-w-[250px] max-w-xs bg-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-2">📊 Progress Tracking</h3>
            <p>Visualize your progress and stay motivated every day.</p>
          </div>
        </div>

        <button
          onClick={handleGetStarted}
          className="bg-green-600 hover:bg-green-700 text-white text-lg py-3 px-8 rounded-full transition-colors duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
