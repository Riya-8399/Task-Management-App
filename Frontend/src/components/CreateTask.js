import React, { useState } from 'react';
import axios from 'axios';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
  });

   const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
     setMessage('');

    try {
      // Get token from localStorage if authentication is required
      const token = localStorage.getItem('token');

      // Send data to backend
      const res = await axios.post(
        'http://localhost:5000/api/tasks',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, //Include token if needed
          },
        }
      );
      setMessage(res.data.message || 'Task created successfully!');
     // Clear form (optional)
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'pending',
    });
  
   } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to create task');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1a2f] via-[#162c4a] to-[#273858] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Task</h2>

           {/* Show message if available */}
        {message && (
          <p className={`mb-4 text-center text-sm ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;

