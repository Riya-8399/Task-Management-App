import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

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
