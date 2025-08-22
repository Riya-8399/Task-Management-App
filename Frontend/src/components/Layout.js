import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Hamburger icons

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] text-white p-6 transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold mb-6">Task Manager</h2>
        <nav className="flex flex-col gap-4">
            <Link to="/dashboard" className="hover:text-blue-400">Dashboard</Link>
          <Link to="/mytasks" className="hover:text-blue-400">My Tasks</Link>
          <Link to="/create-task" className="hover:text-blue-400">Create Task</Link>
          <Link to="/profile" className="hover:text-blue-400">Profile</Link>
          <Link to="/settings" className="hover:text-blue-400">Settings</Link>
          <Link to="/" className="hover:text-blue-400">Logout</Link>
        </nav>
      </div>

      {/* Hamburger Button */}
      <button
        className="fixed top-4 left-4 z-50 text-white md:hidden"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;


