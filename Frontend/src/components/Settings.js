// src/components/Settings.js
import React from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/settings/change-password"
            className="block p-3 bg-gray-100 rounded hover:bg-gray-200"
          >
            Change Password
          </Link>
        </li>
        <li>
          <Link
            to="/settings/reminder-tones"
            className="block p-3 bg-gray-100 rounded hover:bg-gray-200"
          >
            Reminder Tones
          </Link>
        </li>
        <li>
          <Link
            to="/settings/app-theme"
            className="block p-3 bg-gray-100 rounded hover:bg-gray-200"
          >
            App Theme
          </Link>
        </li>
        <li>
          <Link
            to="/settings/language-region"
            className="block p-3 bg-gray-100 rounded hover:bg-gray-200"
          >
            Language & Region
          </Link>
        </li>
        <li>
          <Link
            to="/settings/delete-account"
            className="block p-3 bg-red-100 text-red-600 rounded hover:bg-red-200"
          >
            Delete Account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Settings;
