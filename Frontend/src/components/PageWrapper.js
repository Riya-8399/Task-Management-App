// src/components/PageWrapper.js
import React from 'react';

const PageWrapper = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] relative overflow-hidden px-4">
      {/* Blurred animated shapes */}
      <div className="absolute top-[-120px] left-[-120px] w-72 h-72 bg-[#1c2d4f] rounded-full opacity-30 filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-100px] right-[-100px] w-64 h-64 bg-[#354a6d] rounded-full opacity-20 filter blur-2xl animate-pulse animation-delay-2000"></div>

      {/* Content container */}
      <div className="relative z-10 max-w-md w-full p-8 bg-white rounded-xl shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
